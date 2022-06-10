import { useContext } from 'react'

import { FeedbackContext } from '../context/FeedbackProvider'

const useFeedbackData = () => useContext(FeedbackContext)

export default useFeedbackData
