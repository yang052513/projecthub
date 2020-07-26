import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { GroupList } from './GroupList'
import { GroupApplication } from './GroupApplication'

export const GroupPost = () => {
  const user: any = firebase.auth().currentUser

  const [group, setGroup] = useState<Array<Object | null | undefined>>([])
  const [application, setApplication] = useState<
    Array<Object | null | undefined>
  >([])

  const fetchUserGroup = () => {
    firebase
      .firestore()
      .collection('user')
      .doc(user.uid)
      .collection('Application')
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length > 0) {
          querySnapshot.forEach(doc => {
            firebase
              .firestore()
              .collection('group')
              .doc(doc.data().Key)
              .get()
              .then(applicationDoc => {
                setApplication(prevState => [
                  ...prevState,
                  applicationDoc.data(),
                ])
              })
          })
        }
      })

    firebase
      .firestore()
      .collection('group')
      .where('Creator.Id', '==', user.uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length > 0) {
          querySnapshot.forEach(doc => {
            setGroup(prevGroup => [...prevGroup, doc.data()])
          })
        }
      })
  }

  useEffect(fetchUserGroup, [])

  return (
    <div className="component-layout group-post-container">
      <p>My Posts</p>
      <GroupList tableData={group} />

      <p>My Applications</p>
      <GroupApplication applicationList={application} />
    </div>
  )
}
