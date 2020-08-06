import React from 'react'

export const StatusLike: React.FC = () => {
  return (
    <div className="status-card-item-wrap">
      <h3>Recent Activity</h3>

      <div className="status-card-container">
        <div className="status-like-item">
          <img src="./images/user.jpg" alt="" />
          <p className="status-like-msg">
            <span className="status-like-msg-user">Nathan Lee</span> liked your
            story
            <span className="status-like-msg-content">
              "计划的功能都做完了，完善下交互反馈就行了。还差一点bug就差不多可以了"
            </span>
          </p>
          <p className="status-like-time">Aug 05 20:23</p>
        </div>

        <div className="status-like-item">
          <img
            src="https://data.whicdn.com/images/331664383/original.jpg"
            alt=""
          />
          <p className="status-like-msg">
            <span className="status-like-msg-user">Alex Wang</span> commented
            your story
            <span className="status-like-msg-content">
              "Yeah, I think I need to practice more."
            </span>
          </p>
          <p className="status-like-time">July 15 20:23</p>
        </div>
      </div>
    </div>
  )
}
