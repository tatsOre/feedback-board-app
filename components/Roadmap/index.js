import { useState } from 'react'
import { toCapitalize } from '../../utils/text'
import NavLink from '../NavLink'
import RoadmapCard from './roadmap-card'

const tagline = {
  planned: 'Ideas priorized for research',
  'in-progress': 'Features currently being developed',
  live: 'Released features',
}

const RoadmapPage = ({ data }) => {
  const [show, setShow] = useState('planned')

  return (
    <div>
      <header className="flex text-white bg-indigo-900">
        <button>
          <a>Go Back</a>
        </button>
        <h1 className="text-lg md:text-2xl">Roadmap</h1>
        <NavLink href="/post" label="+ Add Feedback" variant="primary" />
      </header>

      <nav className="roadmap-tags-nav-mobile block md:hidden flex w-full relative">
        {Object.keys(data).map(
          (category) =>
            category !== 'suggestion' && (
              <button
                className={`${
                  show === category
                    ? `text-indigo-800 border-b-4 ${category}`
                    : 'text-indigo-500'
                } w-1/3 font-bold text-small box-content h-14`}
                type="button"
                onClick={() => setShow(category)}
              >
                {toCapitalize(category)} ({data[category].length})
              </button>
            )
        )}
      </nav>

      <div className="flex p-6 lg:pt-8">
        {Object.keys(data).map(
          (category) =>
            category !== 'suggestion' && (
              <div
                className={`hidden md:block w-full md:w-1/3 ${
                  show === category && 'active-status'
                }`}
              >
                <h2 className="text-indigo-800 text-lg md:text-sm lg:text-lg">
                  {toCapitalize(category)} ({data[category].length})
                </h2>
                <p className="text-indigo-500 text-small md:text-sm lg:text-base pb-6">
                  {tagline[category]}
                </p>
                {data[category].map((feedback) => (
                  <RoadmapCard key={feedback.id} feedback={feedback} />
                ))}
              </div>
            )
        )}
      </div>
    </div>
  )
}

export default RoadmapPage
