import React from 'react'
import ProjectStatusItem from './ProjectStatusItem'

export default function ProjectStatus() {
  return (
    <div className="project-status-container">
      <ProjectStatusItem caption="Total Projects" count={15} />
      <ProjectStatusItem caption="Completed" count={15} />
      <ProjectStatusItem caption="In Progress" count={15} />
      <ProjectStatusItem caption="Planning" count={15} />
      <ProjectStatusItem caption="Dropped" count={15} />
    </div>
  )
}
