import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import useUser from '../../hooks/use-user'
import { getCommentsLength } from '../../utils'
import Button from '../Buttons/Default'
import GoBack from '../Buttons/GoBack'
import FeedbackCard from '../FeedbackCard'
import NavLink from '../NavLink'

const PostReply = ({ data }) => {
  const { feedbackID, commentID, replyingTo } = data

  const [state, setState] = useState('')

  const { user } = useUser('jesse10930')

  const onChange = ({ target }) => setState(target.value)

  const onSubmit = (event) => {
    event.preventDefault()

    const payload = {
      feedbackID,
      commentID,
      replyingTo,
      content: state,
      user: {
        image: user?.image,
        name: user?.name,
        username: user?.username,
      },
    }
    console.log(payload)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="col-span-3 md:col-start-2 md:col-span-2 md:flex md:space-x-4 mt-6 md:mb-2"
    >
      <textarea
        name="new-comment"
        value={state}
        onChange={onChange}
        aria-label="Add a new comment"
        className="w-full mb-3 md:mb-0 p-2 md:p-4 bg-indigo-100 text-indigo-800 md:text-sm rounded-5 border border-indigo-100 hover:border-blue-900 cursor-pointer"
      />
      <Button type="submit" label="Post Reply" variant="primary" />
    </form>
  )
}

const Comment = ({ comment, fdid, cmid }) => {
  const [showForm, setShowForm] = useState(false)

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
        <PostReply
          data={{
            feedbackID: fdid,
            commentID: cmid,
            replyingTo: comment.user?.username,
          }}
        />
      )}

      <section className="col-span-3">
        {comment.replies &&
          comment.replies.length &&
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

export default function Feedback({ data }) {
  const [newComment, setNewComment] = useState('')
  const { user } = useUser('jesse10930')

  if (!data) return <p>...Loading</p>

  const charsLeft = 225 - newComment.length
  const commentsLength = getCommentsLength(data.comments)

  const onSubmit = (event) => {
    event.preventDefault()
    console.log(newComment)
  }

  return (
    <main className="p-6 md:p-10 max-w-[calc(730px+5rem)] mx-auto">
      <nav className="flex justify-between mb-6">
        <GoBack />
        {user?.username === data.author && (
          <Link
            href={{ pathname: '/feedback/edit/[id]', query: { id: data.id } }}
            as="/edit"
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

          {data.comments.map((c) => (
            <Comment
              comment={c}
              fdid={data.id}
              cmid={c.id}
              key={`feedback-${data.id}-comment-${c.id}`}
            />
          ))}
        </section>
      ) : (
        ''
      )}

      {user?.username !== data.author && (
        <form
          onSubmit={onSubmit}
          className="bg-white rounded-10 p-6 md:px-8 mt-6 flex flex-wrap justify-between items-center"
        >
          <h2 className="w-full text-indigo-800 text-lg mb-6">Add Comment</h2>
          <textarea
            name="new-comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            aria-label={`Add a new comment for ${data.title}`}
            className="w-full text-[13px] md:text-[15px] bg-indigo-100 rounded-5 p-4 mb-4 text-indigo-800 border border-indigo-100 hover:border-blue-900 cursor-pointer"
            placeholder="Type your comment here"
            rows="3"
            maxLength="225"
          />
          <p className="text-indigo-500 text-[13px]">
            {charsLeft} character{charsLeft > 1 || !charsLeft ? 's' : ''} left
          </p>
          <Button type="submit" label="Post Comment" variant="primary" />
        </form>
      )}
    </main>
  )
}
