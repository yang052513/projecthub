import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'

interface Props {
  friend: any
}
export const MessengerListChat: React.FC<Props> = ({ friend }) => {
  const user: any = firebase.auth().currentUser

  const [message, setMessage] = useState<string>('')

  // const fetchLatestMessage = () => {
  //   firebase
  //     .firestore()
  //     .collection('user')
  //     .doc(friend[0].FriendKey)
  //     .collection('Friend')
  //     .doc('Added')
  //     .collection('Friends')
  //     .doc(user.uid)
  //     .collection('Chat')
  //     .get()
  //     .then(docs => {
  //       docs.forEach(doc => {
  //         if (doc.data().UserRef !== user.uid) {
  //           setMessage(doc.data().Message)
  //         }
  //       })
  //     })
  // }

  // useEffect(fetchLatestMessage, [])

  console.log(friend[0])

  const chatList = friend.map((item: any) => (
    <Link
      className="messenger-list-chat-wrap"
      key={item.FriendKey}
      to={`/messenger/chat/${item.FriendKey}`}
    >
      <div className="messenger-list-chat-item">
        <img src={item.FriendProfile.Avatar} alt="" />
        <div>
          <h4>{item.FriendProfile.Profile.profileName}</h4>
          <p>Let me know what you think...</p>
        </div>
      </div>
    </Link>
  ))
  return (
    <div className="messenger-list-chat-container">
      <div className="messenger-list-header">
        <p>RECENT CHATS</p>
      </div>

      {chatList}
    </div>
  )
}
