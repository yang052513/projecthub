import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Loading from '../Loading'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '30px',
  },

  // 文本框样式
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '45ch',
  },
}))

const inputMargin = {
  margin: '12px 8px',
}

const profileInit = {
  profileName: '',
  profileLocation: '',
  profileEmail: '',
  profileBio: '',
  profileWeb: '',
  profilelinkedin: '',
  profileGithub: '',
}

function Profile() {
  const classes = useStyles()
  const db = firebase.firestore()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState({})

  function handleTextField(event) {
    const { name, value } = event.target
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }))
  }

  //保存用户修改后的profile信息
  function handleSubmit() {
    if (profile.profileEmail !== '' && !profile.profileEmail.includes('@')) {
      alert('错误')
    } else {
      firebase.auth().onAuthStateChanged((user) => {
        db.collection('user')
          .doc(user.uid)
          .collection('Setting')
          .doc('Profile')
          .update({
            profile,
          })
          .then(console.log('用户信息保存成功'))
          .catch((error) => {
            console.log('保存出错' + error)
          })
      })
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection('user')
        .doc(user.uid)
        .collection('Setting')
        .doc('Profile')
        .get()
        .then((doc) => {
          if (doc.data().profile) {
            setProfile(doc.data().profile)
          } else {
            setProfile(profileInit)
          }
        })
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <div className="setting-content-intro">
        <h2>Profile</h2>
        <p>Edit your personal information</p>
      </div>
      <div className="setting-content-profile-header">
        <img src="/images/user.jpg" alt="profile" />
        <button>Upload Images</button>
      </div>

      {loading ? (
        <Loading />
      ) : (
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
            id="profile-github-input"
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
      )}

      <div className="setting-content-save">
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  )
}

export default Profile
