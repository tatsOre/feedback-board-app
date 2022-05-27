import { ERROR_MESSAGE } from './error-utils'

export default function ErrorAlert({ error }) {
  const message = ERROR_MESSAGE(error)
  return (
    <div>
      <p className="text-red-900 font-semibold">{message}</p>
    </div>
  )
}
