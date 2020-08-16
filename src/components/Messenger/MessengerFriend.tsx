import React, { useState, useEffect, useRef } from 'react'
import firebase from 'firebase'

export const MessengerFriend: React.FC = () => {
  const user: any = firebase.auth().currentUser
  const [friend, setFriend] = useState<any>([])

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
      <div className="messenger-friend-list-profile">
        <img src={item.FriendProfile.Avatar} alt="" />
        <div>
          <h4>{item.FriendProfile.Profile.profileName}</h4>
          <p>Offline</p>
        </div>
      </div>

      <div className="messenger-friend-list-action">
        <button>
          <i className="fas fa-comment-alt"></i>
        </button>
        <button>
          <i className="fas fa-ellipsis-v"></i>
        </button>
      </div>
    </div>
  ))

  return (
    <div className="messenger-chat-container">
      <div className="messenger-chat-header">
        <p>FRIENDS</p>
      </div>

      <div className="messenger-friend-list-container">{friendList}</div>
    </div>
  )
}
