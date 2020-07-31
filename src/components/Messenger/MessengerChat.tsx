import React from 'react'

export const MessengerChat: React.FC = () => {
  return (
    <div className="messenger-chat-container">
      <div className="messenger-chat-header">
        <p>Nathan Lee</p>
      </div>
      <div className="messenger-chat-display-container">
        <div className="messenger-chat-item chat-receiver">
          <img src="./images/user.jpg" alt="" />
          <p>
            We're headed to Tahoe this weekend. Something warm would be nice...
          </p>
        </div>

        <div className="messenger-chat-item chat-sender">
          <p>
            We're headed to Tahoe this weekend. Something warm would be nice...
          </p>
          <img src="./images/user.jpg" alt="" />
        </div>

        <div className="messenger-chat-item chat-sender">
          <p>
            We're headed to Tahoe this weekend. Something warm would be nice...
          </p>
          <img src="./images/user.jpg" alt="" />
        </div>
      </div>

      <div className="messenger-chat-box-container">Text area</div>
    </div>
  )
}
