import React from 'react'
import { ExploreProjectCard } from './ExploreProjectCard'

interface Props {
  project: any
}

export const ExploreProject: React.FC<Props> = ({ project }) => {
  const exploreProjectList = project.map((item: any) => (
    <ExploreProjectCard project={item} />
  ))

  return (
    <div className="explore-project-list-container">{exploreProjectList}</div>
  )
}
