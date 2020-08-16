import React, { useState, useEffect, useRef } from 'react'

export const MessengerFriend: React.FC = () => {
  return (
    <div className="messenger-chat-container">
      <div className="messenger-chat-header">
        <p>FRIENDS</p>
      </div>

      <div className="messenger-friend-list-container">
        <div className="messenger-friend-list-item">
          <div className="messenger-friend-list-profile">
            <img
              src="https://avatarfiles.alphacoders.com/117/117455.jpg"
              alt=""
            />
            <div>
              <h4>DNA_PolymerACE</h4>
              <p>Offline</p>
            </div>
          </div>

          <div className="messenger-friend-list-action">
            <button>
              <i className="fas fa-comment-alt"></i>
            </button>
            <button>
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>

        <div className="messenger-friend-list-item">
          <div className="messenger-friend-list-profile">
            <img
              src="https://avatarfiles.alphacoders.com/103/103518.png"
              alt=""
            />
            <div>
              <h4>DNA_PolymerACE</h4>
              <p>Offline</p>
            </div>
          </div>

          <div className="messenger-friend-list-action">
            <button>
              <i className="fas fa-comment-alt"></i>
            </button>
            <button>
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
