import Head from 'next/head'
import Footer from '../../components/Shared/footer'
import Form from '../../components/Form'

export default function Page() {
  return (
    <>
      <Head>
        <title>Feedback Board App - New</title>
      </Head>
      <Form />
      <Footer />
    </>
  )
}
