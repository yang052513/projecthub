import { useState, useEffect } from 'react'
import firebase from 'firebase'

export const useFetchContributor = (userRef: string, projectRef: string) => {
  const [contributor, setContributor] = useState<
    Array<object | null | undefined>
  >()

  const fetchContributor = () => {
    firebase
      .firestore()
      .collection('user')
      .doc(userRef)
      .collection('Project')
      .doc(projectRef)
      .get()
      .then((doc: any) => {
        setContributor(doc.data().Contributors)
      })
  }

  useEffect(fetchContributor, [])

  return contributor
}
