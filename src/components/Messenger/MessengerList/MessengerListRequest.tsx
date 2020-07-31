import React from 'react'

export const MessengerListRequest = () => {
  return (
    <div className="messenger-list-request-container">
      <div className="messenger-list-header">
        <p>FRIENDS REQUEST</p>
      </div>

      <div className="messenger-list-request-item">
        <div className="messenger-list-request-profile">
          <img src="../../images/user.jpg" alt="" />
          <div>
            <h4>Nathan Lee</h4>
            <p>
              <i className="fas fa-map-pin"></i>
              Vancouver BC
            </p>
          </div>
        </div>

        <div className="messenger-list-request-button">
          <button>Accept</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  )
}
