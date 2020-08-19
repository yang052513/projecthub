import React from 'react'

interface Props {
  userName: string
  userAvatar: string
  commentBody: string
  commentDate: string
}
export const MomentCommentItem: React.FC<Props> = ({
  userAvatar,
  userName,
  commentBody,
  commentDate,
}) => {
  return (
    <div className="comment-item-container">
      <img src={userAvatar} alt="" />
      <div>
        <p className="comment-user-name">
          {userName}
          <span> @{commentDate}</span>
        </p>
        <p className="comment-body">{commentBody}</p>
      </div>
    </div>
  )
}
