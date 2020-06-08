import React from 'react'
import firebase from 'firebase'
import ProjectStatusItem from './ProjectStatusItem'

export default function ProjectStatus(props) {
  const completed = props.project.filter(
    (item) => item.projectData.Status === 'Completed'
  )

  const inprogress = props.project.filter(
    (item) => item.projectData.Status === 'In Progress'
  )

  const planning = props.project.filter(
    (item) => item.projectData.Status === 'Planning'
  )

  const dropped = props.project.filter(
    (item) => item.projectData.Status === 'Dropped'
  )

  return (
    <div className="project-status-container">
      <ProjectStatusItem
        caption="Total Projects"
        count={props.project.length}
      />
      <ProjectStatusItem caption="Completed" count={completed.length} />
      <ProjectStatusItem caption="In Progress" count={inprogress.length} />
      <ProjectStatusItem caption="Planning" count={planning.length} />
      <ProjectStatusItem caption="Dropped" count={dropped.length} />
    </div>
  )
}
