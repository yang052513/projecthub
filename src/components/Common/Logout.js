import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import Particle from './Particle'

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

    setTimeout(() => {
      firebase.auth().signOut()
    }, 3000)
  }, [])

  return (
    <div className="logout-container">
      <Particle />
      <p>Take care {userName}.</p>
    </div>
  )
}

export default Logout
