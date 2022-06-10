import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'
import { getFeedbackByField } from '../services/firebase-client'

export const FeedbackContext = createContext()

export default function FeedbackProvider({ children }) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const getFeedbackObject = async () => {
    try {
      const doc = await getFeedbackByField('slug', router.query.slug)
      setData(doc)
    } catch (error) {
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getFeedbackObject()
  }, [])

  return (
    <FeedbackContext.Provider value={{ data, setData, isLoading }}>
      {children}
    </FeedbackContext.Provider>
  )
}
