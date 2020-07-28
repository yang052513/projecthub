import React from 'react'
import firebase from 'firebase'

interface Props {
  userRef: string
  avatar: string
  username: string
  email: string
  github: string
  handleDelete: () => void
  handleAccept: () => void
}

export const GroupQueueItem: React.FC<Props> = ({
  userRef,
  avatar,
  username,
  email,
  github,
  handleAccept,
  handleDelete,
}) => {
  const user: any = firebase.auth().currentUser
  return (
    <div className="queue-item">
      <img src={avatar} alt="" />
      <p>
        <i className="far fa-user"></i>
        {username}
      </p>
      <p>
        <i className="far fa-envelope"></i>
        {email}
      </p>
      <p>
        <i className="fab fa-github"></i>
        {github === '' ? 'Not Provided' : github}
      </p>

      {userRef === user.uid ? (
        <p className="group-list-result">Owner</p>
      ) : (
        <div>
          <button>Message</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleAccept}>Accept</button>
        </div>
      )}
    </div>
  )
}
