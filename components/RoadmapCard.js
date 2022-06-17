import Link from 'next/link'
import { toCapitalize } from 'lib/utils'
import UpvoteButton from './Buttons/Upvote'

export default function RoadmapCard({ data }) {
  const { category, comments, description, _id, slug, status, title, upvotes } =
    data

  const categoryText = ['ux', 'ui'].includes(category)
    ? category.toUpperCase()
    : toCapitalize(category)

  return (
    <article
      className={`roadmap-feedback-card ${status} rounded-md border-t-6 bg-white p-6 pt-3 mb-4 text-small lg:text-base`}
    >
      <p className={`status text-indigo-500 mb-3`}>{toCapitalize(status)}</p>

      <h3 className="text-sm lg:text-lg mb-2">
        <Link href={`/feedback/detail/${slug}`} passHref>
          <a className="text-indigo-800 hover:text-blue-900 hover:cursor-pointer">
            {title}
          </a>
        </Link>
      </h3>

      <p className="text-indigo-500">{description}</p>
      <p className="w-min rounded-10 bg-indigo-300 px-4 py-1.5 mt-2 mb-4 md:mt-3 lg:text-small font-semibold text-blue-900">
        {categoryText}
      </p>

      <UpvoteButton upvotes={upvotes} fdid={_id} />
      <p
        aria-label="comments"
        className={`${
          comments ? 'text-indigo-800' : 'text-[#898EAC]'
        } comments float-right mt-2 font-bold lg:text-base text-indigo-800`}
      >
        {comments}
      </p>
    </article>
  )
}
