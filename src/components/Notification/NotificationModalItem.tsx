import React from 'react'

interface Props {
  notificationData: any
}

export const NotificationModalItem: React.FC<Props> = ({
  notificationData,
}) => {
  return (
    <div className="notification-item">
      <img
        src="./images/user.jpg"
        width="50px"
        height="50px"
        style={{ borderRadius: '50%' }}
        alt=""
      />
      <div className="notification-item-text">
        <p>New {notificationData.Category}</p>

        <p className="notification-item-msg">{notificationData.Message}</p>
        <p className="notification-item-time">{notificationData.Date}</p>
      </div>
    </div>
  )
}
