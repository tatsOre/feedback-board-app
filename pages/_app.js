import React from 'react'
import Head from 'next/head'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
      <footer className="text-center text-blue-500 text-xs my-6">
        Feedback Board App - Built by{' '}
        <a
          href="https://github.com/tatsOre"
          className="font-semibold cursor-pointer"
        >
          Tatiana Orejuela Zapata
        </a>
        . 2022.
      </footer>
    </>
  )
}

export default MyApp
