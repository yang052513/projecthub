import React from 'react'

export default function StatusTag(props) {
  return (
    <div className="status-card-container">
      <p>最常使用的标签</p>
      <p>{props.tagCnt.tagContent}</p>
      <p>{props.tagCnt.tagCount}</p>
    </div>
  )
}
