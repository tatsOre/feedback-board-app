import { useState, useEffect } from 'react'
import { ArrowUp } from '../../Arrows'
import { AxiosAPIService } from 'lib/services/axios'
import useUser from 'lib/hooks/useUser'

// todo: check cache/time to update

export default function UpvoteButton({ upvotes, fdid }) {
  const [{ votes, isLoading, isUpvoted }, setState] = useState({
    votes: upvotes,
    isLoading: false,
    isUpvoted: false,
  })

  const { user, isUserLoading, mutate } = useUser()

  useEffect(() => {
    if (!isUserLoading && user) {
      setState((state) => ({
        ...state,
        isUpvoted: user.upvoted?.includes(fdid),
      }))
    }
  }, [user, isUserLoading])

  const onClick = async (event) => {
    event.preventDefault()
    setState((state) => ({ ...state, isLoading: true }))

    try {
      const url = `/users/${user._id}/${isUpvoted ? 'unupvote' : 'upvote'}`

      await AxiosAPIService.post(url, {
        fdid,
      })

      setState((state) => ({
        ...state,
        votes: isUpvoted ? votes - 1 : votes + 1,
        isUpvoted: !isUpvoted,
      }))
    } catch (error) {
      console.log(error)
    } finally {
      setState((state) => ({ ...state, isLoading: false }))
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      aria-label="upvote"
      className={`${
        isUpvoted
          ? 'bg-blue-900 text-white'
          : `bg-indigo-300 text-indigo-800 ${
              !isLoading && 'hover:bg-indigo-400'
            }`
      } rounded-10 text-[13px] min-w-[70px] py-3 px-4 leading-3 flex-inline justify-evenly relative z-10`}
    >
      <ArrowUp color={isUpvoted ? '#FFFFFF' : '#4661E6'} />
      {isLoading ? '...' : votes}
    </button>
  )
}
