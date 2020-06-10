import React from 'react'

export default function StatusLog(props) {
  const activityLog = props.activity.map((item) => (
    <li key={item.Content}>
      {item.Content} on {item.Time}{' '}
    </li>
  ))
  return (
    <div className="status-card-container">
      <ul>{activityLog}</ul>
    </div>
  )
}
