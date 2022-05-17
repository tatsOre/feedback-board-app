import Footer from '../components/Shared/footer'
import UserProvider from '../context/userContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
      <Footer  />
    </UserProvider>
  )
}

export default MyApp
