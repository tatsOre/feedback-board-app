import { useEffect } from 'react'
import { useFeedbackData } from '../context/FeedbackProvider'
import { useUser } from '../context/UserProvider'

import { getCommentsLength } from '../utils'

import AddComment from './AddComment'
import Comment from './FeedbackComment'
import GoBackButton from './Buttons/GoBack'
import FeedbackCard from './FeedbackCard'
import Loader from './Shared/loader'
import StyledLink from './Link'

export default function Feedback() {
  const { data, loadingData } = useFeedbackData()
  const { user } = useUser()

  useEffect(() => {
    if (data) document.title = `Feedback Board ${'- ' + data.title}`
  }, [loadingData])

  if (loadingData && !data) return <Loader />
  if (!loadingData && !data) {
    // redirect and sendAlert
    return <p>Something went wrong</p>
  }

  const commentsLength = getCommentsLength(data.comments)

  return (
    <main className="p-6 md:p-10 max-w-[calc(730px+5rem)] mx-auto">
      <nav className="flex justify-between mb-6">
        <GoBackButton />
        {user?.userId === data.author && (
          <StyledLink
            href={`/feedback/edit/${data.slug}`}
            label="Edit Feedback"
            variant="tertiary"
          />
        )}
      </nav>

      <FeedbackCard data={data} />

      {commentsLength ? (
        <section className="feedback-comments-section bg-white rounded-10 p-6 pb-0 md:px-8 mt-6">
          <h2 className="text-indigo-800 text-lg">
            {commentsLength} Comment{commentsLength > 1 ? 's' : ''}
          </h2>
          {data.comments.map((c, index) => (
            <Comment
              comment={c}
              cmid={c.id}
              key={`feedback-${data.id}-comment-${index}`}
            />
          ))}
        </section>
      ) : null}

      {user?.userId !== data.author && <AddComment user={user} />}
    </main>
  )
}
