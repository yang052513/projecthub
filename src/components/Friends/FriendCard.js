import React from 'react'

export default function FriendCard(props) {
  return (
    // 可以的话之后可以做一个个人空间展示，点击用户卡片转入详细页面 只能看
    <div>
      <p>{props.info.profileName}</p>
      <img src={props.avatar} alt="" width="100px" height="100px" />
    </div>
  )
}
