import React from 'react'
import { MessengerListMenu } from './MessengerListMenu'

interface Props {
  friend: any
}

export const MessengerListFriend: React.FC<Props> = ({ friend }) => {
  const friendList = friend.map((item: any) => (
    <div key={item.FriendKey} className="messenger-list-friend-item">
      <img className="friend-avatar" src={item.FriendProfile.Avatar} alt="" />
      <p>{item.FriendProfile.Profile.profileName}</p>
      <MessengerListMenu friendKey={item.FriendKey} />
    </div>
  ))

  return (
    <div className="messenger-list-friend-container">
      <div className="messenger-list-header">
        <p>YOUR FRIENDS</p>
      </div>

      {friendList}
    </div>
  )
}
