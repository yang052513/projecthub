import React from 'react'
import ChangeLogContent from './ChangeLogContent'

export default function ChangeLogBlock(props) {
  const changeLog = props.content.map((item) => (
    <ChangeLogContent status={item.status} info={item.info} />
  ))
  return (
    <div className="setting-content-changelog">
      <h4>
        {props.version}
        <span>{props.time}</span>
      </h4>
      <hr />
      <div className="setting-content-changelog-block">{changeLog}</div>
    </div>
  )
}
