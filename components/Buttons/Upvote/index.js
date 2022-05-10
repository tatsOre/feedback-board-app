import { useState } from 'react'
import { ArrowUp } from '../../Arrows'

async function getError(res) {
  if (res.headers.get('Content-Type').includes('application/json')) {
    const data = await res.json()
    return data.errors[0]
  }
  return { message: (await res.text()) || res.statusText }
}

// TODO: remove extra spaces and falsy values from classes
// import cn from 'clsx'
// const cn = (arr) => arr.filter(Boolean).join(' ')

const UpvoteButton = ({ upvotes, upvoted, variant }) => {
  const [{ votes, loading, error, active }, setState] = useState({
    votes: upvotes,
    active: upvoted,
    loading: false,
  })

  const onClick = () => {
    setState({ votes, loading: true })
    // update state in the DB and etc
    const newData = votes + 1
    return setState({ votes: newData, loading: false, active: true })
  }

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className={`${
          active
            ? 'bg-blue-900 text-white'
            : `bg-indigo-300 text-indigo-800 ${
                !loading && 'hover:bg-indigo-400'
              }`
        } rounded-10 text-small p-3 leading-3`}
      >
        {loading ? (
          <i>⏱</i>
        ) : (
          <>
            <ArrowUp
              className={
                variant === 'inline'
                  ? 'mr-2.5 mb-1'
                  : 'block mx-auto mb-2.5'
              }
              color={active ? '#FFFFFF' : '#4661E6'}
            />
            {votes}
          </>
        )}
      </button>
      {error && (
        <span className="ml-2 text-xs text-red-900">
          Error: Please try again
        </span>
      )}
    </>
  )
}

export default UpvoteButton
