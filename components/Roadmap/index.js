import Link from 'next/link'
import { useState } from 'react'

import Button from '../Button'
import RoadmapCard from './roadmap-card'

const RoadmapPage = ({ data }) => {
  const [show, setShow] = useState('planned')
  const { planned, 'in-progress': progress, live } = data
  
  return (
    <div>
      <header className="flex text-white bg-indigo-900">
        <Link href="/" passHref>
          <a>Go Back</a>
        </Link>
        <h1 className="text-lg md:text-2xl">Roadmap</h1>

        <Button type="button" variant="primary" handleClick={() => {}}>
          + Add Feedback
        </Button>
      </header>

      <nav className="block md:hidden roadmap-tags-nav-mobile flex w-full relative">
        <button
          className={`${
            show === 'planned'
              ? 'text-indigo-800 border-b-4 border-coral'
              : 'text-indigo-500'
          } w-1/3 font-bold text-small box-content h-14`}
          type="button"
          onClick={() => setShow('planned')}
        >
          Planned ({planned.length})
        </button>
        <button
          className={`${
            show === 'in-progress'
              ? 'text-indigo-800 border-b-4 border-violet-900'
              : 'text-indigo-500'
          } w-1/3 font-bold text-small box-content h-14`}
          type="button"
          onClick={() => setShow('in-progress')}
        >
          In-Progress ({progress.length})
        </button>
        <button
          className={`${
            show === 'live'
              ? 'text-indigo-800 border-b-4 border-sky-medium'
              : 'text-indigo-500'
          } w-1/3 font-bold text-small box-content h-14`}
          type="button"
          onClick={() => setShow('live')}
        >
          Live ({live.length})
        </button>
      </nav>
      <div className="flex p-6 lg:pt-8">
        <div
          className={`hidden md:block w-full md:w-1/3 ${
            show === 'planned' && 'active-status'
          }`}
        >
          <h2 className="text-indigo-800 text-lg md:text-sm lg:text-lg">
            Planned ({planned.length})
          </h2>
          <p className="text-indigo-500 text-small md:text-sm lg:text-base pb-6">
            Ideas priorized for research
          </p>
          {planned.map((feedback) => (
            <RoadmapCard key={feedback.id} feedback={feedback} />
          ))}
        </div>
        <div
          className={`hidden ${
            show === 'in-progress' && 'active-status'
          } md:block w-full md:w-1/3`}
        >
          <h2 className="text-indigo-800 text-lg md:text-sm lg:text-lg">
            In-Progress ({progress.length})
          </h2>
          <p className="text-indigo-500 text-small md:text-sm lg:text-base pb-6">
            Currently being developed
          </p>
          {progress.map((feedback) => (
            <RoadmapCard key={feedback.id} feedback={feedback} />
          ))}
        </div>
        <div
          className={`hidden md:block w-full md:w-1/3 ${
            show === 'live' && 'active-status'
          }`}
        >
          <h2 className="text-indigo-800 text-lg md:text-sm lg:text-lg">
            Live ({live.length})
          </h2>
          <p className="text-indigo-500 text-small md:text-sm lg:text-base pb-6">
            Released features
          </p>
          {live.map((feedback) => (
            <RoadmapCard key={feedback.id} feedback={feedback} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RoadmapPage
