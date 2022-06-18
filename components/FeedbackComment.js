import Image from 'next/image'
import { useState } from 'react'

import FeedbackReplyForm from './FeedbackReplyForm'

export default function Comment({ fdid, comment, cmid }) {
  const [isFormOpen, setFormOpen] = useState(false)

  const toggleButton = () => setFormOpen((state) => !state)

  const closeForm = () => setFormOpen(false)

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

      {isFormOpen && (
        <FeedbackReplyForm
          fdid={fdid}
          cmid={cmid}
          replyingTo={comment.replyingTo || comment.user.username}
          closeForm={closeForm}
        />
      )}

      <section className="col-span-3">
        {comment.replies?.length
          ? comment.replies.map((reply, index) => (
              <Comment
                key={`c-${comment._id}-rep-${index}`}
                fdid={fdid}
                cmid={cmid}
                comment={reply}
              />
            ))
          : null}
      </section>
    </article>
  )
}
