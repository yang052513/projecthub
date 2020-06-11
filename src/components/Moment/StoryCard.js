import React from 'react'

export default function StoryCard(props) {
  return (
    <div>
      <img src={props.imgUrl} alt="" width="50px" height="50px" />
      <h3>{props.name}</h3>
      <p>{props.content}</p>
    </div>
  )
}
