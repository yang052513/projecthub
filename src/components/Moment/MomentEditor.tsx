import React, { useState } from 'react'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

import { Progress } from '../shared/Progress'
import { Feedback } from '../shared/Feedback'

import { timeFormat } from 'current-time-format'
import { CSSTransition } from 'react-transition-group'

interface Props {
  profile: any
  avatar: string
  toggle: any
}

const { monthNum, day, hours, minutes } = timeFormat
const currentTime = `${hours}:${minutes} on ${monthNum}/${day}`

export const MomentEditor: React.FC<Props> = ({ profile, avatar, toggle }) => {
  const user: any = firebase.auth().currentUser

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

  const handleMoment = () => {
    if (post !== '') {
      const momentCollectionRef = firebase.firestore().collection('moment')
      momentCollectionRef
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
          momentCollectionRef.doc(docRef.id).update({
            Key: docRef.id,
          })
        })
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
    const metadata = {
      contentType: file.type,
    }

    const uploadFile = firebase
      .storage()
      .ref()
      .child(file.name)
      .put(file, metadata)
    uploadFile
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        setPicture(url)
        setLoading(false)
        setPictureInfo({
          Status: true,
          Name: file.name,
        })
        console.log('朋友圈图片上传成功 链接为: ' + url)
      })
  }

  return (
    <div>
      {loading && <Progress />}
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
          {pictureInfo.Status && <p>{pictureInfo.Name}</p>}
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
          toggle={() => window.location.reload()}
        />
      </CSSTransition>
    </div>
  )
}
