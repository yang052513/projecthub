import React, { useState, useEffect } from 'react'
import { ExploreCard } from './index'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { Loading } from '../shared/Loading'

export const Explore: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [userList, setUserList] = useState<any>([])

  const fetchExplore = () => {
    firebase
      .firestore()
      .collection('user')
      .get()
      .then(docs => {
        docs.forEach(doc => {
          if (doc.data().isExplore) {
            setUserList((prevUser: any) => [...prevUser, doc.id])
          }
        })
        setLoading(false)
      })
  }

  useEffect(fetchExplore, [])

  return (
    <div className="component-layout explore-developer-container">
      {loading ? (
        <Loading />
      ) : (
        <div className="explore-list-container">
          {userList.map((user: any) => (
            <ExploreCard key={user} userRef={user} />
          ))}
        </div>
      )}
    </div>
  )
}
