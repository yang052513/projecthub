import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import Particle from './Particle'

function Logout() {
  const db = firebase.firestore()
  const [userName, setUserName] = useState('')

  const [bgImg, setBgImg] = useState('')
  const [bye, setBye] = useState('')

  const byeMsg = [
    'Bye Bye',
    'See you soon',
    'Have a good day',
    'Take care',
    'See you next time',
  ]

  //背景图片数量以及bye 信息
  const maxImages = 20
  const maxByes = byeMsg.length

  //随机生成
  const randomImg = Math.floor(Math.random() * maxImages) + 1
  const randomBye = Math.floor(Math.random() * maxByes) + 1

  useEffect(() => {
    setBgImg(randomImg)
    setBye(byeMsg[randomBye])

    firebase.auth().onAuthStateChanged((user) => {
      db.collection('user')
        .doc(user.uid)
        .get()
        .then((doc) => {
          setUserName(doc.data().Name)
        })
    })
    setTimeout(() => {
      firebase
        .auth()
        .signOut()
        .then(
          function () {
            console.log('退出成功 bye bye')
          },
          function (error) {
            console.error('退出也能有错误？那可能是你的网的问题', error)
          }
        )
    }, 4000)
  }, [])

  return (
    <div
      style={{
        background: `url('/images/logout/${bgImg}.jpg') no-repeat center center fixed`,
      }}
      className="logout-container"
    >
      {/* <Particle /> */}
      <p>
        {bye} {userName}.
      </p>
    </div>
  )
}

export default Logout
