import { useState, useEffect } from 'react'
import firebase from 'firebase'

export const useFetch = (collection: string) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [docs, setDocs] = useState<any>([])

  useEffect(() => {
    const fetchCollection = async () => {
      const querySnapshot = await firebase
        .firestore()
        .collection(collection)
        .get()
      querySnapshot.forEach(doc => {
        setDocs((prevData: any) => [...prevData, doc.data()])
        setLoading(false)
      })
    }
    fetchCollection()
  }, [])
  return { docs, loading }
}
