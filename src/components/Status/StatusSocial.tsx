import React, { useState } from 'react'
import { StatusDetailModal } from './StatusDetailModal'
import CSSTransition from 'react-transition-group/CSSTransition'

interface Props {
  social: any
}

export const StatusSocial: React.FC<Props> = ({ social }) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const socialList = social.slice(0, 5).map((item: any) => (
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
    <div>
      <div className="status-card-item-wrap ">
        <h3>Recent Activity</h3>

        <div className="status-card-container status-activity-log-list">
          {socialList}

          {socialList.length > 5 && (
            <div className="status-log-button">
              <button onClick={() => setShowModal(true)}>View More</button>
            </div>
          )}
        </div>
      </div>

      <CSSTransition
        in={showModal}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <StatusDetailModal
          activityList={social}
          toggleModal={() => setShowModal(false)}
        />
      </CSSTransition>
    </div>
  )
}
