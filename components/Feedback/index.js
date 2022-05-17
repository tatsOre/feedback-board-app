import { arrayUnion, doc, getFirestore, updateDoc } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useFeedbackData } from '../../context/feedbackContext'
import { useUser } from '../../context/userContext'
import { createFirebaseApp } from '../../firebase/clientApp'
import { getFeedbackByField } from '../../services/firebase-client'
import { getCommentsLength } from '../../utils'
import Button from '../Buttons/Default'
import GoBackButton from '../Buttons/GoBack'
import FeedbackCard from '../FeedbackCard'
import NavLink from '../NavLink'
import Loader from '../Shared/loader'

const Comment = ({ comment, fdid, cmid }) => {
  const [showForm, setShowForm] = useState(false)
  const [content, setContent] = useState('')
  const { data, setData } = useFeedbackData()
  const { user } = useUser()

  const onSubmit = async (event) => {
    event.preventDefault()
    const reply = {
      content,
      replyingTo: comment.user.username,
      user: {
        image: user.image,
        name: user.name,
        username: user.username,
      },
    }
    try {
      const app = createFirebaseApp()
      const db = getFirestore(app)

      const fdRef = doc(db, 'feedbacks', data.id)

      const updatedComments = data.comments.map((c) => {
        if (c.id === cmid) {
          return { ...c, replies: c.replies ? [...c.replies, reply] : [reply] }
        }
        return c
      })

      await updateDoc(fdRef, {
        updated: new Date().toISOString(),
        comments: updatedComments,
      })

      setData((prevState) => ({
        ...prevState,
        comments: updatedComments,
      }))
    } catch (error) {
    } finally {
      setShowForm(false)
    }
  }

  return (
    <article
      className={`${
        comment.replyingTo
          ? 'feedback-reply pt-6 pl-6 md:pl-11 lg:pl-12'
          : 'feedback-comment py-6'
      } text-[13px] grid grid-cols-[auto_minmax(100px,_1fr)_100px]`}
    >
      <div className="relative w-10 h-10 mr-4 md:mr-8 rounded-full overflow-hidden">
        <Image
          src={`/${comment.user?.image}`}
          layout="fill"
          objectFit="cover"
          alt={`${comment.user?.name} profile pic`}
        />
      </div>
      <h3 className="text-indigo-800 md:text-sm leading-5">
        {comment.user?.name}
        <small className="text-indigo-500 md:text-sm font-normal block">
          @{comment.user?.username}
        </small>
      </h3>
      <button
        type="button"
        onClick={() => setShowForm(!showForm)}
        className="font-bold text-blue-900 text-[13px] hover:underline ml-auto"
      >
        Reply
      </button>

      <p className="col-span-3 md:col-start-2 md:col-span-2 text-indigo-500 md:text-[15px] mt-4">
        {comment.replyingTo ? (
          <small className="font-bold text-violet-900">
            @{comment.replyingTo}
          </small>
        ) : null}{' '}
        {comment.content}
      </p>

      {showForm && (
        <form
          onSubmit={onSubmit}
          className="col-span-3 md:col-start-2 md:col-span-2 md:flex md:space-x-4 mt-6 md:mb-2"
        >
          <textarea
            name="new-comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            aria-label="Add a new comment"
            className="w-full mb-3 md:mb-0 p-2 md:p-4 bg-indigo-100 text-indigo-800 md:text-sm rounded-5 border border-indigo-100 hover:border-blue-900 cursor-pointer"
          />
          <Button type="submit" label="Post Reply" variant="primary" />
        </form>
      )}

      <section className="col-span-3">
        {comment.replies?.length &&
          comment.replies.map((reply, index) => (
            <Comment
              key={`comment-${comment.id}-reply-${index}`}
              comment={reply}
              fdid={fdid}
              cmid={comment.id}
            />
          ))}
      </section>
    </article>
  )
}

export default function Feedback() {
  const { data, setData, loadingData } = useFeedbackData()
  const { user } = useUser()
  const [{ newCmt, newCmtError }, setNewComment] = useState({
    newCmt: '',
    newCmtError: null,
  })

  useEffect(() => {
    if (data) document.title = `Feedback Board - ${data.title}`
  }, [data, loadingData])

  if (loadingData && !data) return <Loader />
  if (!loadingData && !data) return <p>Something went wrong</p>

  const charsLeft = 225 - newCmt.length
  const commentsLength = getCommentsLength(data.comments)

  const onSubmit = async (event) => {
    event.preventDefault()

    if (!newCmt) {
      setNewComment((prevState) => ({
        ...prevState,
        newCmtError: "Can't be empty",
      }))
    }

    try {
      const app = createFirebaseApp()
      const db = getFirestore(app)
      const fdRef = doc(db, 'feedbacks', data.id)
      const comment = {
        id: data.comments.length + 1,
        content: newCmt,
        user: {
          image: user.image,
          name: user.name,
          username: user.username,
        },
      }
      await updateDoc(fdRef, {
        updated: new Date().toISOString(),
        comments: arrayUnion(comment),
      })
      setData((prevState) => ({
        ...prevState,
        comments: [...data.comments, comment],
      }))
    } catch (error) {
      setNewComment((prevState) => ({
        ...prevState,
        newCmtError: error.message,
      }))
    }
  }

  return (
    <main className="p-6 md:p-10 max-w-[calc(730px+5rem)] mx-auto">
      <nav className="flex justify-between mb-6">
        <GoBackButton />
        {user?.username === data.author && (
          <Link
            href={{ pathname: '/feedback/edit/[id]', query: { id: data.id } }}
            as={`/edit/${data.slug}`}
            passHref
          >
            <NavLink label="Edit Feedback" variant="secondary" />
          </Link>
        )}
      </nav>

      <FeedbackCard feedback={data} />

      {commentsLength ? (
        <section className="feedback-comments-section bg-white rounded-10 p-6 pb-0 md:px-8 mt-6">
          <h2 className="text-indigo-800 text-lg">
            {commentsLength} Comment{commentsLength > 1 ? 's' : ''}
          </h2>

          {data?.comments.map((c, index) => (
            <Comment
              comment={c}
              fdid={data.id}
              cmid={c.id}
              key={`feedback-${data.id}-comment-${index}`}
            />
          ))}
        </section>
      ) : null}

      {user?.username !== data.author && (
        <form
          onSubmit={onSubmit}
          className="bg-white rounded-10 p-6 md:px-8 mt-6 flex flex-wrap justify-between items-center"
        >
          <h2 className="w-full text-indigo-800 text-lg mb-6">Add Comment</h2>
          <textarea
            name="new-comment"
            value={newCmt}
            onChange={(e) =>
              setNewComment({
                newCmt: e.target.value,
                newCmtError: false,
              })
            }
            aria-label={`Add a new comment for ${data.title}`}
            className="w-full text-[13px] md:text-[15px] bg-indigo-100 rounded-5 p-4 mb-4 text-indigo-800 border border-indigo-100 hover:border-blue-900 cursor-pointer"
            placeholder="Type your comment here"
            rows="3"
            maxLength="225"
          />
          {newCmtError && (
            <span className="w-full text-[13px] text-red-900 -mt-2">
              {newCmtError}
            </span>
          )}
          <p className="text-indigo-500 text-[13px]">
            {charsLeft} character{charsLeft > 1 || !charsLeft ? 's' : ''} left
          </p>
          <Button type="submit" label="Post Comment" variant="primary" />
        </form>
      )}
    </main>
  )
}
