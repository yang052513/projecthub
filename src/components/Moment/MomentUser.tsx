import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import firebase from 'firebase'
import { MomentCard } from './MomentCard'
import { ProfileContext } from '../../context/ProfileContext'

export const MomentUser = () => {
  const params: any = useParams()
  const [moment, setMoment] = useState<Array<string | Object>>([])
  const profile: any = useContext(ProfileContext)

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
    <MomentCard key={moment.Key} profile={profile} moment={moment} />
  ))

  useEffect(fetchUserMoment, [])
  return (
    <div className="component-layout moment-container">
      <div className="moment-story-card-wrap">{momentList}</div>
    </div>
  )
}
