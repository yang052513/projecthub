import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { timeFormat } from 'current-time-format'
import { Feedback } from '../shared/Feedback'
import { addNotification } from '../../modules/modules'
import { ProfileContext } from '../../context/ProfileContext'

interface Props {
  info: any
  avatar: string
  userId: string
}

const { monthStrLong, day, hours, minutes } = timeFormat
const currentDay = `${monthStrLong} ${day} at ${hours}:${minutes}`

const onlineColor: any = {
  color: 'rgb(15, 207, 89)',
}

const promptStyle: any = {
  opacity: '1',
}

export const FriendCard: React.FC<Props> = ({ info, avatar, userId }) => {
  const user: firebase.User | null | any = firebase.auth().currentUser
  const profile: any = useContext(ProfileContext)

  const [online, setOnline] = useState<boolean>(false)
  const [showPrompt, setShowPrompt] = useState<boolean>(false)
  const [isApplied, setIsApplied] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<any>({
    show: false,
    msg: '',
    info: '',
  })

  //检测该用户是否处于在线状态
  const fecthOnlineStatus = () => {
    firebase
      .firestore()
      .collection('user')
      .doc(userId)
      .get()
      .then((userDoc: any) => {
        setOnline(userDoc.data().Online)
      })
  }

  //检测该用户是否已经申请过了
  const fetchApplicationStatus = () => {
    firebase
      .firestore()
      .collection('user')
      .doc(user.uid)
      .collection('Friend')
      .doc('Notification')
      .collection('Application')
      .doc(userId)
      .get()
      .then(doc => {
        if (doc.exists) {
          setIsApplied(true)
        }
      })
  }
  useEffect(fecthOnlineStatus, [])
  useEffect(fetchApplicationStatus, [])

  //向点击的用户发起好友请求
  const handleFriend = () => {
    //写入到当前用户的Application中
    firebase
      .firestore()
      .collection('user')
      .doc(user.uid)
      .collection('Friend')
      .doc('Notification')
      .collection('Application')
      .doc(userId)
      .set({
        FriendKey: userId,
        FriendProfile: {
          Avatar: avatar,
          Profile: info,
        },
        Date: currentDay,
        Result: 'Sent',
      })

    //写入到被加用户的请求中
    firebase
      .firestore()
      .collection('user')
      .doc(userId)
      .collection('Friend')
      .doc('Notification')
      .collection('Request')
      .doc(user.uid)
      .set({
        FriendKey: user.uid,
        FriendProfile: {
          Avatar: profile.avatar,
          Profile: profile.profile,
        },
        Date: currentDay,
      })

    addNotification(
      userId,
      `${profile.profile.profileName} sent you a friend request`,
      'Friend Request',
      '/messenger',
      profile.avatar
    )
    setIsApplied(true)
    setFeedback({
      show: true,
      msg: 'Request Made',
      info: `Request has been sent to ${info.profileName}.`,
    })
  }

  return (
    <div className="friend-card-item-container">
      <div className="friend-card-avatar">
        <Link to={`/friends/${userId}`}>
          <img src={avatar} alt="" />
        </Link>
      </div>

      <div className="friend-card-info">
        <div className="friend-card-info-name">
          <p>{info.profileName}</p>
          <div>
            <i
              style={online ? onlineColor : null}
              className="fas fa-circle"
            ></i>
            <span>{online ? 'Online' : 'Offline'}</span>
          </div>
        </div>
        <p className="friend-card-info-location">{info.profileLocation}</p>
        <p className="friend-card-info-bio">{info.profileBio}</p>
      </div>

      {!(user.uid === userId) && (
        <div className="friend-card-button">
          {isApplied ? (
            <button className="requested-button">Requested</button>
          ) : (
            <button onClick={handleFriend}>
              <i
                onMouseEnter={() => setShowPrompt(true)}
                onMouseLeave={() => setShowPrompt(false)}
                className="fas fa-user-plus"
              ></i>
            </button>
          )}
          <p style={showPrompt ? promptStyle : null} className="friend-prompt">
            Add Friend
          </p>
        </div>
      )}

      {feedback.show && (
        <Feedback
          msg={feedback.msg}
          info={feedback.info}
          imgUrl="/images/emoji/emoji_happy.png"
          toggle={() =>
            setFeedback({
              show: false,
              msg: '',
              info: '',
            })
          }
        />
      )}
    </div>
  )
}
