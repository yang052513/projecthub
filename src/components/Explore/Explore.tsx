import React, { useState, useEffect } from 'react'
import { ExploreCard } from './index'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { Loading } from '../shared/Loading'
import { CSSTransition } from 'react-transition-group'

export const Explore: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [explore, setExplore] = useState<any>([])

  const fetchExplore = () => {
    firebase
      .firestore()
      .collection('user')
      .get()
      .then(docs => {
        docs.forEach(doc => {
          let docData: any = {
            id: Math.random() * 16,
            profile: {},
            project: [],
          }
          firebase
            .firestore()
            .collection('user')
            .doc(doc.id)
            .collection('Project')
            .get()
            .then(projectCollection => {
              docData.key = doc.id
              projectCollection.forEach(projectDoc => {
                if (projectDoc.data().Public) {
                  docData.project.push(projectDoc.data())
                }
              })
            })
          firebase
            .firestore()
            .collection('user')
            .doc(doc.id)
            .collection('Setting')
            .doc('Profile')
            .get()
            .then(profileDoc => {
              docData.profile = profileDoc.data()
            })
          setExplore((prevExplore: any) => [...prevExplore, docData])
        })
        setLoading(false)
      })
  }

  useEffect(fetchExplore, [])

  return (
    <div className="component-layout explore-developer-container">
      {loading && <Loading />}

      <CSSTransition
        in={!loading}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <div className="explore-list-container">
          {explore.map((item: any) => (
            <ExploreCard
              key={Math.random() * 16}
              profile={item.profile}
              project={item.project}
            />
          ))}
        </div>
      </CSSTransition>
    </div>
  )
}
