import React from 'react'

interface Props {
  activity: any
}

export const StatusLog: React.FC<Props> = ({ activity }) => {
  const activityLog = activity.map((item: any) => (
    <li key={item.Key}>
      <span className="status-activity-log-time">{item.Time}</span>
      <i className="fas fa-pen"></i>
      {item.Content}
    </li>
  ))
  return (
    <div className="status-card-item-wrap">
      <h3>Project Log</h3>
      <div className="status-card-container status-activity-log-list">
        {/* <ul>{activityLog}</ul> */}

        <div className="status-log-item">
          <img src="./images/user.jpg" alt="" />
          <p className="status-like-msg">
            <span className="status-like-msg-user">You</span> cretaed a new
            project
            <span className="status-like-msg-content">ProjectHub</span>
          </p>
          <p className="status-like-time">Aug 05 20:23</p>
        </div>
      </div>
    </div>
  )
}
