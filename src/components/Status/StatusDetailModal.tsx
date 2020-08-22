import React from 'react'

interface Props {
  activityList: any
  toggleModal: () => void
}

export const StatusDetailModal: React.FC<Props> = ({
  activityList,
  toggleModal,
}) => {
  const logList = activityList.map((log: any) => (
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
      <div onClick={toggleModal} className="status-overlay"></div>
      <div className="status-detail-modal-container component-layout">
        {logList}
      </div>
    </div>
  )
}
