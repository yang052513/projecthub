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
        if (profileDoc.exists) {
          setProfile(profileDoc.data())
        } else {
          setProfile({
            avatar: '/images/user.jpg',
            profile: {
              profileName: '',
              profileBio: '',
              profileEmail: '',
              profileGithub: '',
              profileLocation: '',
              profileWeb: '',
              profilelinkedin: '',
            },
          })
        }
      })
  }

  useEffect(fetchProfile, [])

  return profile
}
