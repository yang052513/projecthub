import React from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'

interface Props {
  notificationData: any
}

export const NotificationCard: React.FC<Props> = ({ notificationData }) => {
  const user: any = firebase.auth().currentUser
  const handleRead = (ref: string) => {
    firebase
      .firestore()
      .collection('user')
      .doc(user.uid)
      .collection('Notification')
      .doc(ref)
      .update({
        Unread: false,
      })
    console.log('已读更新')
  }

  return (
    <Link
      to={notificationData.Redirect}
      onClick={() => handleRead(notificationData.Key)}
    >
      <div className="notification-card">
        <img src={notificationData.Avatar} alt="" />
        <div className="notification-card-text">
          <p className="notification-card-category">
            New {notificationData.Category}
          </p>
          <p className="notification-card-msg">{notificationData.Message}</p>
        </div>

        <p className="notification-card-time">{notificationData.Date}</p>
      </div>
    </Link>
  )
}
