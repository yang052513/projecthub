import { useState, useEffect } from 'react'
import firebase from 'firebase'

export const useFetchProfile = (uid: string) => {
  const [profile, setProfile] = useState<any>([])
  const user: any = firebase.auth().currentUser

  const initProfile = {
    avatar: '/images/user.jpg',
    profile: {
      profileName: user.displayName,
      profileBio: '',
      profileEmail: user.email,
      profileGithub: '',
      profileLocation: '',
      profileWeb: '',
      profilelinkedin: '',
    },
  }

  const profileRef = firebase
    .firestore()
    .collection('user')
    .doc(uid)
    .collection('Setting')
    .doc('Profile')
  const fetchProfile = () => {
    profileRef.get().then(profileDoc => {
      if (profileDoc.exists) {
        setProfile(profileDoc.data())
      } else {
        profileRef.set(initProfile)
        setProfile(initProfile)
      }
    })
  }

  useEffect(fetchProfile, [])

  return profile
}
