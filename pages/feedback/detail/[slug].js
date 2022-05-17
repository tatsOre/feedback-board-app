import Feedback from '../../../components/Feedback'
import FeedbackProvider from '../../../context/feedbackContext'

export default function Page(props) {
  return (
    <FeedbackProvider slug={props.slug}>
      <Feedback slug={props.slug} />
    </FeedbackProvider>
  )
}

Page.getInitialProps = async (context) => {
  return context.query
}
