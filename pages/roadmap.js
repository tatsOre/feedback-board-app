import Head from 'next/head'
import Roadmap from '../components/Roadmap'
import { getAllFeedbacks } from '../services/firebase'

export const getServerSideProps = async () => {
  try {
    const data = await getAllFeedbacks()
    return {
      props: { data },
    }
  } catch (error) {
    console.log(error)
    return { notFound: true }
  }
}

export default function Page(props) {
  return (
    <>
      <Head>
        <title>Feedback Board App - Roadmap</title>
      </Head>
      <Roadmap {...props} />
    </>
  )
}
