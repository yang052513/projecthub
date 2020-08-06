import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import { timeFormat } from 'current-time-format'
import { useFetchProfile } from '../Hooks/useFetchProfile'
import { Feedback } from '../Common/Feedback'
import { addNotification } from '../../modules/modules'

interface Profile {
  profileName: string | null
  profileEmail: string | null
  profileBio: string | null
  profileGithub: string | null
  profileLocation: string | null
  profileWeb: string | null
  profilelinkedin: string | null
}

interface Props {
  info: Profile
  avatar: string
  userId: string
}

export const FriendCard: React.FC<Props> = ({ info, avatar, userId }) => {
  const [online, setOnline] = useState<boolean>(false)
  const user: firebase.User | null | any = firebase.auth().currentUser
  const profile = useFetchProfile(user.uid)

  const [isApplied, setIsApplied] = useState<boolean>(false)

  const [feedback, setFeedback] = useState<any>({
    show: false,
    msg: '',
    info: '',
  })
  const { monthStrLong, day, hours, minutes } = timeFormat

  const currentDay = `${monthStrLong} ${day} at ${hours}:${minutes}`

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

  //用户申请写入到被申请用户的通知里
  // const addNotification = () => {
  //   const notificatonRef = firebase
  //     .firestore()
  //     .collection('user')
  //     .doc(userId)
  //     .collection('Notification')
  //   notificatonRef
  //     .add({
  //       Unread: true,
  //       Message: `${profile.profile.profileName} sent you a friend request`,
  //       Date: currentDay,
  //       Category: 'Friend Request',
  //       Redirect: '/messenger',
  //     })
  //     .then(docKey => {
  //       notificatonRef.doc(docKey.id).update({
  //         Key: docKey.id,
  //       })
  //       console.log(`通知已经写入到用户数据库中${docKey.id}`)
  //     })
  // }

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

    console.log('好友请求发起成功')
  }

  const onlineColor: any = {
    color: 'rgb(15, 207, 89)',
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
        {/* 
        <ul className="friend-card-info-skills">
          <li>React</li>
          <li>MongoDB</li>
          <li>Sass</li>
          <li>HTML5</li>
          <li>Javascript</li>
          <li>SQL</li>
          <li>Less</li>
        </ul> */}
      </div>

      {!(user.uid === userId) && (
        <div className="friend-card-button">
          {isApplied ? (
            <button className="requested-button">Requested</button>
          ) : (
            <button onClick={handleFriend}>Add Friends</button>
          )}

          <button>Message</button>
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
