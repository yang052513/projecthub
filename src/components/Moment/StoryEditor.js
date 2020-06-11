import React, { useState } from 'react'
import firebase from 'firebase'

export default function StoryEditor(props) {
  const db = firebase.firestore()
  const [post, setPost] = useState('')

  const date = new Date()
  let month
  switch (date.getMonth()) {
    case 0:
      month = 'Jan'
      break
    case 1:
      month = 'Feb'
      break
    case 2:
      month = 'Mar'
      break
    case 3:
      month = 'Apr'
      break
    case 4:
      month = 'May'
      break
    case 5:
      month = 'June'
      break
    case 6:
      month = 'July'
      break
    case 7:
      month = 'Aug'
      break
    case 8:
      month = 'Sep'
      break
    case 9:
      month = 'Oct'
      break
    case 10:
      month = 'Nov'
      break
    case 11:
      month = 'Dec'
      break
  }

  const currentTime = `${date.getHours()}:${
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  } ${month} ${
    date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  },${date.getFullYear()}`

  console.log(currentTime)

  const handleMoment = () => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection('moment').add({
        Author: props.profile.profileName,
        Time: currentTime,
        Content: post,
        Like: 0,
        Comments: {},
        Avatar: props.avatar,
        Id: user.uid,
      })
    })
  }

  const handleContent = (event) => {
    setPost(event.target.value)
  }

  return (
    <div>
      <div onClick={props.toggle} className="overlay-post"></div>
      <div className="moment-editor-container">
        <div className="moment-editor-textarea">
          <img src="images/user.jpg" width="50px" height="50px" />
          <textarea
            onChange={handleContent}
            placeholder="What's happening?"
          ></textarea>
        </div>

        <div className="moment-editor-social">
          <button onClick={handleMoment}>Post</button>
          <input type="file" id="image-input" />
          <label id="upload-image-tweet" htmlFor="image-input">
            <i className="far fa-image"></i>
          </label>

          <i className="far fa-laugh"></i>
        </div>
      </div>
    </div>
  )
}
