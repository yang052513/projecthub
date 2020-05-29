import React, { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard'
import firebase from 'firebase'

function Project(props) {
  const db = firebase.firestore()
  const [project, setProject] = useState([])

  //初始化从数据库读取所有项目
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection('user')
        .doc(user.uid)
        .collection('Project')
        // .orderBy('projectData.Name', 'asc')
        .get()
        .then((collection) => {
          collection.forEach((doc) => {
            setProject((prevProject) => [...prevProject, doc.data()])
          })
        })
    })
  }, [])

  //一层: 分类项目
  const sortedProject = project.sort((a, b) => {
    if (props.sort === 'Name') {
      return a.projectData.Name < b.projectData.Name ? -1 : 1
    } else if (props.sort === 'Status') {
      return a.projectData.Status < b.projectData.Status ? -1 : 1
    } else if (props.sort === 'Newest') {
      return a.projectData.Date < b.projectData.Date ? 1 : -1
    } else if (props.sort === 'Oldest') {
      return a.projectData.Date < b.projectData.Date ? -1 : 1
    }
  })

  //二层: 渲染搜索的项目 初始化为0
  const searchedProject = sortedProject.filter((item) =>
    item.projectData.Name.includes(props.search)
  )

  //三层: 选择想渲染的项目
  const selectedProject = searchedProject
    .filter((item) => {
      if (props.filter === 'All My Projects') {
        return item
      } else {
        return item.projectData.Status === props.filter
      }
    })
    .map((project) => (
      <ProjectCard
        key={project.Key}
        project={project.projectData}
        docRef={project.Key}
      />
    ))

  console.log(searchedProject)
  return <div className="project-card-container">{selectedProject}</div>
}

export default Project
