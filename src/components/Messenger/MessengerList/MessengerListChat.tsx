import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'

interface Props {
  friend: any
}
export const MessengerListChat: React.FC<Props> = ({ friend }) => {
  const user: any = firebase.auth().currentUser

  const chatList = friend.map((item: any) => (
    <Link
      className="messenger-list-chat-wrap"
      key={item.FriendKey}
      to={`/messenger/chat/${item.FriendKey}`}
    >
      <div className="messenger-list-chat-item">
        <img src={item.FriendProfile.Avatar} alt="" />
        <div>
          <h4>{item.FriendProfile.Profile.profileName}</h4>
          <div className="messenger-list-chat-notify">
            <p>
              {item.LatestNotify
                ? `${item.LatestNotify.Msg.slice(0, 15)}...`
                : `No Chat with ${item.FriendProfile.Profile.profileName}`}
            </p>
            <p>{item.LatestNotify && item.LatestNotify.Date}</p>
          </div>
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
