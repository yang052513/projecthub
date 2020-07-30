import React from 'react'

interface Props {
  like: any
  hasLiked: boolean
  comment: any
  handleLike: () => void
  displayComment: () => void
}
export const StorySocial: React.FC<Props> = ({
  like,
  hasLiked,
  comment,
  handleLike,
  displayComment,
}) => {
  return (
    <div className="moment-story-social-container">
      {hasLiked ? (
        <div>
          <i
            onClick={handleLike}
            className="fas fa-heart"
            style={{ color: 'red' }}
          ></i>
          <p>{like}</p>
        </div>
      ) : (
        <div>
          <i onClick={handleLike} className="far fa-heart"></i>

          {like > 0 && <p>{like}</p>}
        </div>
      )}
      <div>
        <i onClick={displayComment} className="far fa-comment"></i>
        <p>{comment > 0 ? comment : ''}</p>
      </div>
    </div>
  )
}
