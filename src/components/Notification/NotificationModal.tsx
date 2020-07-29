import React from 'react'
import { NotificationModalItem } from './NotificationModalItem'

interface Props {
  offModal: () => void
  notification: any
}

export const NotificationModal: React.FC<Props> = ({
  offModal,
  notification,
}) => {
  const notificationList = notification.map((notification: any) => (
    <NotificationModalItem
      key={notification.Key}
      notificationData={notification}
    />
  ))

  return (
    <div className="notification-modal-preview">
      <div className="notification-item-list">{notificationList}</div>

      <div className="notification-item-button">
        <button onClick={offModal}>Close</button>
        <button>View</button>
      </div>
    </div>
  )
}
