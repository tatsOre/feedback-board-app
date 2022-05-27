import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found | Feedback Board App'
  }, [])

  return (
    <main className="w-10/12 md:w-8/12 h-[85vh] mx-auto pt-10">
      <div className="relative w-40 h-40 my-6">
        <Image
          src="/assets/suggestions/illustration-empty.svg"
          layout="fill"
          objectFit="cover"
          alt=""
        />
      </div>
      <p className="text-lg md:text-3xl font-semibold text-blue-500 opacity-70 leading-snug mb-6">
        The link you clicked may
        <br />
        be broken or the page
        <br />
        may have been removed.
      </p>
      <p className="text-sm md:text-lg text-indigo-900">
        Visit the{' '}
        <Link href="/" passHref>
          <a className="font-semibold text-indigo-800">homepage</a>
        </Link>{' '}
        or...{' '}
        <Link href="/feedback/new" passHref>
          <a className="font-semibold text-violet-900">leave a feedback!</a>
        </Link>
      </p>
    </main>
  )
}
