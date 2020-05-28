import React from 'react'

function ProjectCard(props) {
  const toolList = props.project.Tools.map((tool) => <li key={tool}>{tool}</li>)
  return (
    <div className="project-card-item">
      <div className="project-line"></div>
      <div className="project-header">
        <p className="project-title">{props.project.Name}</p>
        <p className="project-status">{props.project.Status}</p>
      </div>
      <p className="project-category">{props.project.Category}</p>
      <p className="project-desc">{props.project.Desc}</p>
      <ul className="project-tools">{toolList}</ul>
      <div className="project-contributor">
        <img src="/images/user.jpg" alt="contributor" />
        <img src="/images/user.jpg" alt="contributor" />
        <img src="/images/user.jpg" alt="contributor" />
        <img src="/images/user.jpg" alt="contributor" />
      </div>
      <div className="project-footer">
        <p>{props.project.Privacy}</p>
        <i className="far fa-edit"></i>
      </div>
    </div>
  )
}

export default ProjectCard
