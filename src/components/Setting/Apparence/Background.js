import React, { useState } from 'react'
import firebase from 'firebase'
import Progress from '../../Progress'
import Feedback from '../../Feedback'

export default function Background() {
  const db = firebase.firestore()
  const storageRef = firebase.storage().ref()
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(false)
  const [error, setError] = useState(false)

  function handleBgUpload() {
    setLoading(true)
    let file = document.getElementById('profile-input').files[0]
    //如果更改了照片
    if (file) {
      let metadata = {
        contentType: file.type,
      }

      let upload = storageRef.child(file.name).put(file, metadata)
      upload
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          console.log(`头像成功上传到数据库~'${url}`)
          firebase.auth().onAuthStateChanged((user) => {
            db.collection('user')
              .doc(user.uid)
              .collection('Setting')
              .doc('Profile')
              .update({
                avatar: url,
              })
          })
          setLoading(false)
          setFeedback(true)
        })
    } else {
      setLoading(false)
      setError(true)
    }
  }

  function handleReload() {
    window.location.reload()
  }

  return (
    <div className="setting-content-background">
      {loading === true ? <Progress /> : null}
      {/* 项目创建成功反馈 */}
      {feedback === true ? (
        <div>
          <Feedback
            msg="Success"
            info="Profile changed successfully ~ ー( ´ ▽ ` )ﾉ"
            imgUrl="/images/emoji/emoji_happy.png"
            toggle={handleReload}
          />
        </div>
      ) : null}
      <h3 className="setting-content-subtit">Background</h3>
      <div className="setting-content-background-demo">
        <img src="/images/theme/background/demo.png" alt="ad" />
      </div>

      <p>Choose Background</p>
      <div className="setting-content-background-options">
        {/* <img src="/images/theme/background/1.jpg" />
        <img src="/images/theme/background/2.jpg" />
        <img src="/images/theme/background/3.jpg" />
        <img src="/images/theme/background/4.jpg" />
        <img src="/images/theme/background/5.jpg" /> */}
      </div>
      <input type="file" />
    </div>
  )
}
