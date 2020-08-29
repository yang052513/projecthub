import React, { useState, useEffect, useContext } from 'react'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { ProfileContext } from '../context/ProfileContext'

export const Logout: React.FC = () => {
  const user: any = firebase.auth().currentUser
  const profile: any = useContext(ProfileContext)

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
  const maxImages: number = 20

  //Gnerate random images and bye message
  const randomImg: number = Math.floor(Math.random() * maxImages) + 1
  const randomBye: number = Math.floor(Math.random() * maxByes)

  const logoutAnimation = () => {
    setBgImg(randomImg)
    setBye(byeMsg[randomBye])
    firebase.firestore().collection('user').doc(user.uid).update({
      Online: false,
    })

    setTimeout(() => {
      firebase
        .auth()
        .signOut()
        .then(
          () => {
            console.log('退出成功 bye bye')
          },
          error => {
            console.error('firebase signout错误', error)
          }
        )
    }, 4000)
  }
  useEffect(logoutAnimation, [])

  return (
    <div
      style={{
        background: `url('/images/logout/${bgImg}.jpg') no-repeat center center fixed`,
      }}
      className="logout-container"
    >
      <p>
        {bye} {profile.profile.profileName}.
      </p>
    </div>
  )
}
