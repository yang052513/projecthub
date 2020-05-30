import React, { useState, useEffect } from 'react'
import firebase from 'firebase'

function Logout() {
  const db = firebase.firestore()

  const [userName, setUserName] = useState('')

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection('user')
        .doc(user.uid)
        .get()
        .then((doc) => {
          setUserName(doc.data().Name)
        })
    })
  }, [])
  return (
    <div className="logout-container">
      <p>Take care {userName}</p>
    </div>
  )
}

export default Logout
