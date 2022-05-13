import Link from 'next/link'
import UpvoteButton from '../Buttons/Upvote'
import { getCommentsLength, toCapitalize } from '../../utils'
import useUser from '../../hooks/use-user'

export default function FeedbackCard({ feedback, link }) {
  const { category, comments, description, id, slug, title, upvotes } = feedback
  const commentsLength = getCommentsLength(comments)
  const categoryText = ['ux', 'ui'].includes(category)
    ? category.toUpperCase()
    : toCapitalize(category)

  const { user } = useUser()

  return (
    <div
      className={`${
        link ? 'group cursor-pointer relative' : ''
      } feedback-card w-full flex flex-wrap items-center md:items-start bg-white text-[13px] rounded-10 p-6 md:px-8`}
    >
      {link && (
        <Link href={`/feedback/detail/${slug}`} passHref>
          <a>
            <span className="full-link"></span>
          </a>
        </Link>
      )}
      <div className="w-full md:w-auto md:ml-10">
        <h3 className="text-sm lg:text-lg mb-2 text-indigo-800 group-hover:text-blue-900">
          {title}
        </h3>
        <p className="text-indigo-500">{description}</p>
        <p className="w-min rounded-10 bg-indigo-300 px-4 py-1.5 mt-2 mb-4 md:mt-3 lg:text-small font-semibold text-blue-900">
          {categoryText}
        </p>
      </div>

      <UpvoteButton upvotes={upvotes} fdid={id} user={user}/>
      <p
        className={`${
          commentsLength ? 'text-indigo-800' : 'text-[#898EAC]'
        } comments ml-auto md:my-auto font-bold lg:text-base`}
      >
        {commentsLength}
      </p>
    </div>
  )
}
