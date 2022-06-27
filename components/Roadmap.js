import { useState } from 'react'

import { ROADMAP_SECTION_TAGLINES } from '../lib/constants'
import { toCapitalize } from '../lib/utils'

import { AddFeedback } from './Link'
import GoBackButton from './Buttons/GoBack'
import RoadmapCard from './RoadmapCard'


export default function Roadmap({ data }) {
  const [activeTab, setActiveTab] = useState('planned')

  return (
    <div className="container lg:px-4 md:pt-14 lg:pt-20">
      <header className="flex items-center justify-between bg-indigo-900 md:rounded-10 p-6 md:p-7">
        <div>
          <GoBackButton light />
          <h1 className="text-lg md:text-2xl text-white">Roadmap</h1>
        </div>
        <AddFeedback />
      </header>
      <main>
        <nav className="roadmap-tags-nav-mobile md:hidden relative">
          {Object.keys(data).map(
            (status) =>
              status !== 'suggestion' && (
                <button
                  className={`${
                    activeTab === status
                      ? `text-indigo-800 border-b-4 ${status}`
                      : 'text-indigo-500'
                  } w-1/3 h-14 box-content font-bold text-small`}
                  type="button"
                  onClick={() => setActiveTab(status)}
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
                  id={`roapmap-section-${status}`}
                  key={`roapmap-section-${status}`}
                  className={`hidden md:block w-full md:w-1/3 ${
                    activeTab === status && 'active-status'
                  }`}
                >
                  <h2 className="text-indigo-800 text-lg md:text-sm lg:text-lg">
                    {toCapitalize(status)} ({data[status].length})
                  </h2>
                  <p className="text-indigo-500 text-small md:text-sm lg:text-base pb-6">
                    {ROADMAP_SECTION_TAGLINES[status]}
                  </p>
                  {data[status].map((item) => (
                    <RoadmapCard key={item._id} data={item} />
                  ))}
                </div>
              )
          )}
        </section>
      </main>
    </div>
  )
}
