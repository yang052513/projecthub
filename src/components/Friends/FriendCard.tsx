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
    <div className="friend-card-item-container">
      <img src={avatar} alt="" />
      <div className="friend-card-item-info">
        <div>
          <i className="fas fa-circle"></i>
          <p>{info.profileName}</p>
        </div>
        <button>Read More</button>
      </div>
    </div>
  )
}
