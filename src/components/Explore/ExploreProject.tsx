import React from 'react'

export const ExploreProject: React.FC = () => {
  return (
    <div className="explore-project-list-container">
      <div className="project-card-item">
        <div className="project-header">
          <p className="project-title">Course Flex</p>
          <img src="/images/user.jpg" alt="" width="80px" height="80px" />
        </div>
        <p className="project-category">Web App</p>
        <p className="project-desc">
          🗓 CC college course schedule generator with timetable preview
        </p>

        <ul className="project-tools">
          <li>hexo</li>
          <li>react</li>
          <li>Typescript</li>
          <li>mongoDB</li>
        </ul>

        <p className="project-category">last updated on Jul 22, 2020 13:20</p>
      </div>
    </div>
  )
}
