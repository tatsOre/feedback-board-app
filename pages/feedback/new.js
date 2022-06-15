import Head from 'next/head'
import Form from '../../components/FeedbackForm'

export default function NewPage() {
  const dataForm = {
    title: '',
    category: 'feature',
    description: '',
  }

  return (
    <>
      <Head>
        <title>Feedback Board App - New</title>
      </Head>
      <Form data={dataForm} edit={false} />
    </>
  )
}
