import { useEffect, useState } from 'react'

import useUser from './useUser'

const useFeedbackUpvote = (upvotes = 0, fdid = '') => {
  const [{ votes, isLoading, isUpvoted }, setState] = useState({
    votes: upvotes,
    isLoading: false,
    isUpvoted: false,
  })

  //const { loadingUser, user, setUser } = useUser()

  const loadingUser = false
/*   const user = {
    id: '62a8912aec3546861ad8b8ed',
    image: 'user-images/image-zena.jpg',
    name: 'Zena Kelley',
    username: 'velvetround',
    upvotes: [],
    comments: [],
    requests: [],
  }

  useEffect(() => {
    if (!loadingUser && user) {
      setState((state) => ({
        ...state,
        isUpvoted: user.upvotes?.includes(fdid),
      }))
    }
  }, [user, loadingUser]) */

  const onClick = async (event) => {
    event.preventDefault()
    setState((state) => ({ ...state, isLoading: true }))

    try {
      /*       const [updatedUser, updatedFeedback] = await updateUpvotes(
        user.id,
        fdid,
        isUpvoted
      ) */
      /*       setUser(updatedUser)
      setState((state) => ({
        ...state,
        votes: updatedFeedback.upvotes,
        isUpvoted: updatedUser.upvoted.includes(fdid),
      })) */
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
