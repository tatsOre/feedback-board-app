import Link from 'next/link'
import UpvoteButton from '../Buttons/Upvote'
import { getCommentsLength, toCapitalize } from '../../utils'

/* span elem is used as link instead of article since button is not allowed as content for a element */

export default function FeedbackCard({ data, link }) {
  const { category, comments, description, id, slug, title, upvotes } = data
  const commentsLength = getCommentsLength(comments)
  const categoryText = ['ux', 'ui'].includes(category)
    ? category.toUpperCase()
    : toCapitalize(category)

  return (
    <article
      className={`${
        link ? 'group cursor-pointer relative' : ''
      } feedback-card w-full flex flex-wrap items-center md:items-start bg-white text-[13px] rounded-10 p-6 md:px-8`}
    >
      {link && (
        <Link href={`/feedback/detail/${slug}`} passHref>
          <a aria-label={`link to ${title}`}>
            <span className="full-link"></span>
          </a>
        </Link>
      )}
      <div className="w-full md:w-[80%] md:ml-10">
        <h3 className="text-sm lg:text-lg mb-2 text-indigo-800 group-hover:text-blue-900">
          {title}
        </h3>
        <p className="text-indigo-500">{description}</p>
        <p className="w-min rounded-10 bg-indigo-300 px-4 py-1.5 mt-2 mb-4 md:mt-3 lg:text-small font-semibold text-blue-900">
          {categoryText}
        </p>
      </div>

      <UpvoteButton upvotes={upvotes} fdid={id} />
      <p
        aria-label="comments"
        className={`${
          commentsLength ? 'text-indigo-800' : 'text-[#898EAC]'
        } comments ml-auto md:my-auto font-bold lg:text-base`}
      >
        {commentsLength}
      </p>
    </article>
  )
}
