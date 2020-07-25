import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { GroupList } from './GroupList'

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

  return (
    <div className="component-layout group-post-container">
      <p>My Posts</p>
      <GroupList tableData={group} />

      {/* <p>My Applications</p>
      <GroupList tableData={application} /> */}
    </div>
  )
}
