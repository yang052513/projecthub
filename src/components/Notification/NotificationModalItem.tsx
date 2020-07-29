import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  notificationData: any
}

export const NotificationModalItem: React.FC<Props> = ({
  notificationData,
}) => {
  return (
    <Link to={notificationData.Redirect} onClick={() => console.log('已读')}>
      <div className="notification-item">
        <img src={notificationData.Avatar} alt="" />
        <div className="notification-item-text">
          <p>New {notificationData.Category}</p>

          <p className="notification-item-msg">{notificationData.Message}</p>
          <p className="notification-item-time">{notificationData.Date}</p>
        </div>
      </div>
    </Link>
  )
}
