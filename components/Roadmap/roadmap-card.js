import Link from 'next/link'
import UpvoteButton from '../UpvoteButton'
import { toCapitalize } from '../../utils/text'

const RoadmapCard = ({ feedback }) => {
  const { status, title, description, category, upvotes, comments, slug } =
    feedback

  return (
    <div
      className={`roadmap-feedback-card ${status} rounded-md border-t-6 bg-white p-7 text-small lg:text-base`}
    >
      <p className={`status text-indigo-500`}>{toCapitalize(status)}</p>
      <h3 className="lg:text-lg">
        <Link href={`/${slug}`} passHref>
          <a className="text-indigo-800 hover:text-blue-900">{title}</a>
        </Link>
      </h3>
      <p className="text-indigo-500">{description}</p>
      <p className="my-4 w-min rounded-10 bg-indigo-100 px-3.5 py-1.5 lg:text-small font-semibold text-blue-900">
        {toCapitalize(category)}
      </p>
      <UpvoteButton upvoted={false} upvotes={upvotes} variant="inline" />
      <p className="comments float-right mt-2 font-bold lg:text-base">
        {comments.length}
      </p>
    </div>
  )
}

export default RoadmapCard