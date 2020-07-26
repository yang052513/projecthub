import React from 'react'
import { EditMenu } from './EditMenu'

const inProgress = 'rgb(67, 219, 118)'
const completed = 'rgb(51, 196, 206)'
const planning = 'rgb(206, 51, 90)'
const dropped = 'rgb(128, 128, 128)'

interface Props {
  project: any
  docRef: string | undefined
}

export const ProjectCard: React.FC<Props> = ({ project, docRef }) => {
  let statusColor
  if (project.Status === 'In Progress') {
    statusColor = { backgroundColor: inProgress }
  } else if (project.Status === 'Completed') {
    statusColor = { backgroundColor: completed }
  } else if (project.Status === 'Planning') {
    statusColor = { backgroundColor: planning }
  } else if (project.Status === 'Dropped') {
    statusColor = { backgroundColor: dropped }
  }

  const toolList = project.Tools.map((tool: any) => <li key={tool}>{tool}</li>)

  return (
    <div className="project-card-item">
      <div style={statusColor} className="project-line"></div>
      <div className="project-header">
        <p className="project-title">{project.Name}</p>
        <p style={statusColor} className="project-status">
          {project.Status}
        </p>
      </div>
      <p className="project-category">{project.Category}</p>
      <p className="project-desc">{project.Description}</p>
      <ul className="project-tools">{toolList}</ul>
      <div className="project-contributor">
        <img src="/images/user.jpg" alt="contributor" />
      </div>
      <div className="project-footer">
        <p>{project.Privacy}</p>
        <EditMenu docRef={docRef} projectName={project.Name} />
      </div>
    </div>
  )
}
