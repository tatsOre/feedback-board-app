import Head from 'next/head'
import RoadmapPage from '../components/Roadmap'
import { getAllFeedbacks } from '../services/firebase'

export const getStaticProps = async () => {
  try {
    const data = await getAllFeedbacks()
    return {
      props: { data },
      revalidate: 10,
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
      <RoadmapPage {...props} />
    </>
  )
}
