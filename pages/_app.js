import Head from 'next/head'
import Footer from '../components/Shared/footer'
import UserProvider from '../context/UserProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
      <Footer />
    </>
  )
}

export default MyApp
