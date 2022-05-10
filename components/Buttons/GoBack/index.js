import { useRouter } from 'next/router'
import { ArrowLeft } from '../../Arrows'

export default function GoBack({ light }) {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className={`text-sm hover:underline ${!light ? 'text-indigo-500' : ''}`}
    >
      <ArrowLeft className="mb-1 mr-3" color={light ? '#FFFFFF' : '#4661E6'} />
      Go Back
    </button>
  )
}
