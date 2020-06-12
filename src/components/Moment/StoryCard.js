import React from 'react'
import StorySocial from './StorySocial'

export default function StoryCard(props) {
  return (
    <div className="moment-story-card-container">
      <img className="moment-story-user" src={props.avatar} alt="" />
      <div>
        <p className="moment-story-name">
          {props.name}
          <span className="moment-story-time"> @{props.time}</span>
        </p>
        <p className="moment-story-content">{props.content}</p>
        {props.picture === '' ? null : (
          <img className="moment-story-image" src={props.picture} alt="" />
        )}
        <StorySocial like={props.like} comment={props.comment} />
      </div>
    </div>
  )
}
