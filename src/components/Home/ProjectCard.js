import React from 'react'

function ProjectCard() {
  return (
    <div className="project-card-item">
      <div className="project-header">
        <p className="project-title">NoPandemic.</p>
        <p className="project-status">In Progress</p>
      </div>
      <p className="project-category">Web App</p>
      <p className="project-desc">
        A web app that helps you manages project status and ideas as you go
      </p>
      <ul className="project-tools">
        <li>React</li>
        <li>Firebase</li>
        <li>Sass</li>
        <li>Python</li>
        <li>HTML5</li>
      </ul>
      <div className="project-contributor">
        <img src="/images/user.jpg" alt="contributor" />
        <img src="/images/user.jpg" alt="contributor" />
        <img src="/images/user.jpg" alt="contributor" />
        <img src="/images/user.jpg" alt="contributor" />
      </div>
      <div className="project-footer">
        <p>Edit 5 days ago</p>
        <i className="far fa-edit"></i>
      </div>
    </div>
  )
}

export default ProjectCard
