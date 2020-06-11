import React from 'react'
import StorySocial from './StorySocial'

export default function StoryCard(props) {
  return (
    <div className="moment-story-card-container">
      <img className="moment-story-user" src={props.imgUrl} alt="" />
      <div>
        <p className="moment-story-name">
          {props.name}
          <span className="moment-story-time"> @{props.time}</span>
        </p>
        <p className="moment-story-content">{props.content}</p>
        <img className="moment-story-image" src="/images/logout-2.jpg" alt="" />
        <StorySocial />
      </div>
    </div>
  )
}
