import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { AxiosAPIService } from 'lib/services/axios'
import Form from '../../../components/FeedbackForm'

export default function Page() {
  const router = useRouter()
  const { slug } = router.query

  const { data, error } = useSWR(
    slug ? `/feedbacks/slug?q=${slug}` : null,
    AxiosAPIService.get
  )
  if (!data) return <p>Loading...</p>
  if (error) return <p>Failed to load</p>

  return (
    <>
      <Head>
        <title>Edit - {data.title}</title>
      </Head>
      <Form data={data} edit={true} />
    </>
  )
}
