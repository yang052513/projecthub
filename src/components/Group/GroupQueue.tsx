import React from 'react'

interface Props {
  queueData: any
}

export const GroupQueue: React.FC<Props> = ({ queueData }) => {
  const queueList = queueData.map((queue: any) => (
    <div className="queue-item" key={queue.avatar}>
      <img src={queue.avatar} alt="" />
      <p>
        <i className="far fa-user"></i>
        {queue.profile.profileName}
      </p>
      <p>
        <i className="far fa-envelope"></i>
        {queue.profile.profileEmail}
      </p>
      <p>
        <i className="fab fa-github"></i>
        {queue.profile.profileGithub === ''
          ? 'Not Provided'
          : queue.profile.profileGithub}
      </p>
      <button>Message</button>
      <button>Delete</button>
      <button>Accept</button>
    </div>
  ))
  return (
    <div className="group-queue-container">
      <h3>People Who Applied</h3>
      {queueList}
    </div>
  )
}
