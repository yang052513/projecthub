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
    </div>
  ))

  return (
    <div className="messenger-list-friend-container">
      <div className="messenger-list-header">
        <p>YOUR FRIENDS</p>
      </div>

      {friend.length > 0 ? (
        friendList
      ) : (
        <div className="messenger-noresult">
          <p>暂无好友</p>
        </div>
      )}
    </div>
  )
}
