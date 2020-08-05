import React from 'react'

interface Props {
  typeSort: any
}
export const StatusType: React.FC<Props> = ({ typeSort }) => {
  return (
    <div className="status-card-item-wrap">
      <h3>Project Categories</h3>

      <div className="status-card-container"></div>
    </div>
  )
}
