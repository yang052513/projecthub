import React from 'react'

interface Props {
  tagSort: any
}

export const StatusTag: React.FC<Props> = ({ tagSort }) => {
  const topThreeTag = tagSort.map((item: any) => (
    <li key={item.name}>
      {item.name} {item.cnt}
    </li>
  ))

  return (
    <div className="status-card-item-wrap">
      <h3>Most Used Technology</h3>
      <div className="status-card-container">
        <ul>{topThreeTag}</ul>
      </div>
    </div>
  )
}
