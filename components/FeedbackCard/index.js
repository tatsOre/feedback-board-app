import FeedbackCardDetails from './feedback-details'

export default function FeedbackCard({ feedback }) {
  return (
    <div className="feedback-detail group bg-white text-[13px] rounded-10 cursor-pointer p-6 md:px-8">
      <FeedbackCardDetails feedback={feedback} />
    </div>
  )
}
