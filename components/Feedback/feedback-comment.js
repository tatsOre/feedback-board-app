import Image from 'next/image'
import { useState } from 'react'
import { useFeedbackData } from '../../context/feedbackContext'
import { useUser } from '../../context/userContext'
import { updateFeedbackReplies } from '../../services/firebase-client'
import Button from '../Buttons/Default'

const Comment = ({ comment, cmid }) => {
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
      const updatedComments = await updateFeedbackReplies(data, reply, cmid)
      setData((prevState) => ({
        ...prevState,
        comments: updatedComments,
      }))
      setContent('')
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
              cmid={comment.id}
            />
          ))}
      </section>
    </article>
  )
}

export default Comment
