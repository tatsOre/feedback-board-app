import Feedback from '../../../components/FeedbackDetail'
import FeedbackProvider from '../../../context/FeedbackProvider'

export default function Page() {
  return (
    <FeedbackProvider>
      <Feedback />
    </FeedbackProvider>
  )
}
