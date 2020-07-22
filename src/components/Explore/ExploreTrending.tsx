import React from 'react'

export const ExploreTrending: React.FC = () => {
  return (
    <div className="explore-trending-container">
      <h3>Trending</h3>
      <div className="explore-trending-item">
        <div>
          <img src="./images/user.jpg" alt="" width="80px" height="80px" />
          <p>Nathan Lee</p>
        </div>
        <button>Follow</button>
      </div>
    </div>
  )
}
