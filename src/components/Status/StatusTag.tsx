import React from 'react'

interface Props {
  tagSort: any
}

export const StatusTag: React.FC<Props> = ({ tagSort }) => {
  const topThreeTag = tagSort.slice(0, 3).map((item: any) => (
    <li key={item.name}>
      {item.name} {item.cnt}
    </li>
  ))

  return (
    <div className="status-card-container">
      <p>最常使用的标签</p>
      <ul>{topThreeTag}</ul>
    </div>
  )
}
