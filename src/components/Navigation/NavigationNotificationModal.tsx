import React from 'react'
import { NavigationNotificationModalItem } from './NavigationNotificationModalItem'

interface Props {
  offModal: () => void
  notification: any
}

export const NavigationNotificationModal: React.FC<Props> = ({
  offModal,
  notification,
}) => {
  const notificationList = notification.map((notification: any) => (
    <NavigationNotificationModalItem
      key={notification.Key}
      notificationData={notification}
    />
  ))

  return (
    <div className="notification-modal-preview">
      <div className="notification-item-list">{notificationList}</div>

      <div className="notification-item-button">
        <button onClick={offModal}>Close</button>
      </div>
    </div>
  )
}
