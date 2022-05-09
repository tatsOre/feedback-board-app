import Feedback from '../../../components/Feedback'
import { getFeedbackByField } from '../../../services/firebase'

export async function getServerSideProps({ params }) {
  try {
    const data = await getFeedbackByField("slug", params.slug)
    return {
      props: { data },
    }
  } catch (error) {
    console.log(`Error in feedback/[${params.slug}] page:`, error)
    return { notFound: true }
  }
}

export default function Page(props) {
  return <Feedback {...props} />
}


