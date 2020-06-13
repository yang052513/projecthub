import React from 'react'
import { ProjectStatusItem } from './ProjectStatusItem'

interface Props {
  project: any
}

export const ProjectStatus: React.FC<Props> = ({ project }) => {
  const completed = project.filter(
    (item: any) => item.projectData.Status === 'Completed'
  )

  const inprogress = project.filter(
    (item: any) => item.projectData.Status === 'In Progress'
  )

  const planning = project.filter(
    (item: any) => item.projectData.Status === 'Planning'
  )

  const dropped = project.filter(
    (item: any) => item.projectData.Status === 'Dropped'
  )

  return (
    <div className="project-status-container">
      <ProjectStatusItem caption="Total Projects" count={project.length} />
      <ProjectStatusItem caption="Completed" count={completed.length} />
      <ProjectStatusItem caption="In Progress" count={inprogress.length} />
      <ProjectStatusItem caption="Planning" count={planning.length} />
      <ProjectStatusItem caption="Dropped" count={dropped.length} />
    </div>
  )
}
