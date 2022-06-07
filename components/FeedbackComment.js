import Image from 'next/image'
import { useState } from 'react'
import { useFeedbackData } from '../context/FeedbackProvider'
import { useUser } from '../context/UserProvider'
import { updateFeedbackReplies } from '../services/firebase-client'
import Button from './Buttons/Default'

export default function Comment({ comment, cmid }) {
  const [reply, setReply] = useState({
    show: false,
    content: '',
    error: '',
  })

  const { data, setData } = useFeedbackData()
  const { user } = useUser()

  const toggleButton = () =>
    setReply((state) => ({ ...state, show: !state.show }))

  const onChange = ({ target }) =>
    setReply((state) => ({ ...state, content: target.value, error: '' }))

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!reply.content)
      return setReply((state) => ({ ...state, error: "Can't be empty!" }))

    const newReply = {
      content: reply.content,
      replyingTo: comment.user.username,
      user: {
        image: user.image,
        name: user.name,
        username: user.username,
      },
    }
    try {
      const updatedComments = await updateFeedbackReplies(data, newReply, cmid)
      setData((data) => ({ ...data, comments: updatedComments }))
      setReply((state) => ({ ...state, content: '' }))
    } catch (error) {
      setReply((state) => ({ ...state, error: error.message }))
    }
  }

  return (
    <article
      className={`${
        comment.replyingTo
          ? 'comment-reply mt-6 pl-6 md:pl-11 lg:pl-12'
          : `feedback-comment ${
              comment.replies?.length ? 'with-replies' : ''
            } py-6`
      } text-[13px] grid grid-cols-[auto_minmax(100px,_1fr)_100px]`}
    >
      <div className="comment-user-container mr-4 md:mr-8">
        <Image
          src={`/${comment.user?.image}`}
          alt={`${comment.user?.name} profile pic`}
          width={40}
          height={40}
        />
      </div>

      <p className="text-indigo-800 md:text-sm font-bold leading-5">
        {comment.user?.name}
        <small className="text-indigo-500 md:text-sm font-normal block">
          @{comment.user?.username}
        </small>
      </p>

      <button
        type="button"
        onClick={toggleButton}
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

      {reply.show && (
        <>
          <form
            onSubmit={onSubmit}
            className="col-span-3 md:col-start-2 md:col-span-2 md:flex md:space-x-4 mt-6 md:mb-2"
          >
            <textarea
              value={reply.content}
              onChange={onChange}
              aria-label={`Add a new reply to username:${comment.user.username}`}
              maxLength="250"
              placeholder={`Replying to @${comment.user.username}`}
              className={`w-full mb-3 md:mb-0 p-2 md:p-4 bg-indigo-100 text-indigo-800 md:text-sm rounded-5 border cursor-pointer ${
                reply.error
                  ? 'border-red-900'
                  : 'border-indigo-100 hover:border-blue-900'
              }`}
            />
            <Button type="submit" label="Post Reply" variant="primary" />
          </form>

          {reply.error ? (
            <strong className="col-span-3 md:col-start-2 md:col-span-2 font-normal text-[13px] text-red-900">
              {reply.error}
            </strong>
          ) : null}
        </>
      )}

      <section className="col-span-3">
        {comment.replies?.length
          ? comment.replies.map((reply, index) => (
              <Comment
                key={`comment-${comment.id}-reply-${index}`}
                comment={reply}
                cmid={comment.id}
              />
            ))
          : null}
      </section>
    </article>
  )
}
