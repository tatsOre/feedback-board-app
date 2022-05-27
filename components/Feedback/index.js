import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useFeedbackData } from '../../context/feedbackContext'
import { useUser } from '../../context/userContext'
import { updateFeedbackComments } from '../../services/firebase-client'
import { getCommentsLength } from '../../utils'
import Button from '../Buttons/Default'
import Comment from './feedback-comment'
import GoBackButton from '../Buttons/GoBack'
import FeedbackCard from '../FeedbackCard'
import NavLink from '../NavLink'
import Loader from '../Shared/loader'

export default function Feedback() {
  const { data, setData, loadingData } = useFeedbackData()
  const { user } = useUser()
  const [{ content, contentError }, setNewContent] = useState({
    content: '',
    contentError: null,
  })

  useEffect(() => {
    if (data) document.title = `Feedback Board ${'- ' + data.title}`
  }, [data, loadingData])

  if (loadingData && !data) return <Loader />
  if (!loadingData && !data) return <p>Something went wrong</p>

  const charsLeft = 250 - content.length
  const commentsLength = getCommentsLength(data.comments)

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!content) {
      setNewContent((prevState) => ({
        ...prevState,
        contentError: "Can't be empty",
      }))
    }

    try {
      const comment = await updateFeedbackComments(data, content, user)
      setData((prevState) => ({
        ...prevState,
        comments: [...data.comments, comment],
      }))
      setNewContent((prevState) => ({
        ...prevState,
        content: '',
      }))
    } catch (error) {
      setNewContent((prevState) => ({
        ...prevState,
        contentError: error.message,
      }))
    }
  }

  return (
    <main className="p-6 md:p-10 max-w-[calc(730px+5rem)] mx-auto">
      <nav className="flex justify-between mb-6">
        <GoBackButton />
        {user?.userId === data.author && (
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
              cmid={c.id}
              key={`feedback-${data.id}-comment-${index}`}
            />
          ))}
        </section>
      ) : null}

      {user?.userId !== data.author && (
        <form
          onSubmit={onSubmit}
          className="bg-white rounded-10 p-6 md:px-8 mt-6 flex flex-wrap justify-between items-center"
        >
          <h2 className="w-full text-indigo-800 text-lg mb-6">Add Comment</h2>
          <textarea
            name="new-comment"
            value={content}
            onChange={(e) =>
              setNewContent({
                content: e.target.value,
                contentError: false,
              })
            }
            aria-label={`Add a new comment for ${data.title}`}
            className="w-full text-[13px] md:text-[15px] bg-indigo-100 rounded-5 p-4 mb-4 text-indigo-800 border border-indigo-100 hover:border-blue-900 cursor-pointer"
            placeholder="Type your comment here"
            rows="3"
            maxLength="250"
          />
          {contentError && (
            <span className="w-full text-[13px] text-red-900 -mt-2">
              {contentError}
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
