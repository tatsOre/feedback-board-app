import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { getFeedbackByField } from '../services/firebase-client'

export const FeedbackContext = createContext()

export default function FeedbackProvider({ children }) {
  const [data, setData] = useState(null)
  const [loadingData, setLoadingData] = useState(true)
  const router = useRouter()

  const getFeedbackObject = async () => {
    try {
      const doc = await getFeedbackByField('slug', router.query.slug)
      setData(doc)
    } catch (error) {
      setData(null)
    } finally {
      setLoadingData(false)
    }
  }

  useEffect(() => {
    getFeedbackObject()
  }, [])

  return (
    <FeedbackContext.Provider value={{ data, setData, loadingData }}>
      {children}
    </FeedbackContext.Provider>
  )
}

export const useFeedbackData = () => useContext(FeedbackContext)
