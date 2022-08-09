import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { AxiosAPIService } from '../../../lib/services/axios'
import FeedbackPost from '../../../components/FeedbackDetail'
import Loader from '../../../components/Shared/loader'

export default function Page() {
  const router = useRouter()
  const { slug } = router.query

  const { data, error } = useSWR(
    slug ? `/feedbacks/slug?q=${slug}` : null,
    AxiosAPIService.get
  )
  if (!data) return <Loader />
  if (error) return <p>Failed to load</p>

  return (
    <>
      <Head>
        <title>Feedback Board - {data?.title}</title>
      </Head>
      <FeedbackPost data={data} />
    </>
  )
}
