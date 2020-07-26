import React from 'react'

interface Props {
  profileData: any
}
export const ExploreAuthor: React.FC<Props> = ({ profileData }) => {
  return (
    <div className="explore-author-container">
      <img src={profileData.avatar} alt="" width="100px" height="100px" />
      <p>Nathan Lee</p>
    </div>
  )
}
