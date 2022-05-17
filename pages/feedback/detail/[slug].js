import Head from 'next/head'
import Feedback from '../../../components/Feedback'
import Footer from '../../../components/Shared/footer'
import FeedbackProvider from '../../../context/feedbackContext'

export default function Page(props) {
  return (
    <FeedbackProvider slug={props.slug}>
      <Head>
        <title>{`Feedback Board App -  `}</title>
      </Head>
      <Feedback slug={props.slug} />
      <Footer />
    </FeedbackProvider>
  )
}

Page.getInitialProps = async (context) => {
  return context.query
}
