import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { ExploreProject, ExploreTrending } from './index'
import { Loading } from '../shared/Loading'
import { CSSTransition } from 'react-transition-group'

export const Explore: React.FC = () => {
  const [loading, setLoading] = useState<{ project: boolean; friend: boolean }>(
    {
      project: true,
      friend: true,
    }
  )
  const [project, setProject] = useState<Array<object | null | undefined>>([])
  const [user, setUser] = useState<Array<object | null | undefined>>([])

  const fetchExplore = () => {
    firebase
      .firestore()
      .collection('project')
      .get()
      .then(projectDoc => {
        projectDoc.forEach(doc => {
          setProject(prevProject => [...prevProject, doc.data()])
        })
        setLoading({ ...loading, project: false })
      })

    firebase
      .firestore()
      .collection('friends')
      .get()
      .then(userDoc => {
        userDoc.forEach(doc => {
          setUser(prevUser => [...prevUser, doc.data()])
        })
        setLoading({ ...loading, friend: false })
      })
  }

  useEffect(fetchExplore, [])

  return (
    <div className="component-layout ">
      {loading.project || loading.friend ? <Loading /> : null}

      <CSSTransition
        in={!(loading.project && loading.friend)}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <div className="explore-container">
          <ExploreProject projectData={project} />
          <ExploreTrending userData={user} />
        </div>
      </CSSTransition>
    </div>
  )
}
