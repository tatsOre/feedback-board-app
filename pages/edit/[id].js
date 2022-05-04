import Form from '../../components/Form'
import { getFeedbackById } from '../../services/firebase'


export async function getServerSideProps({ query }) {
  try {
    const data = await getFeedbackById(query.id)
    return {
      props: { data }
    }
  } catch (error) {
    console.log(`Error in edit/[${query.id}] page:`, error)
    return { notFound: true }
  }
}

export default function Page(props) {
  console.log(props)
  return <Form {...props} edit={true} />
}
