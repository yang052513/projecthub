import React from 'react'

export const Comment: React.FC = () => {
  return (
    <div className="comment-item-container">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/pinboard-25.appspot.com/o/emoji_scare.png?alt=media&token=a51229d4-5b23-4f93-9a2e-eb33cdb02d81"
        alt=""
      />
      <div>
        <p className="comment-user-name">
          Nathan Lee
          <span> @2020/07/14</span>
        </p>
        <p className="comment-body">SDsdsdsd</p>
      </div>
    </div>
  )
}
