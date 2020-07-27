import React from 'react'

interface Props {
  avatar: string
  username: string
  email: string
  github: string
  handleDelete: () => void
  handleAccept: () => void
}

export const GroupQueueItem: React.FC<Props> = ({
  avatar,
  username,
  email,
  github,
  handleAccept,
  handleDelete,
}) => {
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
      <button>Message</button>
      <button onClick={() => handleDelete()}>Delete</button>
      <button onClick={() => handleAccept()}>Accept</button>
    </div>
  )
}
