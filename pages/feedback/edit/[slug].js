import Head from 'next/head'
import Form from '../../../components/Form'
import { getFeedbackByField} from '../../../services/firebase'

export async function getServerSideProps({ params }) {
  try {
    const data = await getFeedbackByField('slug', params.slug)
    return {
      props: { data },
    }
  } catch (error) {
    console.log(`Error in edit/[${params.slug}] page:`, error)
    return { notFound: true }
  }
}

export default function Page(props) {
  return (
    <>
      <Head>
        <title>Edit - {props.data.title}</title>
      </Head>
      <Form {...props} edit />
    </>
  )
}
