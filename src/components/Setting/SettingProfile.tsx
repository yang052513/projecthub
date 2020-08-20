import React, { useState, useEffect, useContext } from 'react'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

import { Progress } from '../shared/Progress'
import { Feedback } from '../shared/Feedback'
import { Loading } from '../shared/Loading'
import { useFetchProfile } from '../../hooks/useFetchProfile'

import { CSSTransition } from 'react-transition-group'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { ProfileContext } from '../../context/ProfileContext'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: '10px',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '40ch',
    },
  })
)

const inputMargin = {
  margin: '12px 8px',
}

export const SettingProfile: React.FC = () => {
  const classes = useStyles()
  const user: any = firebase.auth().currentUser

  const [profile, setProfile] = useState<any>({})
  const avatar = useFetchProfile(user.uid)
  const db = firebase.firestore()

  const [launch, setLaunch] = useState(true)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(false)
  const [error, setError] = useState(false)

  function handleTextField(event: { target: { name: any; value: any } }) {
    const { name, value } = event.target
    setProfile((prevProfile: any) => ({
      ...prevProfile,
      [name]: value,
    }))
  }

  const handleProfileUpload = () => {
    setLoading(true)
    let imageInput: any = document.getElementById('profile-input')
    let file = imageInput.files[0]

    if (file) {
      let metadata = {
        contentType: file.type,
      }
      let upload = firebase.storage().ref().child(file.name).put(file, metadata)
      upload
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
          console.log(`头像成功上传到数据库'${url}`)

          //更改个人页面
          db.collection('user')
            .doc(user.uid)
            .collection('Setting')
            .doc('Profile')
            .update({
              avatar: url,
            })

          //更新个人项目 如果从别人的数据库更改 遍历每个用户uid的project集合
          db.collection('user')
            .doc(user.uid)
            .collection('Project')
            .get()
            .then(updateList => {
              updateList.forEach(doc => {
                let contributorList = doc.data().Contributors
                contributorList.forEach((contributor: any, index: any) => {
                  if (contributor.Id === user.uid) {
                    contributorList[index] = { Avatar: url, Id: user.uid }
                    db.collection('user')
                      .doc(user.uid)
                      .collection('Project')
                      .doc(doc.id)
                      .update({
                        Contributors: contributorList,
                      })
                    db.collection('project').doc(doc.id).update({
                      Contributors: contributorList,
                    })
                  }
                })
              })
              console.log('用户所有的项目同步头像成功')
            })

          //更新聊天列表
          db.collection('user')
            .doc(user.uid)
            .collection('Friend')
            .doc('Added')
            .collection('Friends')
            .get()
            .then(friendUpdateList => {
              friendUpdateList.forEach(doc => {
                db.collection('user')
                  .doc(doc.id)
                  .collection('Friend')
                  .doc('Added')
                  .collection('Friends')
                  .doc(user.uid)
                  .update({
                    FriendProfile: {
                      Avatar: url,
                      Profile: profile,
                    },
                  })

                const chatUpdateRef = db
                  .collection('user')
                  .doc(user.uid)
                  .collection('Friend')
                  .doc('Added')
                  .collection('Friends')
                  .doc(doc.id)
                  .collection('Chat')
                const chatFriendRef = db
                  .collection('user')
                  .doc(doc.id)
                  .collection('Friend')
                  .doc('Added')
                  .collection('Friends')
                  .doc(user.uid)
                  .collection('Chat')

                chatUpdateRef
                  .where('UserRef', '==', user.uid)
                  .get()
                  .then(chatList => {
                    chatList.forEach(chatDoc => {
                      chatUpdateRef.doc(chatDoc.id).update({
                        Avatar: url,
                      })
                      chatFriendRef.doc(chatDoc.id).update({
                        Avatar: url,
                      })
                    })
                  })
              })
            })

          // 更改好友集合
          db.collection('friends').doc(user.uid).update({
            avatar: url,
          })

          //找到所有相关用户的post 并进行更新
          db.collection('moment')
            .where('UserId', '==', `${user.uid}`)
            .get()
            .then(updateList => {
              updateList.forEach(doc => {
                db.collection('moment').doc(doc.id).update({
                  Avatar: url,
                })
              })
              console.log('用户的所有动态同步头像成功')
            })

          setLoading(false)
          setFeedback(true)
        })
    } else {
      setLoading(false)
      setError(true)
    }
  }

  //保存用户修改后的profile信息
  const handleSubmit = () => {
    if (profile.profileEmail !== '' && !profile.profileEmail.includes('@')) {
      alert('错误')
    } else {
      setLoading(true)
      setTimeout(() => {
        db.collection('user')
          .doc(user.uid)
          .collection('Setting')
          .doc('Profile')
          .update({
            profile,
          })
          .then(() => console.log('用户信息保存成功'))
          .catch(error => {
            console.log('保存出错' + error)
          })
        db.collection('friends').doc(user.uid).update({
          Key: user.uid,
          profile,
        })
        setLoading(false)
        setFeedback(true)
      }, 1000)
    }
  }

  const handleReload = () => {
    window.location.reload()
  }

  const handleError = () => {
    setError(false)
  }

  useEffect(() => {
    db.collection('user')
      .doc(user.uid)
      .collection('Setting')
      .doc('Profile')
      .get()
      .then((doc: any) => {
        setProfile(doc.data().profile)
      })

    setLaunch(false)
  }, [])

  return (
    <div>
      {loading && <Progress />}
      {launch && <Loading />}
      {feedback && (
        <div>
          <Feedback
            msg="Success"
            info="Profile changed successfully ~ ー( ´ ▽ ` )ﾉ"
            imgUrl="/images/emoji/emoji_happy.png"
            toggle={handleReload}
          />
        </div>
      )}

      {error && (
        <div>
          <Feedback
            msg="Error"
            info="Pleaqse upload your profile picture ~ ー( ´ ▽ ` )ﾉ"
            imgUrl="/images/emoji/emoji_scare.png"
            toggle={handleError}
          />
        </div>
      )}

      <CSSTransition
        in={!launch}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <div>
          <div className="setting-content-intro">
            <h2>Profile</h2>
            <p>Edit your personal information</p>
          </div>
          <div className="setting-content-profile-header">
            <img src={avatar.avatar} alt="profile" />
            <input id="profile-input" name="profile-input" type="file" />
            <label htmlFor="profile-input">
              <p>Upload Images</p>
            </label>
            <button onClick={handleProfileUpload}>Save</button>
          </div>

          <div className={classes.root}>
            <TextField
              error={false}
              id="profile-name-input"
              name="profileName"
              onChange={handleTextField}
              label="Full Name"
              style={inputMargin}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              helperText="Name you want to display while using the app"
              inputProps={{ placeholder: profile.profileName }}
            />
            <TextField
              id="profile-location-input"
              name="profileLocation"
              onChange={handleTextField}
              label="Location"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ placeholder: profile.profileLocation }}
            />
            <TextField
              id="profile-email-input"
              name="profileEmail"
              onChange={handleTextField}
              label="Email Address"
              className={classes.textField}
              helperText="For notification and password reset"
              margin="dense"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ placeholder: profile.profileEmail }}
            />
            <TextField
              id="profile-bio-input"
              name="profileBio"
              onChange={handleTextField}
              label="Bio"
              style={inputMargin}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              helperText="Descirbe your self and make some friends"
              variant="outlined"
              inputProps={{ placeholder: profile.profileBio }}
            />
            <TextField
              id="profile-url-input"
              name="profileWeb"
              onChange={handleTextField}
              label="Personal Website"
              style={inputMargin}
              fullWidth
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              inputProps={{ placeholder: profile.profileWeb }}
            />
            <TextField
              id="profile-linkedin-input"
              name="profilelinkedin"
              onChange={handleTextField}
              label="Linkedin URL"
              style={inputMargin}
              fullWidth
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              inputProps={{ placeholder: profile.profilelinkedin }}
            />
            <TextField
              name="profileGithub"
              onChange={handleTextField}
              label="Github URL"
              style={inputMargin}
              fullWidth
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              inputProps={{ placeholder: profile.profileGithub }}
            />
          </div>

          <div className="setting-content-save">
            <button onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}
