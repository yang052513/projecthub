import React from 'react'
import { NavigationNotificationModalItem } from './NavigationNotificationModalItem'
import { useHistory } from 'react-router-dom'

interface Props {
  offModal: () => void
  notification: any
}

export const NavigationNotificationModal: React.FC<Props> = ({
  offModal,
  notification,
}) => {
  const history = useHistory()

  const notificationList = notification
    .slice(0, 5)
    .map((notification: any) => (
      <NavigationNotificationModalItem
        key={notification.Key}
        notificationData={notification}
      />
    ))

  const handleView = () => {
    offModal()
    history.push('/notification', notification)
  }
  return (
    <div className="notification-modal-preview">
      <div className="notification-item-list">{notificationList}</div>

      <div className="notification-item-button">
        <button onClick={offModal}>Close</button>
        {notification.length > 5 && (
          <button onClick={handleView}>View All</button>
        )}
      </div>
    </div>
  )
}
