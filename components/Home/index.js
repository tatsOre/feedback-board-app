import { useEffect, useReducer, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FeedbackCard from '../FeedbackCard'
import Filter from '../Filter'
import Loader from '../Shared/loader'
import Login from '../Shared/login'
import NavLink from '../NavLink'
import RoadmapStatus from './roadmap-status'
import Select from '../Select'
import { getCommentsLength } from '../../utils'
import { FILTER_OPTIONS, SORT_OPTIONS } from './index-utils'

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
      data = [...state.suggestions].sort((a, b) => {
        const aComments = getCommentsLength(a.comments)
        const bComments = getCommentsLength(b.comments)
        return bComments - aComments
      })
      return { ...state, sort: type, suggestions: data }

    case 'LEAST_COMMENTS':
      data = [...state.suggestions].sort((a, b) => {
        const aComments = getCommentsLength(a.comments)
        const bComments = getCommentsLength(b.comments)
        return aComments - bComments
      })
      return { ...state, sort: type, suggestions: data }

    default:
      return state
  }
}

export default function Home({ data }) {
  const initialState = {
    filter: 'all',
    sort: 'MOST_UPVOTES',
    suggestions: data && (data.suggestion || []),
    requests: data || [],
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.position = isMenuOpen ? 'fixed' : 'static'
    document.body.style.overflowY = 'scroll'
    return () => {
      document.body.style.position = 'static'
    }
  }, [isMenuOpen])

  if (!data) return <Loader />

  const SuggLength = state.suggestions.length

  const onTabChange = ({ target }) => {
    dispatch({ type: 'CHANGE_FILTER_VALUE', payload: target.value })
    setIsMenuOpen(false)
  }

  const onSelectChange = (option) => {
    dispatch({ type: option })
  }

  return (
    <main className="home container grid lg:gap-x-4 xl:gap-x-8 grid-cols-3 grid-rows-[auto_auto] md:grid-rows-[minmax(178px, auto)_auto] lg:grid-cols-4 lg:grid-rows-none md:pt-14 lg:pt-24">
      <header className="col-span-3 md:col-span-1 md:rounded-10 lg:mb-6 py-3 md:p-6">
        <h1 className="text-base md:text-xl text-white leading-5 md:leading-7">
          Frontend Mentor
          <small className="font-normal text-small md:text-base opacity-75 block">
            Feedback Board
          </small>
        </h1>
        <button
          className="mobile-nav-button"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`bar ${isMenuOpen ? 'animate' : ''}`}></div>
        </button>
      </header>

      <aside className="lg:order-3 col-span-3 md:col-span-2 lg:col-span-1 md:ml-3 lg:ml-0 bg-indigo-lighter">
        <nav
          className={`${
            isMenuOpen ? 'show' : 'hide'
          } mobile-nav md:flex md:flex-row lg:flex-col lg:space-y-6`}
        >
          <Filter
            options={FILTER_OPTIONS}
            checked={state.filter}
            onChange={onTabChange}
          />
          <RoadmapStatus data={state.requests} />
          <Login />
        </nav>

        <div
          className={`${isMenuOpen ? 'mobile-nav-backdrop' : ''}`}
          onClick={() => {
            setIsMenuOpen(false)
          }}
        ></div>
      </aside>

      <section className="home-suggestions-section col-span-3 md:col-span-3 lg:row-span-4 md:pt-10 lg:pt-0">
        <header className="flex bg-indigo-800 md:rounded-10 px-6 py-2 md:pr-4 md:pl-9 md:py-4 md:mb-6">
          <h2 className="hidden md:block text-white font-bold text-lg mr-11">
            {SuggLength} Suggestion
            {SuggLength > 1 || !SuggLength ? 's' : ''}
          </h2>

          <Select
            options={SORT_OPTIONS}
            selected={state.sort}
            onChange={onSelectChange}
            labelDetail="Sort by:"
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
            <div className="bg-white flex flex-col items-center rounded-10 py-20 px-7 md:py-24 md:px-44">
              <div className="relative w-[102px] h-[108px] md:w-[130px] md:h-[137px]">
                <Image
                  src="/assets/suggestions/illustration-empty.svg"
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
              </div>
              <p className="text-indigo-800 font-bold text-lg md:text-2xl tracking-tight mt-10 md:mt-14">
                There is no feedback yet.
              </p>
              <p className="text-indigo-500 text-center text-small mt-2 mb-5">
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

      <Login breakpoint="md" />
    </main>
  )
}
