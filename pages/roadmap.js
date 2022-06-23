import Head from 'next/head'
import dbConnect from '../lib/db/dbConnect'
import { reduceFeedbacksData } from '../lib/utils'
import Feedback from '../models/Feedback'
import Roadmap from '../components/Roadmap'

export async function getServerSideProps() {
  await dbConnect()
  const docs = await Feedback.find({})
    .sort({ upvotes: 'desc' })
    .select('title description category comments upvotes slug status')

  const response = reduceFeedbacksData(docs)

  return { props: { data: response } }
}

export default function Page({ data }) {
  return (
    <>
      <Head>
        <title>Feedback Board App - Roadmap</title>
      </Head>
      <Roadmap data={data} />
    </>
  )
}
