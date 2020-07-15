import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { Loading } from '../Common/Loading'
import { ProjectCard } from './ProjectCard'

interface Props {
  sort: string | undefined | null
  filter: string | undefined | null
  search: string | undefined | null
}

export const Project: React.FC<Props> = ({ sort, filter, search }) => {
  const db = firebase.firestore()
  const user: any = firebase.auth().currentUser
  const [project, setProject] = useState<any>([])
  const [initial, setInitial] = useState(false)

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
  }, [db, user.uid])

  // const sortedProject = project.sort((a: any, b: any) => {
  //   if (sort === 'Name') {
  //     return a.projectData.Name < b.projectData.Name ? -1 : 1
  //   } else if (sort === 'Status') {
  //     return a.projectData.Status < b.projectData.Status ? -1 : 1
  //   } else if (sort === 'Newest') {
  //     return a.projectData.Date < b.projectData.Date ? 1 : -1
  //   } else if (sort === 'Oldest') {
  //     return a.projectData.Date < b.projectData.Date ? -1 : 1
  //   }
  // })

  const renderProject = project
    .sort((a: any, b: any) => {
      if (sort === 'Name') {
        return a.projectData.Name < b.projectData.Name ? -1 : 1
      } else if (sort === 'Status') {
        return a.projectData.Status < b.projectData.Status ? -1 : 1
      } else if (sort === 'Newest') {
        return a.projectData.Date < b.projectData.Date ? 1 : -1
      } else if (sort === 'Oldest') {
        return a.projectData.Date < b.projectData.Date ? -1 : 1
      }
    })
    .filter((item: any) => {
      if (filter === 'All My Projects') {
        return item && item.projectData.Name.includes(search)
      } else {
        return (
          item.projectData.Status === filter &&
          item.projectData.Name.includes(search)
        )
      }
    })
    .map((project: any) => (
      <ProjectCard
        key={project.Key}
        project={project.projectData}
        docRef={project.Key}
      />
    ))

  return (
    <div className="project-card-container">
      {/* Initialzie all the project */}
      {project.length === 0 && !initial ? <Loading /> : renderProject}

      {/* First time use the app, prompt message */}
      {project.length === 0 && initial ? (
        <div className="project-no-result-container">
          <p>Welcome to Projecthub</p>
          <img src="/images/noresult.png" alt="" />
        </div>
      ) : null}

      {/* No searched or filter result */}
      {renderProject.length === 0 && project.length !== 0 ? (
        <div className="project-no-result-container">
          <p>It seems like no such projects...</p>
          <img src="/images/noresult.png" alt="" />
        </div>
      ) : null}
    </div>
  )
}

export default Project
