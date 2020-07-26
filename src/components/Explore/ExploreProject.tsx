import React from 'react'

interface Props {
  projectData: any
}

export const ExploreProject: React.FC<Props> = ({ projectData }) => {
  const exploreProjectList = projectData.map((item: any) => (
    <div key={item.Key} className="project-card-item">
      <div className="project-header">
        <p className="project-title">{item.Name}</p>
      </div>
      <p className="project-category">{item.Category}</p>
      <p className="project-desc">{item.Description}</p>

      <ul className="project-tools">
        {item.Tools.map((tool: any) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
      <p className="project-category">last updated on Jul 22, 2020 13:20</p>
      <img className="project-author-avatar" src="/images/user.jpg" alt="" />
    </div>
  ))
  return (
    <div className="explore-project-list-container">
      <h2>Explore Projects</h2>
      {exploreProjectList}
    </div>
  )
}
