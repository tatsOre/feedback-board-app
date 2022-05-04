import axios from 'axios'
import dashify from 'dashify'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Form({ data, edit }) {
  const getInitialState = (data) => {
    let values = {
      title: data?.title || '',
      category: data?.category || '',
      description: data?.description || '',
    }
    if (edit) values = { ...values, status: data?.status }
    return {
      loading: false,
      error: false,
      values,
    }
  }

  const [{ values, loading, error }, setState] = useState(() =>
    getInitialState(data)
  )

  const onChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({
      ...prevState,
      values: { ...prevState.values, [name]: value },
    }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    console.log(values)
    /*     const response = await axios.put(`/api/feedback/${id}`, {
      ...state,
      slug: dashify(state.title),
    })

    console.log(response) */
  }
  return (
    <main className="p-6">
      <a>Go Back</a>
      <form
        onSubmit={onSubmit}
        className="bg-white flex flex-col p-6 pt-8 text-small"
      >
        <h1 className="text-lg md:text-2xl text-indigo-800">
          {edit ? `Edit '${data.title}'` : 'Create New Feedback'}
        </h1>

        <label className="font-bold text-indigo-800 mb-8">
          Feedback Title{' '}
          <small className="block font-normal text-indigo-500">
            Add a short, descriptive headline
          </small>
          <input
            value={values.title}
            name="title"
            onChange={onChange}
            className="w-full bg-indigo-100 rounded-5 my-3 px-4 py-2"
          />
        </label>

        <label className="font-bold text-indigo-800 mb-8">
          Category{' '}
          <small className="block font-normal text-indigo-500">
            Choose a category for your feedback
          </small>
          <select value={values.category} name="category" onChange={onChange}>
            <option value="feature">Feature</option>
            <option value="ui">UI</option>
            <option value="ux">UX</option>
            <option value="enhancement">Enhancement</option>
            <option value="bug">Bug</option>
          </select>
        </label>

        {edit && (
          <label className="font-bold text-indigo-800 mb-8">
            Update Status{' '}
            <small className="block font-normal text-indigo-500">
              Change feedback state
            </small>
            <select value={values.status} name="status" onChange={onChange}>
              <option value="suggestion">Suggestion</option>
              <option value="planned">Planned</option>
              <option value="in-progress">In-Progress</option>
              <option value="live">Live</option>
            </select>
          </label>
        )}

        <label className="font-bold text-indigo-800 mb-8">
          Feedback Detail{' '}
          <small className="block font-normal text-indigo-500">
            Include any specific comments on what should be improved, added,
            etc.
          </small>
          <textarea
            value={values.description}
            name="description"
            onChange={onChange}
            className="bg-indigo-100 w-full rounded-5 my-3 px-4 py-2"
          />
        </label>

        <button type="button">Cancel</button>
        <button type="submit">Edit Feedback</button>
      </form>
    </main>
  )
}
