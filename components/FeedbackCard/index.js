import Link from 'next/link'
import UpvoteButton from '../Buttons/Upvote'
import { getCommentsLength, toCapitalize } from '../../utils/index'

export default function FeedbackCard({ feedback }) {
  const { title, description, category, upvotes, comments, slug } =
    feedback

  const commentsLength = getCommentsLength(comments)
  const categoryText = ['ux', 'ui'].includes(category)
    ? category.toUpperCase()
    : toCapitalize(category)

  return (
    <>
      <h3 className="text-sm lg:text-lg mb-2">
        <Link href={`/feedback/detail/${slug}`} passHref>
          <a className="text-indigo-800 hover:text-blue-900">{title}</a>
        </Link>
      </h3>
      <p className="text-indigo-500">{description}</p>
      <p className="w-min rounded-10 bg-indigo-300 px-4 py-1.5 mt-2 mb-4 md:mt-3 lg:text-small font-semibold text-blue-900">
        {categoryText}
      </p>
      <UpvoteButton upvoted={false} upvotes={upvotes} variant="inline" />
      <p className="comments float-right mt-2 font-bold lg:text-base text-indigo-800">
        {commentsLength}
      </p>
    </>
  )
}
