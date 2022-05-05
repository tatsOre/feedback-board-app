import Head from 'next/head'
import { useReducer } from 'react'
import Filter from '../Filter'
import NavLink from '../NavLink'
import RoadmapStatus from './roadmap-status'
import Select from '../Select'
import Suggestion from '../Suggestion'
import Link from 'next/link'

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

const init = (state, payload) => {
  const suggestions = payload && payload.suggestion
  const progress = payload && payload['in-progress']
  const planned = payload && payload.planned
  const live = payload && payload.live

  const requests = {
    suggestion: suggestions || [],
    'in-progress': progress || [],
    planned: planned || [],
    live: live || [],
  }

  return {
    ...state,
    requests,
    suggestions: requests.suggestion,
  }
}

export default function Home({ data }) {
  const initialState = { filter: 'all', sort: 'MOST_UPVOTES' }
  const initFunc = () => init(initialState, data)
  const [state, dispatch] = useReducer(reducer, initialState, initFunc)

  const onTabChange = ({ target }) =>
    dispatch({ type: 'CHANGE_FILTER_VALUE', payload: target.value })

  const onSelectChange = (option) => {
    dispatch({ type: option })
  }

  return (
    <main className="container flex flex-wrap flex-col lg:flex-row md:pt-14 lg:pt-24">
      <aside className="md:flex md:flex-row lg:flex-col lg:w-1/4 md:h-44 lg:h-full md:mb-10 bg-indigo-lighter lg:space-y-4">
        <header className="w-full md:w-1/3 lg:w-full h-[72px] md:h-full lg:h-[140px] md:rounded-10 md:mr-2.5 lg:mr-0 bg-header-sm py-3 px-5 md:p-6 md:bg-header-md lg:bg-header-xl bg-cover bg-no-repeat">
          <h1 className="text-base md:text-xl text-white font-bold leading-5 md:leading-7">
            Frontend Mentor
            <small className="font-normal text-small md:text-base opacity-75 block">Feedback Board</small>
          </h1>
        </header>

        <div className="w-full md:w-2/3 lg:w-full md:flex md:flex-row lg:flex-col lg:space-y-4"> {/* mobile menu */}
          <Filter
            className="bg-white rounded-10 w-full md:w-1/2 lg:w-full p-5"
            options={[
              { label: 'All', value: 'all' },
              { label: 'UI', value: 'ui' },
              { label: 'UX', value: 'ux' },
              { label: 'Enhancement', value: 'enhancement' },
              { label: 'Bug', value: 'bug' },
              { label: 'Feature', value: 'feature' },
            ]}
            checkedValue={state.filter}
            onChange={onTabChange}
          />

          <RoadmapStatus
            className="roadmap-status-panel bg-white rounded-10 w-full md:w-1/2 lg:w-full p-5 md:ml-2.5 lg:ml-0"
            data={{
              planned: state.requests.planned.length,
              'in-progress': state.requests['in-progress'].length,
              live: state.requests.live.length,
            }}
          />
        </div>
      </aside>

      <section className="lg:w-3/4 lg:pl-5">
        <header className="flex items-center justify-between md:rounded-10 px-6 py-2 bg-indigo-800">
          <h2 className="hidden md:block text-white font-bold text-lg">
            {state.suggestions.length} Suggestion
            {state.suggestions.length > 1 ? 's' : ''}
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
          />

          <Link href="/post" passHref>
            <NavLink label="+ Add Feedback" variant="primary" />
          </Link>
        </header>

        {state.suggestions.map((fd) => (
          <Suggestion key={fd.id} data={fd} />
        ))}
      </section>

      <footer className="w-full order-last">2022</footer>
    </main>
  )
}
