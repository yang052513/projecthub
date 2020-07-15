import React, { useState, useEffect } from 'react'
import firebase from 'firebase'

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

export const FriendCard: React.FC<Props> = ({ info, avatar, userId }) => {
  const [online, setOnline] = useState<boolean>(false)

  const fecthOnlineStatus = () => {
    firebase
      .firestore()
      .collection('user')
      .doc(userId)
      .get()
      .then((userDoc: any) => {
        setOnline(userDoc.data().Online)
      })
  }

  useEffect(fecthOnlineStatus, [])

  const onlineColor: any = {
    color: 'rgb(15, 207, 89)',
  }

  return (
    <div className="friend-card-item-container">
      <img src={avatar} alt="" />
      <div className="friend-card-item-info">
        <div>
          <i style={online ? onlineColor : null} className="fas fa-circle"></i>
          <p>{info.profileName}</p>
        </div>
        <button>Read More</button>
      </div>
    </div>
  )
}
