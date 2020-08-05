import React from 'react'

interface Props {
  typeCnt: any
}
export const StatusType: React.FC<Props> = ({ typeCnt }) => {
  return (
    <div className="status-card-item-wrap">
      <h3>Project Categories</h3>

      <div className="status-card-container">
        <p>{typeCnt.typeCount}</p>
        <p>{typeCnt.typeContent}</p>
      </div>
    </div>
  )
}
