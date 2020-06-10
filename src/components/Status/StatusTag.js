import React from 'react'

export default function StatusTag(props) {
  const topThreeTag = props.tagSort.slice(0, 3).map((item) => (
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
