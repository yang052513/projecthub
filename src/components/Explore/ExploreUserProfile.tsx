import React from 'react'

interface Props {
  profile: any
}

export const ExploreUserProfile: React.FC<Props> = ({ profile }) => {
  return (
    <div className="explore-user-container">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/pinboard-25.appspot.com/o/230781.png?alt=media&token=5b6a2aa2-7aed-4ab7-99c8-18660684a0ee"
        alt=""
      />
      <div className="explpre-user-profile-container">
        <h3 className="explore-profile-name">Nathan Lee</h3>
        <p className="explore-profile-location">Vancouver, BC</p>
        <p className="explore-profile-bio">
          Currently a CST Term 3 student who is passionated about Web
          developement and IOS develo
        </p>

        <div className="button-container">
          <button>Read More</button>
          <button>Add Friends</button>
        </div>
      </div>
    </div>
  )
}
