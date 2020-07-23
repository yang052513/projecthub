import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'

export const Group: React.FC = () => {
  const [project, setProject] = useState<Array<object | null | undefined>>([])

  const fetchProject = () => {
    firebase
      .firestore()
      .collection('group')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          setProject(prevProject => [...prevProject, doc.data()])
        })
      })
  }

  useEffect(fetchProject, [])

  const projectList = project.map((item: any) => (
    <div key={item.Key} className="project-card-item">
      <div className="project-header">
        <p className="project-title">{item.docData.Name}</p>
      </div>
      <p className="project-category">{item.docData.Category}</p>
      <p className="project-desc">{item.docData.Description}</p>

      <ul className="project-tools">
        {item.docData.Tools.map((tool: any) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
      <p className="project-category">
        {item.docData.StartDate} - {item.docData.EndDate}
      </p>

      {item.docData.Contributors.map((contributor: any) => (
        <img
          key={Math.random() * 255}
          className="project-author-avatar"
          src={
            contributor.Avatar === 'None'
              ? './images/add.png'
              : contributor.Avatar
          }
          alt=""
        />
      ))}
    </div>
  ))

  return (
    <div className="group-container component-layout">
      <Link to="/request">
        <button>Create A Request</button>
      </Link>

      <button>My Request</button>

      {projectList}
    </div>
  )
}
