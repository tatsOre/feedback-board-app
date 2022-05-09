import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Button from '../Button'
import NavLink from '../NavLink'
import Suggestion from '../Suggestion'

const PostReply = ({ data }) => {
  const { feedbackID, commentID, replyingTo } = data

  const [state, setState] = useState('')
  const onChange = ({ target }) => setState(target.value)

  const onSubmit = (event) => {
    event.preventDefault()

    const payload = {
      feedbackID,
      commentID,
      replyingTo,
      content: state,
      user: {
        image: 'user-images/image-suzanne.jpg',
        name: 'Suzanne Chang',
        username: 'upbeat1811',
      },
    }
    console.log(payload)
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <textarea
        name="new-comment"
        value={state}
        onChange={onChange}
        aria-label="Add a new comment"
      />
      <Button type="submit" label="Post Reply" variant="primary" />
    </form>
  )
}

const Comment = ({ comment, fdid, cmid }) => {
  const [showForm, setShowForm] = useState(false)

  return (
    <article
      className={`${comment.replyingTo ? 'feedback-reply' : 'comment-comment'}`}
    >
      <div className="relative w-10 h-10">
        <Image
          src={`/${comment.user?.image}`}
          layout="fill"
          objectFit="cover"
          alt={`${comment.user?.name} profile pic`}
        />
      </div>
      <h3 className="text-indigo-800 text-sm">{comment.user?.name}</h3>
      <p className="text-indigo-500 text-sm">@{comment.user?.username}</p>
      <button
        type="button"
        onClick={() => setShowForm(!showForm)}
        className="font-bold text-blue-900 text-[13px] hover:underline"
      >
        Reply
      </button>
      <p className="text-indigo-500 text-[15px]">
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
            replyingTo: comment.user.username,
          }}
        />
      )}

      {comment.replies &&
        comment.replies.length &&
        comment.replies.map((reply, index) => (
          <Comment
            key={`commemt-${comment.id}-reply-${index}`}
            comment={reply}
            fdid={fdid}
            cmid={comment.id}
          />
        ))}
    </article>
  )
}

export default function Feedback({ data }) {
  if (!data) return <p>...Loading</p>

  const router = useRouter()
  const n = 225

  const [newComment, setNewComment] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    console.log(newComment)
  }

  return (
    <main className="p-6 max-w-[730px] mx-auto flex flex-wrap justify-between space-y-6">
      <button onClick={() => router.back()}>Go Back</button>
      <Link
        href={{ pathname: '/feedback/edit/[id]', query: { id: data.id } }}
        as="/edit"
        passHref
      >
        <NavLink label="Edit Feedback" variant="secondary" />
      </Link>

      <Suggestion data={data} />

      {data.comments.length ? (
        <section className="feedback-comments-section w-full bg-white rounded-10 py-6 px-5">
          <h2>{data.comments.length} Comments</h2>

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

      <form
        onSubmit={onSubmit}
        className="w-full bg-white rounded-10 py-6 px-5"
      >
        <h2>Add Comment</h2>
        <textarea
          name="new-comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          aria-label={`Add a new comment for ${data.title}`}
          className="w-full bg-indigo-100 rounded-md p-4 text-indigo-800 border border-indigo-100 hover:border-blue-900 cursor-pointer"
          placeholder="Type your comment here"
          rows="4"
        />
        <p>
          {n} character{n > 1 || n === 0 ? 's' : ''} left
        </p>
        <Button type="submit" label="Post Comment" variant="primary" />
      </form>
    </main>
  )
}
