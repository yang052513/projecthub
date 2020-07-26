import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import firebase from 'firebase'
import { Loading } from './Loading'

export const UserProfile = () => {
  const userId: any = useParams()

  const [userInfo, setUserInfo] = useState<any>()
  const [userRepo, setUserRepo] = useState<any>([])
  const [statusList, setStatusList] = useState<Array<string>>([])
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
          if (docs.data().Privacy === 'Public') {
            setUserRepo((prevRepo: any) => [...prevRepo, docs.data()])
            setStatusList(prevStatus => [...prevStatus, docs.data().Status])
          }
        })
        setIsLoading(false)
      })
  }

  useEffect(fetchUserInfo, [])

  const renderStatus = statusList
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((repo: any) => (
      <div key={Math.random() * 16} className="user-profile-status-wrap">
        <h4>{repo}</h4>
        <div className="user-profile-repo-list">
          {userRepo
            .filter((item: any) => {
              return item.Status === repo
            })
            .map((project: any) => (
              <div className="user-profile-repo-card" key={project.Key}>
                <div>
                  <p className="user-profile-repo-card-name">{project.Name}</p>
                  <p className="user-profile-repo-card-status">
                    {project.Status}
                  </p>
                </div>
                <p className="user-profile-repo-card-desc">
                  {project.Description}
                </p>
              </div>
            ))}
        </div>
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
            <h3>{userInfo.profile.profileName}</h3>

            <div className="user-profile-icon-wrap">
              <i className="fas fa-book"></i>
              <p>{userInfo.profile.profileBio}</p>
            </div>

            <div className="user-profile-icon-wrap">
              <i className="fas fa-envelope"></i>
              <p>{userInfo.profile.profileEmail}</p>
            </div>

            <div className="user-profile-icon-wrap">
              <i className="fab fa-github"></i>
              <p> {userInfo.profile.profileGithub}</p>
            </div>

            <div className="user-profile-icon-wrap">
              <i className="fas fa-map-marker-alt"></i>
              <p> {userInfo.profile.profileLocation}</p>
            </div>

            <div className="user-profile-icon-wrap">
              <i className="fab fa-linkedin-in"></i>
              <p> {userInfo.profile.profileWeb}</p>
            </div>

            <div className="user-profile-icon-wrap">
              <i className="fas fa-home"></i>
              <p> {userInfo.profile.profileLinkedin}</p>
            </div>
          </div>
          <div className="user-profile-repo-wrap">
            <h3>{userInfo.profile.profileName}'s Projects</h3>
            <div className="user-profile-repo-category-container">
              {renderStatus}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
