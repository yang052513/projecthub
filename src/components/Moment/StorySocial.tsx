import React from 'react'

interface Props {
  like: number
  comment: any
  likePost: () => void
  displayComment: () => void
}
export const StorySocial: React.FC<Props> = ({
  like,
  comment,
  likePost,
  displayComment,
}) => {
  return (
    <div className="moment-story-social-container">
      <div>
        <i onClick={likePost} className="far fa-heart"></i>
        <p>{like > 0 ? like : null}</p>
      </div>
      <div>
        <i onClick={displayComment} className="far fa-comment"></i>
        <p>{comment > 0 ? comment : ''}</p>
      </div>
    </div>
  )
}
