import React from 'react'

export const MessengerListChat = () => {
  return (
    <div className="messenger-list-chat-container">
      <div className="messenger-list-header">
        <p>RECENT CHATS</p>
      </div>
      <div className="messenger-list-chat-item">
        <img src="./images/user.jpg" alt="" />
        <div>
          <h4>Nathan Lee</h4>
          <p>Let me know what you think...</p>
        </div>
      </div>
    </div>
  )
}
