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

      <div className="messenger-chat-tools-container">
        <i className="far fa-laugh"></i>
        <i className="far fa-image"></i>
        <i className="fas fa-link"></i>
      </div>
      <div className="messenger-chat-box-container">
        <textarea placeholder="Type Message..."></textarea>
      </div>
    </div>
  )
}
