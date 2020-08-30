import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import * as firebase from 'firebase/app'
import 'firebase/firestore'

import { Loading } from './Loading'
import { useFetchProfile } from '../../hooks/useFetchProfile'

/**
 * 用户个人主页面 之后要改 加入朋友圈 以及动态之类
 */
export const UserProfile = () => {
  const userId: any = useParams()

  const userProfile = useFetchProfile(userId.ref)

  const [userRepo, setUserRepo] = useState<any>([])
  const [statusList, setStatusList] = useState<Array<string>>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUserRepo = async () => {
      const projectDocs = await firebase
        .firestore()
        .collection('user')
        .doc(userId.ref)
        .collection('Project')
        .get()
      projectDocs.forEach(docs => {
        if (docs.data().Privacy === 'Public') {
          setUserRepo((prevRepo: any) => [...prevRepo, docs.data()])
          setStatusList(prevStatus => [...prevStatus, docs.data().Status])
        }
      })
      setIsLoading(false)
    }
    fetchUserRepo()
  }, [])

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

                <div className="user-profile-repo-card-tools">
                  <ul>
                    {project.Tools.map((tool: any) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </div>
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
            <img src={userProfile.avatar} alt="" width="100px" height="100px" />
            <h3>{userProfile.profile.profileName}</h3>

            {userProfile.profile.profileBio !== '' && (
              <div className="user-profile-icon-wrap">
                <i className="fas fa-book"></i>
                <p>{userProfile.profile.profileBio}</p>
              </div>
            )}

            {userProfile.profile.profileEmail !== '' && (
              <div className="user-profile-icon-wrap">
                <i className="fas fa-envelope"></i>
                <p>{userProfile.profile.profileEmail}</p>
              </div>
            )}

            {userProfile.profile.profileGithub !== '' && (
              <div className="user-profile-icon-wrap">
                <i className="fab fa-github"></i>
                <p> {userProfile.profile.profileGithub}</p>
              </div>
            )}

            {userProfile.profile.profileLocation !== '' && (
              <div className="user-profile-icon-wrap">
                <i className="fas fa-map-marker-alt"></i>
                <p> {userProfile.profile.profileLocation}</p>
              </div>
            )}

            {userProfile.profile.profilelinkedin !== '' && (
              <div className="user-profile-icon-wrap">
                <i className="fab fa-linkedin-in"></i>
                <p> {userProfile.profile.profilelinkedin}</p>
              </div>
            )}

            {userProfile.profile.profileWeb !== '' && (
              <div className="user-profile-icon-wrap">
                <i className="fas fa-home"></i>
                <p> {userProfile.profile.profileWeb}</p>
              </div>
            )}
          </div>
          <div className="user-profile-repo-wrap">
            <h3>{userProfile.profile.profileName}'s Projects</h3>
            <div className="user-profile-repo-category-container">
              {renderStatus}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
