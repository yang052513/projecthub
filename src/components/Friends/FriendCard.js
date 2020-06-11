import React from 'react'

export default function FriendCard(props) {
  return (
    <div>
      <p>{props.info.profileName}</p>
      <img src={props.avatar} alt="" width="100px" height="100px" />
    </div>
  )
}
