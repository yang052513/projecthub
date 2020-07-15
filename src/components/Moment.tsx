import React, { useState, useEffect } from 'react'
import { StoryEditor } from './Moment/StoryEditor'
import { StoryCard } from './Moment/StoryCard'
import firebase from 'firebase'
import { Loading } from './Common/Loading'

export function Moment(props: any) {
  const db = firebase.firestore()

  const [loading, setLoading] = useState<boolean>(true)
  const [editor, setEditor] = useState<boolean>(false)
  const [moment, setMoment] = useState<Array<object | null | undefined>>([])

  const displayEditor = () => {
    setEditor(true)
  }
  const offEditor = () => {
    setEditor(false)
  }
  //Initialize and read all the moment that stores in the database
  useEffect(() => {
    db.collection('moment')
      .orderBy('Time', 'asc')
      .get()
      .then(query => {
        query.forEach(doc => {
          setMoment(prevMoment => [...prevMoment, doc.data()])
        })
      })
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [db])

  //Loop all the moment and render in storycard component
  const momentList = moment.map((moment: any) => (
    <StoryCard
      key={moment.Key}
      docRef={moment.Key}
      userId={moment.UserId}
      avatar={moment.Avatar}
      name={moment.Author}
      time={moment.Time}
      content={moment.Content}
      picture={moment.Picture}
      like={moment.Like}
    />
  ))

  return (
    <div className="component-layout moment-container">
      {loading ? (
        <Loading />
      ) : (
        <div className="moment-story-card-wrap">{momentList}</div>
      )}

      {/* Creat a new moment button */}
      <div className="post-moment-container">
        <i onClick={displayEditor} className="fas fa-feather"></i>
      </div>

      {/* Display the moment editor container */}
      {editor ? (
        <StoryEditor
          profile={props.profile}
          avatar={props.avatar}
          toggle={offEditor}
        />
      ) : null}
    </div>
  )
}
