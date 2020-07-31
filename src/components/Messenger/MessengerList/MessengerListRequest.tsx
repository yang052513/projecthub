import React from 'react'

interface Props {
  request: any
}

export const MessengerListRequest: React.FC<Props> = ({ request }) => {
  const requestList = request.map((item: any) => (
    <div key={item.FriendKey} className="messenger-list-request-item">
      <div className="messenger-list-request-profile">
        <img src={item.FriendProfile.Avatar} alt="" />
        <div>
          <h4>{item.FriendProfile.Profile.profileName}</h4>
          <p>
            <i className="fas fa-map-pin"></i>
            {item.FriendProfile.Profile.profileLocation}
          </p>
        </div>
      </div>

      <div className="messenger-list-request-button">
        <button>Accept</button>
        <button>Delete</button>
      </div>
    </div>
  ))

  return (
    <div className="messenger-list-request-container">
      <div className="messenger-list-header">
        <p>FRIENDS REQUEST</p>
      </div>

      {requestList}
    </div>
  )
}
