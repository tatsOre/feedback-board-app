import Head from 'next/head'
import Feedback from '../../../components/Feedback'
import Footer from '../../../components/Shared/footer'

export default function Page(props) {
  return (
    <>
      <Head>
        <title>{`Feedback Board App -  `}</title>
      </Head>
      <Feedback slug={props.slug} />
      <Footer />
    </>
  )
}

Page.getInitialProps = async (context) => {
  return context.query
}
