import React from 'react'

interface Props {
  userId: string
  userName: string
  userAvatar: string
  commentBody: string
  commentId: string
}
export const Comment: React.FC<Props> = ({
  userId,
  userAvatar,
  userName,
  commentBody,
  commentId,
}) => {
  return (
    <div className="comment-item-container">
      <img src={userAvatar} alt="" />
      <div>
        <p className="comment-user-name">
          {userName}
          <span> @2020/07/14</span>
        </p>
        <p className="comment-body">{commentBody}</p>
      </div>
    </div>
  )
}
