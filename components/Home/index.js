import { useEffect, useReducer, useState } from 'react'
import Filter from '../Filter'
import NavLink from '../NavLink'
import RoadmapStatus from './roadmap-status'
import Select from '../Select'
import Link from 'next/link'
import FeedbackCard from '../FeedbackCard'

const reducer = (state, action) => {
  let data
  const { type, payload } = action

  switch (type) {
    case 'CHANGE_FILTER_VALUE':
      data =
        payload === 'all'
          ? state.requests.suggestion
          : state.requests.suggestion.filter((sug) => sug.category === payload)
      return {
        ...state,
        sort: 'MOST_UPVOTES',
        filter: payload,
        suggestions: data,
      }

    case 'MOST_UPVOTES':
      data = [...state.suggestions].sort((a, b) => b.upvotes - a.upvotes)
      return { ...state, sort: type, suggestions: data }

    case 'LEAST_UPVOTES':
      data = [...state.suggestions].sort((a, b) => a.upvotes - b.upvotes)
      return { ...state, sort: type, suggestions: data }

    case 'MOST_COMMENTS':
      data = [...state.suggestions].sort(
        (a, b) => b.comments.length - a.comments.length
      )
      return { ...state, sort: type, suggestions: data }

    case 'LEAST_COMMENTS':
      data = [...state.suggestions].sort(
        (a, b) => a.comments.length - b.comments.length
      )
      return { ...state, sort: type, suggestions: data }

    default:
      return state
  }
}

export default function Home({ data }) {
  const initialState = {
    filter: 'all',
    sort: 'MOST_UPVOTES',
    suggestions: data?.suggestion,
    requests: data,
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    document.body.style.overflow = showMenu ? 'hidden' : 'unset'
    return () => (document.body.style.overflow = '')
  }, [showMenu])

  if (!data) return <p>...Loading</p>

  const SuggLength = state.suggestions?.length || 0

  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'UI', value: 'ui' },
    { label: 'UX', value: 'ux' },
    { label: 'Enhancement', value: 'enhancement' },
    { label: 'Bug', value: 'bug' },
    { label: 'Feature', value: 'feature' },
  ]

  const onTabChange = ({ target }) => {
    dispatch({ type: 'CHANGE_FILTER_VALUE', payload: target.value })
    setShowMenu(false)
  }

  const onSelectChange = (option) => {
    dispatch({ type: option })
  }

  return (
    <main className="home container grid lg:gap-x-4 xl:gap-x-8 grid-cols-3 grid-rows-[72px_auto] md:grid-rows-[178px_auto] lg:grid-cols-4 lg:grid-rows-none md:pt-14 lg:pt-24">
      <header className="col-span-4 md:col-span-1 md:rounded-10 lg:mb-6 py-3 md:p-6">
        <h1 className="text-base md:text-xl text-white font-bold leading-5 md:leading-7">
          Frontend Mentor
          <small className="font-normal text-small md:text-base opacity-75 block">
            Feedback Board
          </small>
        </h1>
        <button
          className="mobile-nav-button"
          type="button"
          onClick={() => setShowMenu(!showMenu)}
        >
          <div className={`bar ${showMenu ? 'animate' : ''}`}></div>
        </button>
      </header>

      <aside className="lg:order-3 col-span-3 md:col-span-2 lg:col-span-1 md:ml-3 bg-indigo-lighter">
        <nav
          className={`${
            showMenu ? 'show' : 'hide'
          } mobile-nav md:flex md:flex-row lg:flex-col lg:space-y-6`}
        >
          <Filter
            options={filterOptions}
            checkedValue={state.filter}
            onChange={onTabChange}
          />
          <RoadmapStatus data={state.requests} />
        </nav>
        <div className={`${showMenu ? 'mobile-nav-backdrop' : ''}`}></div>
      </aside>

      <section className="home-suggestions-section col-span-3 md:col-span-3 lg:row-span-4 md:pt-10 lg:pt-0">
        <header className="flex items-center bg-indigo-800 md:rounded-10 px-6 py-2 md:pr-4 md:pl-9 md:py-4 md:mb-6">
          <h2 className="hidden md:block text-white font-bold text-lg mr-11 leading-loose">
            {SuggLength} Suggestion
            {SuggLength > 1 || !SuggLength ? 's' : ''}
          </h2>

          <Select
            options={[
              { label: 'Most Upvotes', value: 'MOST_UPVOTES' },
              { label: 'Least Upvotes', value: 'LEAST_UPVOTES' },
              { label: 'Most Comments', value: 'MOST_COMMENTS' },
              { label: 'Least Comments', value: 'LEAST_COMMENTS' },
            ]}
            selected={state.sort}
            onChange={onSelectChange}
            btnDetail="Sort by:"
            disabled={!SuggLength}
          />

          <Link href="/feedback/new" passHref>
            <NavLink label="+ Add Feedback" variant="primary" />
          </Link>
        </header>

        <div className="py-8 px-6 md:p-0 space-y-6">
          {SuggLength ? (
            state.suggestions.map((data) => (
              <FeedbackCard key={data.id} feedback={data} link />
            ))
          ) : (
            <div className="bg-white rounded-10 text-center py-20 px-7 md:py-24 md:px-44">
              <p className="text-indigo-800 font-bold text-lg md:text-2xl tracking-tight mt-6">
                There is no feedback yet.
              </p>
              <p className="text-indigo-500 text-small mt-2 mb-5">
                Got a suggestion? Found a bug that needs to be squashed? We love
                hearing about new ideas to improve our app.
              </p>
              <Link href="/feedback/new" passHref>
                <NavLink label="+ Add Feedback" variant="primary" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
// section lg:pl-5 header lg:h-[140px]
// aside lg:w-1/4 md:h-44 lg:h-full
