import React from 'react'
import { ChangeLogContent } from './ChangeLogContent'

interface Props {
  key: string
  version: string
  time: string
  content: any
}

export const ChangeLogBlock: React.FC<Props> = ({
  key,
  version,
  time,
  content,
}) => {
  const changeLog = content.map((item: any) => (
    <ChangeLogContent key={item.info} status={item.status} info={item.info} />
  ))
  return (
    <div className="setting-content-changelog">
      <h4>
        {version}
        <span>{time}</span>
      </h4>
      <hr />
      <div className="setting-content-changelog-block">{changeLog}</div>
    </div>
  )
}
