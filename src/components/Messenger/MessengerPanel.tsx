import React from 'react'
import { Link } from 'react-router-dom'

export const MessengerPanel = () => {
  return (
    <div className="messenger-panel-container">
      <Link to="/messenger">
        <i className="fas fa-comment"></i>
      </Link>

      <Link to="/messenger/friends">
        <i className="fas fa-user-friends"></i>
      </Link>

      <Link to="/messenger/request">
        <i className="fas fa-user-plus"></i>
      </Link>
    </div>
  )
}
