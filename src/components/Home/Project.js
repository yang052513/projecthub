import React, { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard'
import firebase from 'firebase'
import Loading from '../Common/Loading'

function Project(props) {
  const db = firebase.firestore()
  const [project, setProject] = useState([])
  const [initial, setInitial] = useState(false)

  const [launch, setLaunch] = useState(false)
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
          if (collection.docs.length === 0) {
            setInitial(true)
          }
          // console.log(collection.docs)
        })
    })
    setLaunch(true)
  }, [])

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

  const filteredProject = sortedProject
    .filter((item) => {
      if (props.filter === 'All My Projects') {
        return item && item.projectData.Name.includes(props.search)
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

  let loading = project.length

  return (
    <div className="project-card-container">
      {/* 初始化加载 */}
      {loading === 0 && !initial ? <Loading /> : filteredProject}

      {loading === 0 && initial ? (
        <div className="project-no-result-container">
          <p>Welcome to Projecthub</p>
          <img src="/images/noresult.png" />
        </div>
      ) : null}

      {/* 搜索或者筛选结果为空 */}
      {filteredProject.length === 0 && loading !== 0 ? (
        <div className="project-no-result-container">
          <p>It seems like no such projects...</p>
          <img src="/images/noresult.png" />
        </div>
      ) : null}
    </div>
  )
}

export default Project
