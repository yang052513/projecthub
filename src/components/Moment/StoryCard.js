import React from 'react'
import StorySocial from './StorySocial'

export default function StoryCard(props) {
  return (
    <div className="moment-story-card-container">
      <img src={props.imgUrl} alt="" />
      <div className="speech-bubble">
        <p className="moment-story-name">
          {props.name}
          <span className="moment-story-time"> @{props.time}</span>
        </p>
        <p className="moment-story-content">{props.content}</p>
        <StorySocial />
      </div>
    </div>
  )
}
