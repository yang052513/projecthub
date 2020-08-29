import React from 'react'
import { useLocation } from 'react-router-dom'
import { NavigationNotificationModalItem } from '../navigation/NavigationNotificationModalItem'

export const Notification: React.FC = () => {
  const location = useLocation()
  console.log(location.state)
  const notificationData: any = location.state

  const notificationList = notificationData.map((notification: any) => (
    <NavigationNotificationModalItem
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
