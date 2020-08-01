import React from 'react'

interface Props {
  friend: any
}

export const MessengerListFriend: React.FC<Props> = ({ friend }) => {
  const friendList = friend.map((item: any) => (
    <div className="messenger-list-friend-item">
      <img src={item.FriendProfile.Avatar} alt="" />
      <p>{item.FriendProfile.Profile.profileName}</p>
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
