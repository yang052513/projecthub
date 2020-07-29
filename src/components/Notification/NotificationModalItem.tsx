import React from 'react'

interface Props {
  notificationData: any
}

export const NotificationModalItem: React.FC<Props> = ({
  notificationData,
}) => {
  return (
    <div className="notification-item">
      <div className="notification-item-title">
        <i className="fas fa-user-friends"></i>
        <p>{notificationData.Category} Request Update</p>
      </div>
      <p className="notification-item-msg">{notificationData.Message}</p>
      <p className="notification-item-time">{notificationData.Date}</p>
    </div>
  )
}
