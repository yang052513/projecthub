import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import firebase from 'firebase'
import { Loading } from './Loading'

export const UserProfile = () => {
  const userId: any = useParams()

  const [userInfo, setUserInfo] = useState<any>()
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
        setIsLoading(false)
      })
  }

  useEffect(fetchUserInfo, [])

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="user-profile-container">
          <img src={userInfo.avatar} alt="" width="100px" height="100px" />
          <p>{userInfo.profile.profileName}</p>
          <p>{userInfo.profile.profileBio}</p>
          <p>{userInfo.profile.profileBio}</p>
        </div>
      )}
    </div>
  )
}
