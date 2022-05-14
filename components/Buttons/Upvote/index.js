import { useEffect, useState } from 'react'
import { ArrowUp } from '../../Arrows'
import { createFirebaseApp } from '../../../firebase/clientApp'
import {
  getFirestore,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  increment,
} from 'firebase/firestore'

import { useUser } from '../../../context/userContext'

const UpvoteButton = ({ upvotes, fdid }) => {
  const [{ votes, loading, error, isUpvoted }, setState] = useState({
    votes: upvotes,
    isUpvoted: false,
    loading: false,
  })

  const { loadingUser, user, setUser } = useUser()

  useEffect(() => {
    if (!loadingUser && user) {
      setState((prevState) => ({
        ...prevState,
        isUpvoted: user.upvoted.includes(fdid),
      }))
    }
  }, [user, loadingUser])

  const onClick = async (event) => {
    event.preventDefault()
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }))

    try {
      const app = createFirebaseApp()
      const db = getFirestore(app)

      const userRef = doc(db, 'users', user?.id)
      await updateDoc(userRef, {
        upvoted: isUpvoted ? arrayRemove(fdid) : arrayUnion(fdid),
      })

      const fdRef = doc(db, 'feedbacks', fdid)
      await updateDoc(fdRef, {
        upvotes: isUpvoted ? increment(-1) : increment(1),
      })

      const upvotedFeedbacks = isUpvoted
        ? user.upvoted.filter((f) => f !== fdid)
        : [...user.upvoted, fdid]

      setUser((prevState) => ({ ...prevState, upvoted: upvotedFeedbacks }))

      setState((prevState) => ({
        ...prevState,
        votes: isUpvoted ? votes - 1 : votes + 1,
        isUpvoted: !isUpvoted,
      }))
    } catch (error) {
      console.log(error)
      setState((prevState) => ({
        ...prevState,
        error: error.message,
      }))
    } finally {
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }))
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className={`${
          isUpvoted
            ? 'bg-blue-900 text-white'
            : `bg-indigo-300 text-indigo-800 ${
                !loading && 'hover:bg-indigo-400'
              }`
        } rounded-10 text-small min-w-[70px] py-3 px-4 leading-3 flex-inline justify-evenly relative z-10`}
      >
        {loading ? (
          <i>⏱</i>
        ) : (
          <>
            <ArrowUp color={isUpvoted ? '#FFFFFF' : '#4661E6'} />
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
