import { useState, useEffect } from 'react'
import firebase from 'firebase'

export const useFetchOnline = (uid: string) => {
  const [online, setOnline] = useState<boolean>(false)

  const fetchOnlineStatus = () => {
    firebase
      .firestore()
      .collection('user')
      .doc(uid)
      .get()
      .then((doc: any) => {
        setOnline(doc.data().Online)
      })
  }

  useEffect(fetchOnlineStatus, [])

  return online
}
