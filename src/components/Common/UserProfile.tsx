import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import firebase from 'firebase'
import { Loading } from './Loading'

export const UserProfile = () => {
  const userId: any = useParams()

  const [userInfo, setUserInfo] = useState<any>()
  const [userRepo, setUserRepo] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchUserInfo = () => {
    firebase
      .firestore()
      .collection('user')
      .doc(userId.ref)
      .collection('Setting')
      .doc('Profile')
      .get()
      .then(docs => {
        setUserInfo(docs.data())
      })

    firebase
      .firestore()
      .collection('user')
      .doc(userId.ref)
      .collection('Project')
      .get()
      .then(projectDocs => {
        projectDocs.forEach(docs => {
          if (docs.data().projectData.Privacy === 'Public') {
            setUserRepo((prevRepo: any) => [...prevRepo, docs.data()])
          }
        })
        setIsLoading(false)
      })
  }

  useEffect(fetchUserInfo, [])

  console.log(userRepo)
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="user-profile-container">
          <div className="user-profile-info-container">
            <img src={userInfo.avatar} alt="" width="100px" height="100px" />
            <p>Alex Wang</p>
            <p>Bio: Just a test account for yang</p>
            <p>Email: alexwang05@bcit.ca</p>
            <p>Github: yang052513</p>
            <p>Location: Vancouver</p>
            <p>Website: yang0525.app.com</p>
            <p>Linkedin: 3dcsd@dc.com</p>
          </div>
          <div className="user-profile-repo-wrap">
            <h3>Alex Wang's Projects</h3>
            <div className="user-profile-repo-category-container">
              <h4>Completed Projects</h4>
              <p>Some projects using grid here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
