import React from 'react'

interface Props {
  activity: any
}

export const StatusLog: React.FC<Props> = ({ activity }) => {
  const activityLog = activity.map((item: any) => (
    <li key={item.Key}>
      {item.Content} on {item.Time}{' '}
    </li>
  ))
  return (
    <div className="status-card-item-wrap">
      <h3>Activity Log</h3>
      <div className="status-card-container">
        <ul>{activityLog}</ul>
      </div>
    </div>
  )
}
