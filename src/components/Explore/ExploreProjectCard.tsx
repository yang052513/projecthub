import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  project: any
}

export const ExploreProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <div key={project.Key} className="project-card-item">
      <div className="project-header">
        <p className="project-title">{project.Name}</p>
      </div>
      <p className="project-category">{project.Category}</p>
      <p className="project-desc">{project.Description}</p>

      <ul className="project-tools">
        {project.Tools.map((tool: any) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>

      <p className="project-category">last updated on Jul 22, 2020 13:20</p>

      {project.Contributors.map((contributor: any) => (
        <Link to={`/friends/${contributor.Id}`}>
          <img
            key={contributor.Id}
            className="project-author-avatar"
            src={contributor.Avatar}
            alt=""
          />
        </Link>
      ))}
    </div>
  )
}
