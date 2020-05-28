import React, { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard'
import firebase from 'firebase'

function Project() {
  const db = firebase.firestore()
  const [project, setProject] = useState([])

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection('user')
        .doc(user.uid)
        .collection('Project')
        .get()
        .then((collection) => {
          collection.forEach((doc) => {
            setProject((prevProject) => [...prevProject, doc.data()])
          })
        })
    })
  }, [])

  console.log(project)
  const allProject = project.map((item) => (
    <ProjectCard key={item.Key} project={item.projectData} />
  ))

  return <div className="project-card-container">{allProject}</div>
}

export default Project
