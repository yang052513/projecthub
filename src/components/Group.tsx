import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import { useFetchProfile } from './Hooks/useFetchProfile'
import { GroupDetailCard } from './Group/GroupDetailCard'

import { Feedback } from './Common/Feedback'

export const Group: React.FC = () => {
  const [project, setProject] = useState<Array<object | null | undefined>>([])
  const user: any = firebase.auth().currentUser
  const profile = useFetchProfile(user.uid)

  const [feedback, setFeedback] = useState<any>({
    show: false,
    msg: '',
    info: '',
  })

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

  const submitApply = (docKey: string) => {
    const requestRef = firebase.firestore().collection('group').doc(docKey)
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
        // If user already applied the project -> Error Modal -> Direct to Dashboard
        if (reqDoc.exists) {
          setFeedback({
            show: true,
            msg: 'Application Repeated',
            info: `You have already applied this project, please check your application history by clicking My Request button`,
          })
        } else {
          requestRef.collection('Requests').doc(user.uid).set({
            Key: user.uid,
            profile,
          })

          // Write to current user's application collection
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

          // Application Success -> Success Modal to Reload
          setFeedback({
            show: true,
            msg: 'Application Success',
            info: 'Please wait the project owner response to your application',
          })
        }
      })
  }

  const handleApply = (creatorId: string, projectKey: string) => {
    // If the creator trying to apply his project -> Error Modal
    if (user.uid === creatorId) {
      setFeedback({
        show: true,
        msg: 'Application Failed',
        info: 'You can not apply the project you created.',
      })
    } else {
      submitApply(projectKey)
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
      <div className="group-header-container">
        <Link to="/request">
          <button>Create A Request</button>
        </Link>

        <Link to="/grouppost">
          <button>My Request</button>
        </Link>
      </div>

      <div className="group-project-list-container">{projectList}</div>

      {feedback.show && (
        <Feedback
          msg={feedback.msg}
          info={feedback.info}
          imgUrl="/images/emoji/emoji_scare.png"
          toggle={() => {
            setFeedback({
              show: false,
              info: '',
              msg: '',
            })
          }}
        />
      )}
    </div>
  )
}
