import React from 'react'
import { ExploreProject } from './Explore/ExploreProject'
import { ExploreAuthor } from './Explore/ExploreAuthor'
import { ExploreTrending } from './Explore/ExploreTrending'

export const Explore: React.FC = () => {
  return (
    <div className="component-layout explore-container">
      <ExploreAuthor />
      <ExploreProject />
      <ExploreTrending />
    </div>
  )
}
