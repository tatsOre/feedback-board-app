import axios from 'axios'
import dashify from 'dashify'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Button from '../Button'

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

  const router = useRouter()

  useEffect(() => {
    document.title = edit
      ? `Edit - ${values.title}`
      : 'Feedback Board App - Add Feedback'
  }, [])

  const onChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({
      ...prevState,
      values: { ...prevState.values, [name]: value },
    }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setState((prevState) => ({ ...prevState, loading: true }))
    const response = await axios({
      url: edit ? `/api/feedback/${data.id}` : `/api/feedback`,
      method: edit ? 'put' : 'post',
      data: {
        ...values,
        slug: dashify(values.title),
      },
    })

    setState((prevState) => ({ ...prevState, loading: false }))
    if (response.statusText === 'OK') {
      router.push(`/${dashify(values.title)}`)
    } else {
      setState((prevState) => ({ ...prevState, error: 'Ups' }))
    }
  }
  return (
    <main className="p-6">
      <a>Go Back</a>
      <form
        onSubmit={onSubmit}
        className={`form-${
          edit ? 'edit' : 'create'
        } bg-white flex flex-col rounded-10 p-6 text-small relative`}
      >
        <h1 className="text-lg md:text-2xl text-indigo-800">
          {edit ? `Edit '${data.title}'` : 'Create New Feedback'}
        </h1>

        <label className="font-bold text-indigo-800 mt-6 leading-5">
          Feedback Title{' '}
          <small className="block font-normal text-indigo-500">
            Add a short, descriptive headline
          </small>
          <input
            value={values.title}
            name="title"
            onChange={onChange}
            className="w-full bg-indigo-100 rounded-5 px-4 py-2 mt-3"
          />
        </label>

        <label className="font-bold text-indigo-800 mt-6 leading-5">
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
          <label className="font-bold text-indigo-800 mt-6 leading-5">
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

        <label className="font-bold text-indigo-800 mt-6 leading-5">
          Feedback Detail{' '}
          <small className="block font-normal text-indigo-500">
            Include any specific comments on what should be improved, added,
            etc.
          </small>
          <textarea
            value={values.description}
            name="description"
            onChange={onChange}
            rows="4"
            className="bg-indigo-100 w-full rounded-5 px-4 py-2 mt-3"
          />
        </label>

        <Button
          type="submit"
          variant="primary"
          label={edit ? 'Save Changes' : 'Add Feedback'}
          style={{ marginTop: '2rem', marginBottom: '1rem' }}
        />
        <Button
          type="button"
          variant="secondary"
          label="Cancel"
          onClick={() => router.back()}
          style={{ marginBottom: '1rem' }}
        />
        {edit && <Button type="button" variant="danger" label="Delete" />}
      </form>
    </main>
  )
}
