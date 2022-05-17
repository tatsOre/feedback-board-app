import { createContext, useContext, useEffect, useState } from 'react'
import { createFirebaseApp } from '../firebase/clientApp'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'

export const FeedbackContext = createContext()

export default function CreateFeedbackContext({ children, slug }) {
  const [data, setData] = useState()
  const [loadingData, setLoadingData] = useState(true)

  const getFeedbackByField = async (field, value) => {
    const app = createFirebaseApp()
    const db = getFirestore(app)

    const q = query(collection(db, 'feedbacks'), where(field, '==', value))
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      setData(null)
    } else {
      const docs = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setData(docs[0])
    }
    setLoadingData(false)
  }

  useEffect(() => {
    getFeedbackByField('slug', slug)
  }, [slug])
  
  return (
    <FeedbackContext.Provider value={{ data, setData, loadingData }}>
      {children}
    </FeedbackContext.Provider>
  )
}

export const useFeedbackData = () => useContext(FeedbackContext)
