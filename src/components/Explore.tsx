import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { ExploreProject } from './Explore/ExploreProject'
import { ExploreTrending } from './Explore/ExploreTrending'
import { Loading } from './Common/Loading'
import { CSSTransition } from 'react-transition-group'

export const Explore: React.FC = () => {
  const [loadingProject, setLoadingProject] = useState<boolean>(true)
  const [loadingFriend, setLoadingFriend] = useState<boolean>(true)

  const [project, setProject] = useState<Array<object | null | undefined>>([])
  const [userList, setUserList] = useState<Array<object | null | undefined>>([])

  const fetchProject = () => {
    firebase
      .firestore()
      .collection('project')
      .get()
      .then(projectDoc => {
        projectDoc.forEach(doc => {
          setProject(prevProject => [...prevProject, doc.data()])
        })
        setLoadingProject(false)
      })

    firebase
      .firestore()
      .collection('friends')
      .get()
      .then(userDoc => {
        userDoc.forEach(doc => {
          setUserList(prevUser => [...prevUser, doc.data()])
        })
        setLoadingFriend(false)
      })
  }

  useEffect(fetchProject, [])

  return (
    <div className="component-layout ">
      {loadingProject || (loadingFriend && <Loading />)}

      <CSSTransition
        in={!(loadingProject && loadingFriend)}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <div className="explore-container">
          <ExploreProject projectData={project} />
          <ExploreTrending userData={userList} />
        </div>
      </CSSTransition>
    </div>
  )
}
