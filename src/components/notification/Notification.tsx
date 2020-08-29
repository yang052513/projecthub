import React from 'react'
import { useLocation } from 'react-router-dom'
import { NotificationCard } from './NotificationCard'

export const Notification: React.FC = () => {
  const location = useLocation()
  console.log(location.state)
  const notificationData: any = location.state

  const notificationList = notificationData
    .filter((item: { Unread: any }) => item.Unread)
    .map((notification: any) => (
      <NotificationCard
        key={notification.Key}
        notificationData={notification}
      />
    ))

  return (
    <div className="component-layout notification-container">
      <div className="notification-item-list">{notificationList}</div>
    </div>
  )
}
