import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import { useFetchProfile } from './Hooks/useFetchProfile'

export const Group: React.FC = () => {
  const [project, setProject] = useState<Array<object | null | undefined>>([])
  const user: any = firebase.auth().currentUser
  const profile = useFetchProfile(user.uid)

  const fetchGroup = () => {
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

  useEffect(fetchGroup, [])

  const submitApply = (docKey: string, creatorId: string) => {
    const requestRef = firebase.firestore().collection('group').doc(docKey)

    const creatorRef = firebase
      .firestore()
      .collection('user')
      .doc(creatorId)
      .collection('Queue')
      .doc(docKey)
      .collection('Requests')
      .doc(user.uid)

    const contributorRef = firebase
      .firestore()
      .collection('user')
      .doc(user.uid)
      .collection('Application')
      .doc(docKey)

    requestRef
      .collection('Requests')
      .doc(user.uid)
      .get()
      .then(reqDoc => {
        if (reqDoc.exists) {
          alert('你已经申请过了')
        } else {
          requestRef.collection('Requests').doc(user.uid).set(profile)
          creatorRef.set(profile)
          requestRef.get().then((doc: any) => contributorRef.set(doc.data()))
          console.log(`申请成功！`)
        }
      })
  }

  const handleApply = (creatorId: string, projectKey: string) => {
    if (user.uid === creatorId) {
      alert('You are the creator for this project')
    } else {
      submitApply(projectKey, creatorId)
    }
  }

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

      {item.docData.Contributors.map((contributor: any) => {
        if (contributor.Avatar === 'None') {
          return (
            <img
              onClick={() => handleApply(item.docData.Creator.Id, item.Key)}
              key={Math.random() * 255}
              className="project-author-avatar"
              src="./images/add.png"
              alt=""
            />
          )
        } else {
          return (
            <Link key={contributor.Id} to={`/friends/${contributor.Id}`}>
              <img
                className="project-author-avatar"
                src={contributor.Avatar}
                alt=""
              />
            </Link>
          )
        }
      })}
    </div>
  ))

  return (
    <div className="group-container component-layout">
      <Link to="/request">
        <button>Create A Request</button>
      </Link>

      <Link to="/grouppost">
        <button>My Request</button>
      </Link>

      {projectList}
    </div>
  )
}
