import React from 'react'

export const StatusContributor: React.FC = () => {
  return (
    <div className="status-card-item-wrap">
      <h3>Contributor Analysis</h3>

      <div className="status-card-container ">
        <div className="status-contributor-container">
          <h4>Projecthub</h4>
          <div className="status-contributor-list">
            <img src="./images/user.jpg" alt="" width="100px" height="100px" />
            <img
              src="https://avatarfiles.alphacoders.com/129/129668.png"
              alt=""
              width="100px"
              height="100px"
            />
            <img
              src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/131304884/original/bdd4334ef6253b3485bde1645455519a9d8e2b2e/make-you-a-random-anime-girl-avatar.jpg"
              alt=""
              width="100px"
              height="100px"
            />
          </div>

          <h4>CourseFlex Awesome</h4>
          <div className="status-contributor-list">
            <img
              src="https://avatarfiles.alphacoders.com/129/129668.png"
              alt=""
              width="100px"
              height="100px"
            />
            <img
              src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/131304884/original/bdd4334ef6253b3485bde1645455519a9d8e2b2e/make-you-a-random-anime-girl-avatar.jpg"
              alt=""
              width="100px"
              height="100px"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
