import { ArrowUp } from '../../Arrows'

import { useState, useEffect } from 'react'
import useUser from 'lib/hooks/useUser'
import { AxiosAPIService } from 'lib/services/axios'

//import useFeedbackUpvote from '../../../lib/hooks/useFeedbackUpvote'

export default function UpvoteButton({ upvotes, fdid }) {
  const [{ votes, isLoading, isUpvoted }, setState] = useState({
    votes: upvotes,
    isLoading: false,
    isUpvoted: false,
  })

  const { loadingUser, user, setUser } = useUser()

  useEffect(() => {
    if (!loadingUser && user) {
      setState((state) => ({
        ...state,
        isUpvoted: user.upvoted?.includes(fdid),
      }))
    }
  }, [user, loadingUser])

  const onClick = async (event) => {
    event.preventDefault()
    setState((state) => ({ ...state, isLoading: true }))

    try {
      const url = `/users/${user._id}/upvote`

      const updatedDoc = await AxiosAPIService.post(url, {
        fdid,
      })

      setState((state) => ({
        ...state,
        votes: updatedDoc.upvotes,
        isUpvoted: user.upvoted.includes(fdid),
      }))

      /*       setUser(updatedUser)
       */
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
