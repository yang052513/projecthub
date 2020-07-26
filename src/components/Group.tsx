import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import { useFetchProfile } from './Hooks/useFetchProfile'
import { GroupDetailCard } from './Group/GroupDetailCard'

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

    // 申请项目集合
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
          requestRef.collection('Requests').doc(user.uid).set({
            Key: user.uid,
            profile,
          })

          //将项目详细信息写入到申请者账户的 Application集合
          requestRef.get().then((doc: any) =>
            contributorRef.set({
              Key: doc.data().Key,
              Creator: {
                Avatar: doc.data().Creator.Avatar,
                Id: doc.data().Creator.Id,
              },
              Result: 'Applied',
            })
          )
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
    <GroupDetailCard
      key={item.Key}
      cardData={item}
      handleApply={() => handleApply(item.Creator.Id, item.Key)}
    />
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
