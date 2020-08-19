import React, { useState } from 'react'
import firebase from 'firebase'
import { Progress } from '../shared/Progress'
import { timeFormat } from 'current-time-format'
import { Feedback } from '../shared/Feedback'
import { CSSTransition } from 'react-transition-group'

interface Props {
  profile: object | any
  avatar: string
  toggle: any
}

const { monthNum, day, hours, minutes } = timeFormat
const currentTime = `${hours}:${minutes} on ${monthNum}/${day}`

export const MomentEditor: React.FC<Props> = ({ profile, avatar, toggle }) => {
  const db = firebase.firestore()
  const storageRef = firebase.storage().ref()

  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState('')
  const [picture, setPicture] = useState('')
  const [pictureInfo, setPictureInfo] = useState({
    Status: false,
    Name: '',
  })
  const [feedback, setFeedback] = useState({
    display: false,
    msg: '',
    info: '',
  })

  const handleReload = () => {
    window.location.reload()
  }

  const handleMoment = () => {
    if (post !== '') {
      firebase.auth().onAuthStateChanged((user: any) => {
        db.collection('moment')
          .add({
            Author: profile.profileName,
            Time: currentTime,
            Content: post,
            Like: 0,
            Comments: {},
            Avatar: avatar,
            UserId: user.uid,
            Picture: picture,
          })
          .then(docRef => {
            db.collection('moment').doc(docRef.id).update({
              Key: docRef.id,
            })
          })
      })
      // toggle()
      setFeedback({
        display: true,
        msg: 'Shared Success',
        info: 'You story has been shared successfully',
      })
    } else {
      setFeedback({
        display: true,
        msg: 'Input Error',
        info: 'Please enter the message',
      })
    }
  }

  const handleContent = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPost(event.target.value as string)
  }

  const handleImage = (event: any) => {
    setLoading(true)
    let imageInput: any = document.getElementById(event.currentTarget.id)
    let file = imageInput.files[0]

    let metadata = {
      contentType: file.type,
    }

    let task = storageRef.child(file.name).put(file, metadata)
    task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        setPicture(url)
        console.log('朋友圈图片上传成功 链接为: ' + url)
        setLoading(false)
        setPictureInfo({
          Status: true,
          Name: file.name,
        })
      })
  }

  return (
    <div>
      {loading ? <Progress /> : null}
      <div onClick={toggle} className="overlay-post"></div>
      <div className="moment-editor-container">
        <div className="moment-editor-textarea">
          <img src={avatar} width="50px" height="50px" alt="" />
          <textarea
            onChange={handleContent}
            placeholder="What's happening?"
          ></textarea>
        </div>

        <div className="moment-editor-social">
          <button onClick={handleMoment}>Post</button>
          <input onChange={handleImage} type="file" id="image-input" />
          <label htmlFor="image-input">
            <i className="far fa-image"></i>
          </label>

          <i className="far fa-laugh"></i>

          {pictureInfo.Status ? <p>{pictureInfo.Name}</p> : null}
        </div>
      </div>

      <CSSTransition
        in={feedback.display}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <Feedback
          msg={feedback.msg}
          info={feedback.info}
          imgUrl="/images/emoji/emoji_happy.png"
          toggle={handleReload}
        />
      </CSSTransition>
    </div>
  )
}
