import Link from 'next/link'
import UpvoteButton from '../Buttons/Upvote'
import { getCommentsLength, toCapitalize } from '../../utils'

export default function RoadmapCard({ feedback }) {
  const { category, comments, description, slug, status, title, upvotes } =
    feedback
  const commentsLength = getCommentsLength(comments)
  const categoryText = ['ux', 'ui'].includes(category)
    ? category.toUpperCase()
    : toCapitalize(category)

  return (
    <div
      className={`roadmap-feedback-card ${status} rounded-md border-t-6 bg-white p-6 pt-3 mb-4 text-small lg:text-base`}
    >
      <p className={`status text-indigo-500 mb-3`}>{toCapitalize(status)}</p>
      <Link href={`/feedback/detail/${slug}`} passHref>
        <a>
          <h3 className="text-sm lg:text-lg mb-2 text-indigo-800 hover:text-blue-900 hover:cursor-pointer">
            {title}
          </h3>
        </a>
      </Link>
      <p className="text-indigo-500">{description}</p>
      <p className="w-min rounded-10 bg-indigo-300 px-4 py-1.5 mt-2 mb-4 md:mt-3 lg:text-small font-semibold text-blue-900">
        {categoryText}
      </p>
      <UpvoteButton upvoted={false} upvotes={upvotes} variant="inline" />
      <p className="comments float-right mt-2 font-bold lg:text-base text-indigo-800">
        {commentsLength}
      </p>
    </div>
  )
}
