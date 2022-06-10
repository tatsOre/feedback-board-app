import { ArrowUp } from '../../Arrows'

import useFeedbackUpvote from '../../../hooks/useFeedbackUpvote'

export default function UpvoteButton({ upvotes, fdid }) {
  const { votes, isUpvoted, isLoading, onClick } = useFeedbackUpvote(
    upvotes,
    fdid
  )

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      aria-label="upvote"
      className={`${
        isUpvoted
          ? 'bg-blue-900 text-white'
          : `bg-indigo-300 text-indigo-800 ${
              !isLoading && 'hover:bg-indigo-400'
            }`
      } rounded-10 text-[13px] min-w-[70px] py-3 px-4 leading-3 flex-inline justify-evenly relative z-10`}
    >
      <ArrowUp color={isUpvoted ? '#FFFFFF' : '#4661E6'} />
      {isLoading ? '...' : votes}
    </button>
  )
}
