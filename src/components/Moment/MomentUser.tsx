import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import firebase from 'firebase'
import { StoryCard } from './StoryCard'
import { useFetchProfile } from '../Hooks/useFetchProfile'

export const MomentUser = () => {
  const params: any = useParams()
  const [moment, setMoment] = useState<Array<string | Object>>([])
  const user: any = firebase.auth().currentUser
  const currUserProfile = useFetchProfile(user.uid)

  const fetchUserMoment = () => {
    firebase
      .firestore()
      .collection('moment')
      .where('UserId', '==', params.ref)
      .get()
      .then(docs => {
        docs.forEach(doc => {
          setMoment(prevMoment => [...prevMoment, doc.data()])
        })
      })
  }

  const momentList = moment.map((moment: any) => (
    <StoryCard
      currUserProfile={currUserProfile}
      key={moment.Key}
      docRef={moment.Key}
      userId={moment.UserId}
      avatar={moment.Avatar}
      name={moment.Author}
      time={moment.Time}
      content={moment.Content}
      picture={moment.Picture}
    />
  ))

  useEffect(fetchUserMoment, [])
  return (
    <div className="component-layout moment-container">
      <div className="moment-story-card-wrap">{momentList}</div>
    </div>
  )
}
