import React from 'react'

export default function ProjectStatusItem(props) {
  return (
    <div className="project-status-item-container">
      <h4>{props.caption}</h4>
      <h5>{props.count}</h5>
    </div>
  )
}
