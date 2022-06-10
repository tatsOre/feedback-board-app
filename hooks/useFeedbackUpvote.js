import { useEffect, useState } from 'react'

import { updateUpvotes } from '../services/firebase-client'
import useUser from './useUser'

const useFeedbackUpvote = (upvotes, fdid) => {
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
      const [updatedUser, updatedFeedback] = await updateUpvotes(
        user.id,
        fdid,
        isUpvoted
      )
      setUser(updatedUser)
      setState((state) => ({
        ...state,
        votes: updatedFeedback.upvotes,
        isUpvoted: updatedUser.upvoted.includes(fdid),
      }))
    } catch (error) {
    } finally {
      setState((state) => ({ ...state, isLoading: false }))
    }
  }

  return {
    votes,
    isUpvoted,
    isLoading,
    onClick,
  }
}

export default useFeedbackUpvote
