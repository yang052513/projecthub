import React, { useState } from 'react'
import StoryEditor from './Moment/StoryEditor'
import StoryCard from './Moment/StoryCard'

export default function Moment(props) {
  const [editor, setEditor] = useState(false)

  const displayEditor = () => {
    setEditor(true)
  }

  const offEditor = () => {
    setEditor(false)
  }

  return (
    <div className="component-layout moment-container">
      {editor ? (
        <StoryEditor
          profile={props.profile}
          avatar={props.avatar}
          toggle={offEditor}
        />
      ) : null}
      <div className="moment-story-card-wrap">
        <StoryCard
          imgUrl={'images/user.jpg'}
          name={'Yang Li'}
          time={'13:00 Jun 11, 2020'}
          content={'Projecthub is such a wonderful project bro!'}
        />
      </div>
      <div className="post-moment-container">
        <i onClick={displayEditor} className="fas fa-feather"></i>
      </div>
    </div>
  )
}
