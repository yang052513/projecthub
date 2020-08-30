import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { Loading } from '../shared/Loading'
import { HomeProjectCard } from './HomeProjectCard'
import { CSSTransition } from 'react-transition-group'
import { useHistory } from 'react-router-dom'
interface Props {
  sort: string | undefined | null
  filter: string | undefined | null
  search: string | undefined | null
}

export const HomeProject: React.FC<Props> = ({ sort, filter, search }) => {
  const db = firebase.firestore()
  const user: any = firebase.auth().currentUser
  const [project, setProject] = useState<any>([])
  const [initial, setInitial] = useState(false)
  const history = useHistory()

  //Read all the projects in the user's database
  useEffect(() => {
    db.collection('user')
      .doc(user.uid)
      .collection('Project')
      .get()
      .then(collection => {
        collection.forEach(doc => {
          setProject((prevProject: any) => [...prevProject, doc.data()])
        })
        //First time log the app set initial message
        if (collection.docs.length === 0) {
          setInitial(true)
        }
      })
  }, [])

  const renderProject = project
    .sort((a: any, b: any) => {
      if (sort === 'Name') {
        return a.Name < b.Name ? -1 : 1
      } else if (sort === 'Status') {
        return a.Status < b.Status ? -1 : 1
      } else if (sort === 'Newest') {
        return a.StartDate < b.StartDate ? 1 : -1
      } else if (sort === 'Oldest') {
        return a.StartDate < b.StartDate ? -1 : 1
      }
    })
    .filter((item: any) => {
      if (filter === 'All My Projects') {
        return (
          item && item.Name.toLowerCase().includes(search!.toLocaleLowerCase())
        )
      } else {
        return item.Status === filter && item.Name.includes(search)
      }
    })
    .map((project: any) => (
      <HomeProjectCard
        key={project.Key}
        project={project}
        docRef={project.Key}
      />
    ))

  return (
    <div className="project-card-container">
      {/* Initialzie all the project */}
      <CSSTransition
        in={project.length === 0 && !initial}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <Loading />
      </CSSTransition>

      <CSSTransition
        in={!(project.length === 0 && !initial)}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <div className="project-card-list-container">{renderProject}</div>
      </CSSTransition>

      {/* First time use the app, prompt message */}

      <CSSTransition
        in={project.length === 0 && initial}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <div className="project-welcome-list">
          <div className="project-welcome-container">
            <p className="project-welcome-emoji">👋</p>
            <div>
              <h3>Welcome to Projecthub</h3>
              <p>Create your first project now</p>
            </div>
            <button onClick={() => history.push('/create')}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          <div className="project-welcome-container">
            <p className="project-welcome-emoji">📊</p>
            <div>
              <h3>Periodic Analysis</h3>
              <p>Find out your project analysis</p>
            </div>
            <button onClick={() => history.push('/status')}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          <div className="project-welcome-container">
            <p className="project-welcome-emoji">👨‍💻</p>
            <div>
              <h3>Projecthub Explore</h3>
              <p>Work with other contributors</p>
            </div>
            <button onClick={() => history.push('/group')}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </CSSTransition>

      {/* No searched or filter result */}
      <CSSTransition
        in={renderProject.length === 0 && project.length !== 0}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <div className="project-no-result-container">
          <p>It seems like no such projects...</p>
          <img src="/images/noresult.png" alt="" />
        </div>
      </CSSTransition>
    </div>
  )
}
