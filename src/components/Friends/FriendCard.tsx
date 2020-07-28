import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import { UserProfile } from '../Common/UserProfile'

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
  const user: firebase.User | null | any = firebase.auth().currentUser
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
      <div className="friend-card-avatar">
        <Link to={`/friends/${userId}`}>
          <img src={avatar} alt="" />
        </Link>
      </div>

      <div className="friend-card-info">
        <div className="friend-card-info-name">
          <p>{info.profileName}</p>
          <div>
            <i
              style={online ? onlineColor : null}
              className="fas fa-circle"
            ></i>
            <span>Online</span>
          </div>
        </div>
        <p className="friend-card-info-location">{info.profileLocation}</p>
        <p className="friend-card-info-bio">{info.profileBio}</p>

        <ul className="friend-card-info-skills">
          <li>React</li>
          <li>MongoDB</li>
          <li>Sass</li>
          <li>HTML5</li>
          <li>Javascript</li>
          <li>SQL</li>
          <li>Less</li>
        </ul>
      </div>

      {!(user.uid === userId) && (
        <div className="friend-card-button">
          <button>Add Friends</button>
          <button>Message</button>
        </div>
      )}
    </div>
  )
}
