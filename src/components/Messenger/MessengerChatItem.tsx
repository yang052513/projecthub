import React from 'react'
import firebase from 'firebase'

interface Props {
  chatItem: any
}

export const MessengerChatItem: React.FC<Props> = ({ chatItem }) => {
  const user: any = firebase.auth().currentUser
  const chatTime = chatItem.Date.split(' on ')[0]
  const chatDate = chatItem.Date.split(' on ')[1]

  return (
    <div>
      {chatItem.UserRef === user.uid ? (
        <div className="messenger-chat-item chat-sender">
          <p>
            <span>{chatItem.Date}</span>
            {chatItem.Message}
          </p>
          <img src={chatItem.Avatar} alt="" />
        </div>
      ) : (
        <div className="messenger-chat-item chat-receiver">
          <img src={chatItem.Avatar} alt="" />
          <p>
            {chatItem.Message} <span>{chatItem.Date}</span>
          </p>
        </div>
      )}
    </div>
  )
}
