import Head from 'next/head'
import Footer from '../../../components/Shared/footer'
import Form from '../../../components/Form'
import { getFeedbackById } from '../../../services/firebase'

export async function getServerSideProps({ params }) {
  try {
    const data = await getFeedbackById(params.id)
    return {
      props: { data },
    }
  } catch (error) {
    console.log(`Error in edit/[${params.id}] page:`, error)
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
      <Footer />
    </>
  )
}
