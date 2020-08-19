import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import * as firebase from 'firebase/app'
import 'firebase/firestore'

import { MomentCard } from './MomentCard'
import { ProfileContext } from '../../context/ProfileContext'

export const MomentUser = () => {
  const params: any = useParams()
  const profile: any = useContext(ProfileContext)

  const [moment, setMoment] = useState<Array<string | Object>>([])

  useEffect(() => {
    const fetchUserMoment = async () => {
      const docs = await firebase
        .firestore()
        .collection('moment')
        .where('UserId', '==', params.ref)
        .get()
      docs.forEach(doc => {
        setMoment(prevMoment => [...prevMoment, doc.data()])
      })
    }
    fetchUserMoment()
  }, [])

  const momentList = moment.map((moment: any) => (
    <MomentCard key={moment.Key} profile={profile} moment={moment} />
  ))

  return (
    <div className="component-layout moment-container">
      <div className="moment-story-card-wrap">{momentList}</div>
    </div>
  )
}
