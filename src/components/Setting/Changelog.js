import React from 'react'
import ChangeBlock from './ChangeLog/ChangeLogBlock'
import ChangeLogBlock from './ChangeLog/ChangeLogBlock'

function ChangeLog() {
  return (
    <div className="setting-content-container">
      <div className="setting-content-intro">
        <h2>Change Log</h2>
        <p>New features and updates</p>
      </div>

      <ChangeLogBlock
        version={'Version 0.0.1'}
        time={'RELEASED JUNE 6, 2020'}
        content={[
          { status: 'ADDED', info: 'Create project and manage status' },
          { status: 'ADDED', info: 'Built-in Kanban to track project status' },
          {
            status: 'ADDED',
            info: 'Project status board represents your overall report',
          },
          { status: 'ADDED', info: 'Explore other people excellent project' },
          {
            status: 'ADDED',
            info:
              'Publish a project request and find people who want to work with you',
          },
          {
            status: 'ADDED',
            info: 'Customize the apparence based on your preferrence',
          },
        ]}
      />
    </div>
  )
}

export default ChangeLog
