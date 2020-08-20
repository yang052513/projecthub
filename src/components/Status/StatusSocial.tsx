import React from 'react'

interface Props {
  social: any
}

export const StatusSocial: React.FC<Props> = ({ social }) => {
  const socialList = social.map((item: any) => (
    <div key={item.Key} className="status-like-item ">
      <img src={item.Avatar} alt="" />
      <p className="status-like-msg">
        <span className="status-like-msg-user">{item.Message.Name}</span>{' '}
        {item.Message.Action}
        <span className="status-like-msg-content">"{item.Message.Title}"</span>
      </p>
      <p className="status-like-time">{item.Message.Date}</p>
    </div>
  ))

  return (
    <div className="status-card-item-wrap ">
      <h3>Recent Activity</h3>

      <div className="status-card-container status-activity-log-list">
        {socialList}
      </div>
    </div>
  )
}
