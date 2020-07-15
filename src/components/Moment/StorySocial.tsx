import React from 'react'

interface Props {
  like: number

  likePost: () => void
  displayComment: () => void
}
export const StorySocial: React.FC<Props> = ({
  like,
  likePost,
  displayComment,
}) => {
  return (
    <div className="moment-story-social-container">
      <div>
        <i onClick={likePost} className="far fa-heart"></i>
        <p>{like}</p>
      </div>
      <div>
        <i onClick={displayComment} className="far fa-comment"></i>
        <p>8</p>
      </div>
    </div>
  )
}
