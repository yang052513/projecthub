import React from 'react'

interface Props {
  like: number
  comment: any
  likePost: () => void
}
export const StorySocial: React.FC<Props> = ({ like, comment, likePost }) => {
  return (
    <div className="moment-story-social-container">
      <i onClick={likePost} className="far fa-heart"></i>
      {like}
      <i className="far fa-comment"></i>
      <i className="fas fa-ellipsis-h"></i>
    </div>
  )
}
