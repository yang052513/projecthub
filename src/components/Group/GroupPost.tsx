import React, { useState, useEffect } from 'react'
import firebase from 'firebase'

export const GroupPost = () => {
  const user: any = firebase.auth().currentUser

  const [group, setGroup] = useState<Array<Object | null | undefined>>([])

  const [application, setApplication] = useState<
    Array<Object | null | undefined>
  >([])

  const fetchGroupPost = () => {
    const userRef = firebase.firestore().collection('user').doc(user.uid)

    userRef
      .collection('Queue')
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length > 0) {
          querySnapshot.forEach(doc => {
            setGroup(prevGroup => [...prevGroup, doc.data()])
          })
        }
      })

    userRef
      .collection('Application')
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length > 0) {
          querySnapshot.forEach(doc => {
            setApplication(prevApplication => [...prevApplication, doc.data()])
          })
        }
      })
  }

  useEffect(fetchGroupPost, [])

  const groupPostList = group.map((item: any) => (
    <div key={item.Key}>
      <p>{item.docData.Name}</p>
      <p>{item.docData.Category}</p>
      <p>{item.docData.Description}</p>
    </div>
  ))

  const appliedPostList = application.map((item: any) => (
    <div key={item.Key}>
      <p>{item.docData.Name}</p>
      <p>{item.docData.Category}</p>
      <p>{item.docData.Description}</p>
    </div>
  ))

  return (
    <div className="component-layout group-post-container">
      <p>Your Created Posts:</p>

      {groupPostList}

      <p>Your Applied Posts:</p>

      {appliedPostList}
    </div>
  )
}
