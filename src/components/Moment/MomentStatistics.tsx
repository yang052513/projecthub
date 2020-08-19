import React from 'react'

interface Props {
  like: number
  hasLiked: boolean
  comment: any
  handleLike: () => void
  handleDislike: () => void
  displayComment: () => void
}
export const MomentStatistics: React.FC<Props> = ({
  like,
  hasLiked,
  comment,
  handleLike,
  handleDislike,
  displayComment,
}) => {
  return (
    <div className="moment-story-social-container">
      {hasLiked ? (
        <div>
          <i
            onClick={handleDislike}
            className="fas fa-heart"
            style={{ color: 'red' }}
          ></i>
          <p>{like}</p>
        </div>
      ) : (
        <div>
          <i onClick={handleLike} className="far fa-heart"></i>

          {like > 0 && <p style={{ transition: 'all 0.5s' }}>{like}</p>}
        </div>
      )}
      <div>
        <i onClick={displayComment} className="far fa-comment"></i>
        <p>{comment > 0 && comment}</p>
      </div>
    </div>
  )
}
