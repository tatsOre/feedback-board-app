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

const UpvoteButton = ({ upvotes, upvoted }) => {
  const [{ votes, loading, error, active }, setState] = useState({
    votes: upvotes,
    active: upvoted,
    loading: false,
  })

  const onClick = (event) => {
    event.preventDefault()
    setState({ votes, loading: true })
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
        } rounded-10 text-small min-w-[70px] py-3 px-4 leading-3 flex justify-between relative z-10`}
      >
        {loading ? (
          <i>⏱</i>
        ) : (
          <>
            <ArrowUp color={active ? '#FFFFFF' : '#4661E6'} />
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
