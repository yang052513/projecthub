import { useState, useEffect } from 'react'
import firebase from 'firebase'

export const useFetchProfile = (uid: string) => {
  const [profile, setProfile] = useState<any>([])

  const fetchProfile = () => {
    firebase
      .firestore()
      .collection('user')
      .doc(uid)
      .collection('Setting')
      .doc('Profile')
      .get()
      .then(profileDoc => {
        setProfile(profileDoc.data())
      })
  }

  useEffect(fetchProfile, [])

  return profile
}
