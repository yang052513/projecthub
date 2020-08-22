import React from 'react'
import { ExploreUserProfile, ExploreProject } from './index'

interface Props {
  project: any
  profile: any
}

export const ExploreCard: React.FC<Props> = ({ project, profile }) => {
  return (
    <div className="explore-card-container">
      <ExploreUserProfile profile={profile} />
      <ExploreProject project={project} />
    </div>
  )
}
