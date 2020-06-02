import React from 'react'
import ChangeLogBlock from './ChangeLog/ChangeLogBlock'
import changelogData from '../../ChangeLog.json'

function ChangeLog() {
  const changelogBlock = changelogData.versions.map((item) => (
    <ChangeLogBlock
      key={item.version}
      version={item.version}
      time={item.release}
      content={item.content}
    />
  ))

  return (
    <div className="setting-content-container">
      <div className="setting-content-intro">
        <h2>Change Log</h2>
        <p>New features and updates</p>
      </div>
      {changelogBlock}
    </div>
  )
}

export default ChangeLog
