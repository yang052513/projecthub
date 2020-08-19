import React from 'react'
import { ExploreProjectCard } from './ExploreProjectCard'

interface Props {
  projectData: any
}

export const ExploreProject: React.FC<Props> = ({ projectData }) => {
  const exploreProjectList = projectData.map((item: any) => (
    <ExploreProjectCard project={item} />
  ))

  return (
    <div className="explore-project-container">
      <h2>Explore Projects</h2>
      <div className="explore-project-list-container">{exploreProjectList}</div>
    </div>
  )
}
