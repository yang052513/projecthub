import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ExploreProject } from './index'

import firebase from 'firebase'
import { useFetchProfile } from '../../hooks/useFetchProfile'
import { CSSTransition } from 'react-transition-group'

interface Props {
  userRef: string
}

export const ExploreCard: React.FC<Props> = ({ userRef }) => {
  const [project, setProject] = useState<any>([])
  const profile = useFetchProfile(userRef)

  const fetchProject = () => {
    firebase
      .firestore()
      .collection('user')
      .doc(userRef)
      .collection('Project')
      .get()
      .then(docs => {
        docs.forEach(doc => {
          setProject((prevProject: any) => [...prevProject, doc.data()])
        })
      })
  }

  useEffect(fetchProject, [])

  return (
    <div>
      <CSSTransition
        in={profile}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <div>
          <div className="explore-card-container">
            <div className="explore-user-container">
              <img src={profile.avatar} alt="" />
              <div className="explore-user-profile-container">
                <h3 className="explore-profile-name">
                  {profile.profile ? profile.profile.profileName : ''}
                </h3>
                <p className="explore-profile-location">
                  {profile.profile ? profile.profile.profileLocation : ''}
                </p>
                <p className="explore-profile-bio">
                  {profile.profile ? profile.profile.profileBio : ''}
                </p>

                <div className="button-container">
                  <Link to={`/friends/${userRef}`}>
                    <button>Read More</button>
                  </Link>

                  <button>Add Friends</button>
                </div>
              </div>
            </div>
            <ExploreProject project={project} />
          </div>
          <div className="section-line"></div>
        </div>
      </CSSTransition>
    </div>
  )
}
