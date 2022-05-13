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
  const { user, loadingUser } = useUser()

  const [{ votes, loading, error, upvoted }, setState] = useState({
    votes: upvotes,
    upvoted: false,
    loading: false,
  })

  useEffect(() => {
    console.log('Use Effect Upvote')
    setState((prevState) => ({
      ...prevState,
      upvoted: user?.upvotes.includes(fdid),
    }))
  }, [loadingUser, user, fdid])

  const onClick = async (event) => {
    event.preventDefault()
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }))
    console.log('upvoted', upvoted)



    try {
      const app = createFirebaseApp()
      const db = getFirestore(app)
  
      const userRef = doc(db, 'users', user?.id)
      const fdRef = doc(db, 'feedbacks', fdid)
      
      await updateDoc(userRef, {
        upvotes: upvoted ? arrayRemove(fdid) : arrayUnion(fdid),
      })
      await updateDoc(fdRef, {
        upvotes: upvoted ? increment(-1) : increment(1),
      })
      setState((prevState) => ({
        ...prevState,
        votes: upvoted ? votes - 1 : votes + 1,
        upvoted: !upvoted,
      }))
    } catch (error) {
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
          upvoted
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
            <ArrowUp color={upvoted ? '#FFFFFF' : '#4661E6'} />
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
