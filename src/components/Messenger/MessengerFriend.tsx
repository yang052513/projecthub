import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import { MessengerListMenu } from './MessengerList/MessengerListMenu'
import { AvatarOnline } from '../shared/AvatarOnline'

import { useHistory } from 'react-router-dom'
export const MessengerFriend: React.FC = () => {
  const user: any = firebase.auth().currentUser
  const [friend, setFriend] = useState<any>([])
  const history = useHistory()
  const fetchFriends = () => {
    firebase
      .firestore()
      .collection('user')
      .doc(user.uid)
      .collection('Friend')
      .doc('Added')
      .collection('Friends')
      .get()
      .then(docs => {
        docs.forEach(doc => {
          setFriend((prevFriend: any) => [...prevFriend, doc.data()])
        })
      })
  }
  useEffect(fetchFriends, [])

  const friendList = friend.map((item: any) => (
    <div key={item.FriendKey} className="messenger-friend-list-item">
      {/* <div className="messenger-friend-list-profile"> */}
      <AvatarOnline
        avator={item.FriendProfile.Avatar}
        userKey={item.FriendKey}
        userName={item.FriendProfile.Profile.profileName}
      />
      {/* <div>
          <h4>{item.FriendProfile.Profile.profileName}</h4>
          <p>Offline</p>
        </div>
      </div> */}

      <div className="messenger-friend-list-action">
        <Link to={`/messenger/chat/${item.FriendKey}`}>
          <button>
            <i className="fas fa-comment-alt"></i>
          </button>
        </Link>

        {/* <i className="fas fa-ellipsis-v"></i> */}
        <MessengerListMenu friendKey={item.FriendKey} />
      </div>
    </div>
  ))

  return (
    <div className="messenger-chat-container">
      <div className="messenger-chat-header">
        <p>FRIENDS</p>
      </div>

      <div className="messenger-friend-list-container">
        {friend.length > 0 ? (
          friendList
        ) : (
          <div className="messenger-no-friend-container">
            <div className="project-welcome-container">
              <i className="fab fa-wpexplorer welcome-icon"></i>
              <div>
                <h3>Explore Developers</h3>
                <p>Find out other frequent developers on Projecthub</p>
              </div>
              <button onClick={() => history.push('/explore')}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>

            <div className="project-welcome-container">
              <i className="fas fa-user-friends welcome-icon"></i>
              <div>
                <h3>Projecthub Users</h3>
                <p>Display all the users that use projecthub</p>
              </div>
              <button onClick={() => history.push('/friends')}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>

            <div className="project-welcome-container">
              <i className="far fa-clock welcome-icon"></i>
              <div>
                <h3>Story Board</h3>
                <p>Communicate and meet new people by sharing stories</p>
              </div>
              <button onClick={() => history.push('/moment')}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
