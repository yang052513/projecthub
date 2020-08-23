import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  cardData: any
  handleApply: () => void
}
export const GroupDetailCard: React.FC<Props> = ({ cardData, handleApply }) => {
  return (
    <div key={cardData.Key} className="project-card-item">
      <div className="project-header">
        <p className="project-title">{cardData.Name}</p>
      </div>
      <p className="project-category">{cardData.Category}</p>
      <p className="project-desc">{cardData.Description}</p>

      <ul className="project-tools">
        {cardData.Tools.map((tool: any) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
      <p className="project-category">
        {cardData.StartDate} - {cardData.EndDate}
      </p>

      <div className="group-available">
        {cardData.Contributors.map((contributor: any) => {
          if (contributor.Avatar === 'None') {
            return (
              <button onClick={() => handleApply()}>
                <i className="fas fa-user-plus"></i>
              </button>
            )
          } else {
            return (
              <Link key={contributor.Id} to={`/friends/${contributor.Id}`}>
                <img
                  className="project-author-avatar"
                  src={contributor.Avatar}
                  alt=""
                />
              </Link>
            )
          }
        })}
      </div>
    </div>
  )
}
