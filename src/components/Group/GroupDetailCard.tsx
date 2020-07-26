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

      {cardData.Contributors.map((contributor: any) => {
        if (contributor.Avatar === 'None') {
          return (
            <img
              onClick={() => handleApply()}
              key={Math.random() * 255}
              className="project-author-avatar"
              src="./images/add.png"
              alt=""
              style={{ cursor: 'pointer' }}
              title={`Apply ${cardData.Name}`}
            />
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
  )
}
