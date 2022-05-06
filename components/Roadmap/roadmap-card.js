import Link from 'next/link'
import UpvoteButton from '../UpvoteButton'
import { toCapitalize } from '../../utils/text'

export default function RoadmapCard({ feedback }) {
  const { status, title, description, category, upvotes, comments, slug } =
    feedback

  return (
    <div
      className={`roadmap-feedback-card ${status} rounded-md border-t-6 bg-white p-6 pt-3 text-small lg:text-base`}
    >
      <p className={`status text-indigo-500`}>{toCapitalize(status)}</p>
      <h3 className="lg:text-lg mt-3 mb-1">
        <Link href={`/feedback/detail/${slug}`} passHref>
          <a className="text-indigo-800 hover:text-blue-900">{title}</a>
        </Link>
      </h3>
      <p className="text-indigo-500">{description}</p>
      <p className="w-min rounded-10 bg-indigo-300 px-4 py-1.5 mt-2 mb-4 md:mt-3 lg:text-small font-semibold text-blue-900">
        {category}
      </p>
      <UpvoteButton upvoted={false} upvotes={upvotes} variant="inline" />
      <p className="comments float-right mt-2 font-bold lg:text-base text-indigo-800">
        {comments.length}
      </p>
    </div>
  )
}
