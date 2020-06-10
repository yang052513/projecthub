import React from 'react'

export default function StatusType(props) {
  return (
    <div className="status-card-container">
      <p>{props.typeCnt.typeCount}</p>
      <p>{props.typeCnt.typeContent}</p>
    </div>
  )
}
