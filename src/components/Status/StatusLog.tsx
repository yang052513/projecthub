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
      <h3>Activity Log</h3>
      <div className="status-card-container status-activity-log-list">
        <ul>{activityLog}</ul>
      </div>
    </div>
  )
}
