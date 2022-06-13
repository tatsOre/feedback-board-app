import { useEffect } from 'react'

import useFeedbackData from '../hooks/useFeedbackData'
import useUser from '../hooks/useUser'

import AddComment from './AddComment'
import Comment from './FeedbackComment'
import GoBackButton from './Buttons/GoBack'
import FeedbackCard from './FeedbackCard'
import Loader from './Shared/loader'
import StyledLink from './Link'

import { getCommentsLength } from '../utils'

export default function Feedback() {
  const { data, isLoading } = useFeedbackData()
  const { user } = useUser()

  useEffect(() => {
    if (data) document.title = `Feedback Board ${'- ' + data.title}`
  }, [data])

  if (isLoading && !data) return <Loader />
  if (!isLoading && !data) {
    // redirect and sendAlert
    return <p>Something went wrong</p>
  }

  const commentsLength = getCommentsLength(data.comments)

  return (
    <main className="p-6 md:p-10 max-w-[calc(730px+5rem)] mx-auto">
      <nav className="flex justify-between mb-6">
        <GoBackButton />
        {user?.userId === data.author && (
          <StyledLink href={`/feedback/edit/${data.slug}`} variant="tertiary">
            Edit Feedback
          </StyledLink>
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

      {user?.userId !== data.author && <AddComment />}
    </main>
  )
}
