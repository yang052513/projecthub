import React from 'react'

interface Props {
  activity: any
}

export const StatusLog: React.FC<Props> = ({ activity }) => {
  const projectLog = activity.map((log: any) => (
    <div className="status-log-item" key={log.Key}>
      <img src={log.Avatar} alt="" />
      <p className="status-like-msg">
        <span className="status-like-msg-user">{log.Message.Name}</span>{' '}
        {log.Message.Action}
        <span className="status-like-msg-content">{log.Message.Title}</span>
      </p>
      <p className="status-like-time">{log.Message.Date}</p>
    </div>
  ))
  return (
    <div className="status-card-item-wrap">
      <h3>Project Log</h3>
      <div className="status-card-container status-activity-log-list">
        {projectLog}
      </div>
    </div>
  )
}
