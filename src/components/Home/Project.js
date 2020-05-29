import React, { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard'
import firebase from 'firebase'

function Project(props) {
  const db = firebase.firestore()
  const [project, setProject] = useState([])

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection('user')
        .doc(user.uid)
        .collection('Project')
        .orderBy('projectData.Name', 'asc')
        .get()
        .then((collection) => {
          collection.forEach((doc) => {
            setProject((prevProject) => [...prevProject, doc.data()])
          })
        })
    })
  }, [props.sort])

  const allProject = project.map((item) => (
    <ProjectCard key={item.Key} project={item.projectData} docRef={item.Key} />
  ))

  const selectedProject = project
    .filter((item) => item.projectData.Status === props.filter)
    .map((project) => (
      <ProjectCard
        key={project.Key}
        project={project.projectData}
        docRef={project.Key}
      />
    ))

  return (
    <div className="project-card-container">
      {props.filter === 'All My Projects' ? allProject : selectedProject}
    </div>
  )
}

export default Project
