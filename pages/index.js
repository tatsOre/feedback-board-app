import Head from 'next/head'
import Home from '../components/Home'
import Footer from '../components/Shared/footer'
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
        <title>Feedback Board App - Hello!</title>
      </Head>
      <Home {...props} />
      <Footer />
    </>
  )
}
