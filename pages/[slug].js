import Feedback from '../components/Feedback'
import { getFeedbackByField } from '../services/firebase'

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

export async function getStaticProps({ params }) {
  try {
    const data = await getFeedbackByField("slug", params.slug)
    return {
      props: { data },
      revalidate: 60,
    }
  } catch (error) {
    console.log(`Error in feedback/[${params.slug}] page:`, error)
    return { notFound: true }
  }
}
/* Bug with getStaticProps when the doc does not exist  */

export default function Page(props) {
  return <Feedback {...props} />
}
