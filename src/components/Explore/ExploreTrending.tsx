import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  userData: any
}

export const ExploreTrending: React.FC<Props> = ({ userData }) => {
  return (
    <div className="explore-trending-container">
      <h3>Trending</h3>

      {userData.map((item: any) => (
        <div key={item.Key} className="explore-trending-item">
          <div>
            <Link to={`/friends/${item.Key}`}>
              <img src={item.avatar} alt="" />
            </Link>

            <p>{item.profile.profileName}</p>
          </div>
          <button>Follow</button>
        </div>
      ))}
    </div>
  )
}
