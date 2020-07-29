import React from 'react'

interface Props {
  offModal: () => void
}

export const NotificationModal: React.FC<Props> = ({ offModal }) => {
  return (
    <div className="notification-modal-preview">
      <div className="notification-item-list">
        <div className="notification-item">
          <div className="notification-item-title">
            <i className="fas fa-user-friends"></i>
            <p>Friend Request Update</p>
          </div>
          <p className="notification-item-msg">
            Alex Wang sent you a friend request
          </p>
          <p className="notification-item-time">July 28 at 11:30 AM</p>
        </div>

        <div className="notification-item">
          <div className="notification-item-title">
            <i className="fas fa-user-friends"></i>
            <p>Friend Request Update</p>
          </div>
          <p className="notification-item-msg">
            Alex Wang sent you a friend request
          </p>
          <p className="notification-item-time">July 28 at 11:30 AM</p>
        </div>
      </div>

      <div className="notification-item-button">
        <button onClick={offModal}>Close</button>
        <button>View</button>
      </div>
    </div>
  )
}
