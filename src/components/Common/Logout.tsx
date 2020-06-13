import React, { useState, useEffect } from 'react'
import firebase from 'firebase'

export const Logout: React.FC = () => {
  const db = firebase.firestore()
  const user = firebase.auth().currentUser

  const [userName, setUserName] = useState<string>('')

  const [bgImg, setBgImg] = useState<number | null>(null)
  const [bye, setBye] = useState<string | null>(null)

  //Random bye message list
  const byeMsg: Array<string> = [
    'Bye Bye',
    'See you soon',
    'Have a good day',
    'Take care',
    'See you next time',
  ]
  const maxByes: number = byeMsg.length

  //Log out background images length
  const maxImages: number = 20

  //Gnerate random images and bye message
  const randomImg: number = Math.floor(Math.random() * maxImages) + 1
  const randomBye: number = Math.floor(Math.random() * maxByes)

  useEffect(() => {
    setBgImg(randomImg)
    setBye(byeMsg[randomBye])

    if (user) {
      db.collection('user')
        .doc(user.uid)
        .get()
        .then((doc: any) => {
          setUserName(doc.data().Name)
        })
    }

    setTimeout(() => {
      firebase
        .auth()
        .signOut()
        .then(
          () => {
            console.log('退出成功 bye bye')
          },
          error => {
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
