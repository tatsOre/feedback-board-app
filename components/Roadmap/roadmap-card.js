import FeedbackCardDetails from '../FeedbackCard/feedback-details'
import { toCapitalize } from '../../utils'

export default function RoadmapCard({ feedback }) {
  const { status } = feedback
  return (
    <div
      className={`roadmap-feedback-card ${status} rounded-md border-t-6 bg-white p-6 pt-3 mb-4 text-small lg:text-base`}
    >
      <p className={`status text-indigo-500 mb-3`}>{toCapitalize(status)}</p>
      <FeedbackCardDetails feedback={feedback} />
    </div>
  )
}
