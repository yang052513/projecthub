import React, { useState } from 'react'
import { StatusDetailModal } from './StatusDetailModal'
import CSSTransition from 'react-transition-group/CSSTransition'

interface Props {
  activity: any
}

export const StatusLog: React.FC<Props> = ({ activity }) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const projectLog = activity.slice(0, 5).map((log: any) => (
    <div className="status-log-item" key={log.Key}>
      <img src={log.Avatar} alt="" />
      <p className="status-like-msg">
        <span className="status-like-msg-user">{log.Message.Name}</span>{' '}
        {log.Message.Action}
        <span className="status-like-msg-content">{log.Message.Title}</span>
      </p>
      <p className="status-like-time">{log.Message.Date}</p>
    </div>
  ))
  return (
    <div>
      <div className="status-card-item-wrap">
        <h3>Project Log</h3>
        <div className="status-card-container status-activity-log-list">
          {activity.length === 0 && (
            <p className="status-no-log">暂无项目记录</p>
          )}
          {projectLog}

          {activity.length > 5 && (
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
          activityList={activity}
          toggleModal={() => setShowModal(false)}
        />
      </CSSTransition>
    </div>
  )
}
