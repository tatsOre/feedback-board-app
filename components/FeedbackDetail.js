import AddComment from './AddComment'
import Comment from './FeedbackComment'
import GoBackButton from './Buttons/GoBack'
import FeedbackCard from './FeedbackCard'
import StyledLink from './Link'

import useUser from '../lib/hooks/useUser'
import { getCommentsLength } from '../lib/utils'

export default function FeedbackPost({ data }) {
  const { user } = useUser()

  const commentsLength = getCommentsLength(data.comments)

  return (
    <main className="p-6 md:p-10 max-w-[calc(730px+5rem)] mx-auto">
      <nav className="flex justify-between mb-6">
        <GoBackButton />
        {user?.id === data.author && (
          <StyledLink href={`/feedback/${data.slug}/edit`} variant="tertiary">
            Edit Feedback
          </StyledLink>
        )}
      </nav>

      <FeedbackCard data={{ ...data, comments: commentsLength }} />

      {commentsLength ? (
        <section id='feedback-comments-section' className="bg-white rounded-10 p-6 pb-0 md:px-8 mt-6">
          <h2 className="text-indigo-800 text-lg">
            {commentsLength} Comment{commentsLength > 1 ? 's' : ''}
          </h2>
          {data.comments.map((c) => (
            <Comment fdid={data._id} comment={c} cmid={c._id} key={c._id} />
          ))}
        </section>
      ) : null}

      {user && user._id !== data.author && <AddComment data={data} user={user} />}
    </main>
  )
}
