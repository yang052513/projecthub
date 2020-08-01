import React from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'

interface Props {
  friend: any
}
export const MessengerListChat: React.FC<Props> = ({ friend }) => {
  const chatList = friend.map((item: any) => (
    <Link key={item.FriendKey} to={`/messenger/chat/${item.FriendKey}`}>
      <div className="messenger-list-chat-item">
        <img src={item.FriendProfile.Avatar} alt="" />
        <div>
          <h4>{item.FriendProfile.Profile.profileName}</h4>
          <p>Let me know what you think...</p>
        </div>
      </div>
    </Link>
  ))
  return (
    <div className="messenger-list-chat-container">
      <div className="messenger-list-header">
        <p>RECENT CHATS</p>
      </div>

      {chatList}
    </div>
  )
}
