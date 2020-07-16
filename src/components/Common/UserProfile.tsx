import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import firebase from 'firebase'
import { Loading } from './Loading'
import { render } from '@testing-library/react'

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

  const renderProject = userRepo.map((repo: any) => (
    <div className="user-profile-repo-card" key={repo.Key}>
      <p>{repo.projectData.Name}</p>
      <p>{repo.projectData.Status}</p>
      <p>{repo.projectData.Desc}</p>
    </div>
  ))

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="user-profile-container">
          <div className="user-profile-info-container">
            <img src={userInfo.avatar} alt="" width="100px" height="100px" />
            <h3>Alex Wang</h3>
            <p>
              <i className="fas fa-book"></i>Just a test account for yang
            </p>
            <p>
              <i className="fas fa-envelope"></i>alexwang05@bcit.ca
            </p>
            <p>
              <i className="fab fa-github"></i>yang052513
            </p>
            <p>
              <i className="fas fa-map-marker-alt"></i>Vancouver
            </p>
            <p>
              <i className="fas fa-home"></i>yang0525.app.com
            </p>
            <p>
              <i className="fab fa-linkedin-in"></i>3dcsd@dc.com
            </p>
          </div>
          <div className="user-profile-repo-wrap">
            <h3>Alex Wang's Projects</h3>
            <div className="user-profile-repo-category-container">
              <h4>All Projects</h4>
              <div className="user-profile-repo-list">{renderProject}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
