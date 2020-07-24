import React from 'react'
import firebase from 'firebase'

interface Props {
  queueData: any
}

export const GroupQueue: React.FC<Props> = ({ queueData }) => {
  const handleAccept = () => {
    //从公共group collection -> requests中删除这个用户 & 在contributor中加入
    //从项目拥有者queue -> requests中删除这个用户 & 在contributor中加入
  }
  const queueList = queueData.map((queue: any) => (
    <div className="queue-item" key={Math.random() * 255}>
      <img src={queue.profile.avatar} alt="" />
      <p>
        <i className="far fa-user"></i>
        {queue.profile.profile.profileName}
      </p>
      <p>
        <i className="far fa-envelope"></i>
        {queue.profile.profile.profileEmail}
      </p>
      <p>
        <i className="fab fa-github"></i>
        {queue.profile.profile.profileGithub === ''
          ? 'Not Provided'
          : queue.profile.profile.profileGithub}
      </p>
      <button>Message</button>
      <button>Delete</button>
      <button onClick={handleAccept}>Accept</button>
    </div>
  ))
  return (
    <div className="group-queue-container">
      <h3>People Who Applied</h3>
      {queueList}
    </div>
  )
}
