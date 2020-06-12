import React from 'react'

interface Profile {
  profileName: string | null
  profileEmail: string | null
  profileBio: string | null
  profileGithub: string | null
  profileLocation: string | null
  profileWeb: string | null
  profilelinkedin: string | null
}

interface Props {
  info: Profile
  avatar: string
  userId: string
}

export const FriendCard: React.FC<Props> = ({ info, avatar }) => {
  return (
    // 可以的话之后可以做一个个人空间展示，点击用户卡片转入详细页面 只能看
    <div>
      <p>{info.profileName}</p>
      <p>{info.profileLocation}</p>
      <img src={avatar} alt="" width="100px" height="100px" />
    </div>
  )
}
