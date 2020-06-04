import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import Progress from '../../Progress'
import Feedback from '../../Feedback'

export default function Background() {
  const db = firebase.firestore()
  const storageRef = firebase.storage().ref()
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(false)
  const [error, setError] = useState(false)

  const [customBg, setCustomBg] = useState([])

  //更改背景图片
  function handleBgUpload() {
    setLoading(true)
    let file = document.getElementById('img-input').files[0]
    //如果更改了照片
    if (file) {
      let metadata = {
        contentType: file.type,
      }
      let upload = storageRef.child(file.name).put(file, metadata)
      upload
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          console.log(`背景图成功上传到数据库~'${url}`)
          firebase.auth().onAuthStateChanged((user) => {
            db.collection('user')
              .doc(user.uid)
              .collection('Setting')
              .doc('Apparence')
              .update({
                background: url,
                customBackground: firebase.firestore.FieldValue.arrayUnion(url),
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

  //读取用户已经保存过的壁纸
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection('user')
        .doc(user.uid)
        .collection('Setting')
        .doc('Apparence')
        .get()
        .then((doc) => {
          if (doc.data().customBackground) {
            setCustomBg(doc.data().customBackground)
            console.log(doc.data().customBackground)
          }
        })
        .catch((error) => {
          console.log(`读取用户保存的壁纸时出错了 ${error}`)
        })
    })
  }, [])

  function handleReload() {
    window.location.reload()
  }

  function handleError() {
    setError(false)
  }

  const customBgRender =
    customBg.length === 0
      ? null
      : customBg.map((bg) => <img key={bg} src={bg} />)

  return (
    <div className="setting-content-background">
      {loading === true ? <Progress /> : null}
      {/* 项目创建成功反馈 */}
      {feedback === true ? (
        <div>
          <Feedback
            msg="Success"
            info="Background changed successfully ~ ー( ´ ▽ ` )ﾉ"
            imgUrl="/images/emoji/emoji_happy.png"
            toggle={handleReload}
          />
        </div>
      ) : null}

      {error === true ? (
        <div>
          <Feedback
            msg="Error"
            info="Didnt detect any backgroud changes ~ ー( ´ ▽ ` )ﾉ"
            imgUrl="/images/emoji/emoji_scare.png"
            toggle={handleError}
          />
        </div>
      ) : null}
      <h3 className="setting-content-subtit">Background</h3>
      <div className="setting-content-background-demo">
        <img src="/images/theme/background/demo.png" alt="ad" />
      </div>

      <div className="setting-content-background-options">
        {/* 系统内置壁纸 */}
        <img src="/images/theme/background/1-demo.jpg" />
        <img src="/images/theme/background/2-demo.jpg" />
        <img src="/images/theme/background/3-demo.jpg" />
        <img src="/images/theme/background/4-demo.jpg" />
        <img src="/images/theme/background/5-demo.jpg" />

        {/* 用户已经上传的壁纸 */}
        {customBgRender}
      </div>
      <input type="file" id="img-input" />
      <button onClick={handleBgUpload}>Save</button>
    </div>
  )
}
