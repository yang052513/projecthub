import React, { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard'
import firebase from 'firebase'
import Loading from '../Loading'

function Project(props) {
  const db = firebase.firestore()
  const [project, setProject] = useState([])

  const [test, setTets] = useState([])

  //初始化从数据库读取所有项目
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

  //分类排序项目
  // useEffect(() => {
  //   const sortedProject = project.sort((a, b) => {
  //     if (props.sort === 'Name') {
  //       return a.projectData.Name < b.projectData.Name ? -1 : 1
  //     } else if (props.sort === 'Status') {
  //       return a.projectData.Status < b.projectData.Status ? -1 : 1
  //     } else if (props.sort === 'Newest') {
  //       return a.projectData.Date < b.projectData.Date ? 1 : -1
  //     } else if (props.sort === 'Oldest') {
  //       return a.projectData.Date < b.projectData.Date ? -1 : 1
  //     }
  //   })
  //   setProject(sortedProject)
  // }, [props.sort])

  useEffect(() => {
    const renderProject = project
      .sort((a, b) => {
        if (props.sort === 'Name') {
          return a.projectData.Name < b.projectData.Name ? -1 : 1
        } else if (props.sort === 'Status') {
          return a.projectData.Status < b.projectData.Status ? -1 : 1
        } else if (props.sort === 'Newest') {
          return a.projectData.Date < b.projectData.Date ? 1 : -1
        } else if (props.sort === 'Oldest') {
          return a.projectData.Date < b.projectData.Date ? -1 : 1
        } else {
          return a.projectData.Name < b.projectData.Name ? -1 : 1
        }
      })
      .filter((item) => {
        if (props.filter === 'All My Projects') {
          return item.projectData.Name.includes(props.search)
        } else {
          return (
            item.projectData.Status === props.filter &&
            item.projectData.Name.includes(props.search)
          )
        }
      })
    setTets(renderProject)
  }, [props.sort, props.search, props.filter])

  //根据用户选择筛选相关项目
  const renderProject = project
    .filter((item) => {
      if (props.filter === 'All My Projects') {
        return item.projectData.Name.includes(props.search)
      } else {
        return (
          item.projectData.Status === props.filter &&
          item.projectData.Name.includes(props.search)
        )
      }
    })
    .map((project) => (
      <ProjectCard
        key={project.Key}
        project={project.projectData}
        docRef={project.Key}
      />
    ))

  const example = test.map((project) => (
    <ProjectCard
      key={project.Key}
      project={project.projectData}
      docRef={project.Key}
    />
  ))

  return <div className="project-card-container">{example}</div>
}

export default Project
