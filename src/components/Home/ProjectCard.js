import React from 'react'
import EditMenu from './EditMenu'

const inProgress = 'rgb(67, 219, 118)'
const completed = 'rgb(51, 196, 206)'
const planning = 'rgb(206, 51, 90)'
const dropped = 'rgb(128, 128, 128)'

function ProjectCard(props) {
  let statusColor
  if (props.project.Status === 'In Progress') {
    statusColor = { backgroundColor: inProgress }
  } else if (props.project.Status === 'Completed') {
    statusColor = { backgroundColor: completed }
  } else if (props.project.Status === 'Planning') {
    statusColor = { backgroundColor: planning }
  } else if (props.project.Status === 'Dropped') {
    statusColor = { backgroundColor: dropped }
  }

  const toolList = props.project.Tools.map((tool) => <li key={tool}>{tool}</li>)

  return (
    <div className="project-card-item">
      <div style={statusColor} className="project-line"></div>
      <div className="project-header">
        <p className="project-title">{props.project.Name}</p>
        <p style={statusColor} className="project-status">
          {props.project.Status}
        </p>
      </div>
      <p className="project-category">{props.project.Category}</p>
      <p className="project-desc">{props.project.Desc}</p>
      <ul className="project-tools">{toolList}</ul>
      <div className="project-contributor">
        <img src="/images/user.jpg" alt="contributor" />
      </div>
      <div className="project-footer">
        <p>{props.project.Privacy}</p>
        <EditMenu docRef={props.docRef} />

        {/* <Link to={`/edit/${props.docRef}`}>
          <i id={props.docRef} className="fas fa-ellipsis-h"></i>
        </Link> */}
      </div>
    </div>
  )
}

export default ProjectCard
