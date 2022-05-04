import Head from 'next/head'
import { useEffect, useReducer } from 'react'

import Button from '../Button'
import Filter from '../Filter'
import RoadmapStatus from './roadmap-status'
import Select from '../Select'

import Suggestion from "../Suggestion"

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
    <div className="container">
      <header className="bg-header-sm md:bg-header-md lg:bg-header-xl bg-cover bg-no-repeat">
        <h1 className="text-base md:text-xl text-white font-bold">
          Frontend Mentor
          <small className="font-normal block">Feedback Board</small>
        </h1>
      </header>

      <aside className="order-2 lg:order-3 w-full md:w-2//3 lg:w-1//4 lg:mr-4 md:h-44 bg-indigo-lighter flex flex-col md:flex-row lg:flex-col">
        <Filter
          selectedTag={state.filter}
          handleChange={onTabChange}
        />
        <RoadmapStatus
          data={{
            planned: state.requests.planned.length,
            'in-progress': state.requests['in-progress'].length,
            live: state.requests.live.length,
          }}
        />
      </aside>
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

      {/* Sort Bar: */}
      <div className="bg-indigo-800 flex">
        <h2 className="hidden md:block text-white font-bold text-lg">
          {state.suggestions.length} Suggestion
          {state.suggestions.length > 1 ? 's' : ''}
        </h2>

        <Button type="button" variant="primary" handleClick={() => {}}>
          + Add Feedback
        </Button>
      </div>
      {/* Suggesions pannel: */}

      <main className="">
        {state.suggestions.map(fd => <Suggestion key={fd.id} data={fd} />)}
      </main>
      <footer className="">Some app coded by someone. 2022.</footer>
    </div>
  )
}
