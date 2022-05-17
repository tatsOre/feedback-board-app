import Link from 'next/link'
import { useState } from 'react'
import { toCapitalize } from '../../utils/index'
import GoBackButton from '../Buttons/GoBack'
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
    <main className="container lg:px-4 md:pt-14 lg:pt-20">
      <header className="flex items-center justify-between text-white bg-indigo-900 md:rounded-10 p-6 md:p-7">
        <div>
          <GoBackButton light />
          <h1 className="text-lg md:text-2xl">Roadmap</h1>
        </div>

        <Link href="/feedback/new" passHref>
          <NavLink label="+ Add Feedback" variant="primary" />
        </Link>
      </header>

      <nav className="roadmap-tags-nav-mobile md:hidden flex w-full relative">
        {Object.keys(data).map(
          (status) =>
            status !== 'suggestion' && (
              <button
                className={`${
                  show === status
                    ? `text-indigo-800 border-b-4 ${status}`
                    : 'text-indigo-500'
                } w-1/3 h-14 box-content font-bold text-small`}
                type="button"
                onClick={() => setShow(status)}
                key={`roapmap-nav-link-${status}`}
              >
                {toCapitalize(status)} ({data[status].length})
              </button>
            )
        )}
      </nav>

      <section className="roadmap-feedbacks-section flex p-6 md:p-0 md:pt-8 md:space-x-2.5 lg:space-x-4 xl:space-x-7">
        {Object.keys(data).map(
          (status) =>
            status !== 'suggestion' && (
              <div
                key={`roapmap-section-${status}`}
                className={`hidden md:block w-full md:w-1/3 ${
                  show === status && 'active-status'
                }`}
              >
                <h2 className="text-indigo-800 text-lg md:text-sm lg:text-lg">
                  {toCapitalize(status)} ({data[status].length})
                </h2>
                <p className="text-indigo-500 text-small md:text-sm lg:text-base pb-6">
                  {tagline[status]}
                </p>
                {data[status].map((feedback) => (
                  <RoadmapCard key={feedback.id} feedback={feedback} />
                ))}
              </div>
            )
        )}
      </section>
    </main>
  )
}

export default RoadmapPage
