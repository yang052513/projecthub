import React from 'react'

interface Props {
  userId: string
  userName: string
  userAvatar: string
  commentBody: string
  commentId: string
  commentDate: string
}
export const Comment: React.FC<Props> = ({
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
