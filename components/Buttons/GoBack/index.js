import Link from 'next/link'
import { ArrowLeft } from '../../Arrows'

export default function GoBackButton({ light }) {
  return (
    <Link href="/" passHref>
      <a className={`text-sm hover:underline font-bold ${!light ? 'text-indigo-500' : ''}`}
      >
        <ArrowLeft
          className="mb-1 mr-3"
          color={light ? '#FFFFFF' : '#4661E6'}
        />
        Go Back
      </a>
    </Link>
  )
}
