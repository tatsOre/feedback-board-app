import Head from 'next/head'
import Feedback from '../../../components/Feedback'
import Footer from '../../../components/Shared/footer'
import { getFeedbackByField } from '../../../services/firebase'

export async function getServerSideProps({ params }) {
  try {
    const data = await getFeedbackByField("slug", params.slug)
    console.log('Slug Page', data)
    return {
      props: { data },
    }
  } catch (error) {
    console.log(`Error in feedback/[${params.slug}] page:`, error)
    return { notFound: true }
  }
}

export default function Page(props) {
  return (
    <>
    <Head>
      <title>{`Feedback Board App - ${props.data.title}`}</title>
    </Head>
    <Feedback {...props} />
    <Footer />
    </>
  )
}


