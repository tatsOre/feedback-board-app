import { useEffect, useState } from 'react'
import { createFirebaseApp } from '../../../firebase/clientApp'
import {
  getFirestore,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  increment,
} from 'firebase/firestore'

import { useUser } from '../../../context/UserProvider'
import { ArrowUp } from '../../Arrows'

export default function Upvote({ upvotes, fdid }) {
  const [{ votes, isLoading, isUpvoted, error }, setState] = useState({
    votes: upvotes,
    isLoading: false,
    isUpvoted: false,
    error: '',
  })

  const { loadingUser, user, setUser } = useUser()

  useEffect(() => {
    if (!loadingUser && user) {
      setState((state) => ({
        ...state,
        isUpvoted: user.upvoted.includes(fdid),
      }))
    }
  }, [user, loadingUser])

  const onClick = async (event) => {
    event.preventDefault()
    setState((state) => ({ ...state, isLoading: true }))

    try {
      const app = createFirebaseApp()
      const db = getFirestore(app)
      // make updateUpvotes => promise.All(feedback, user)
      const userRef = doc(db, 'users', user?.id)
      await updateDoc(userRef, {
        upvoted: isUpvoted ? arrayRemove(fdid) : arrayUnion(fdid),
        updated: new Date().toISOString(),
      })

      const fdRef = doc(db, 'feedbacks', fdid)
      await updateDoc(fdRef, {
        upvotes: isUpvoted ? increment(-1) : increment(1),
        updated: new Date().toISOString(),
      })

      const upvotedFeedbacks = isUpvoted
        ? user.upvoted.filter((f) => f !== fdid)
        : [...user.upvoted, fdid]

      setUser((state) => ({ ...state, upvoted: upvotedFeedbacks }))

      setState((state) => ({
        ...state,
        votes: isUpvoted ? votes - 1 : votes + 1,
        isUpvoted: !state.isUpvoted,
      }))
    } catch (error) {
      setState((state) => ({ ...state, error: error.message }))
    } finally {
      setState((state) => ({ ...state, isLoading: false }))
    }
  }

  return (
    <>
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
      {error && (
        <strong className="ml-2 text-xs text-red-900 font-normal">
          Error: Please try again
        </strong>
      )}
    </>
  )
}
