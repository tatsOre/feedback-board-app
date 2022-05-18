import dashify from 'dashify'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useUser } from '../../context/userContext'
import { createFeedback, updateFeedback } from '../../services/firebase-client'

import Button from '../Buttons/Default'
import GoBackButton from '../Buttons/GoBack'
import DeleteFeedbackModal from './delete-feedback'

function getInitialState(data, edit) {
  let values = {
    title: data?.title || '',
    category: data?.category || 'Feature',
    description: data?.description || '',
  }
  if (edit) values = { ...values, status: data?.status }
  return {
    loading: false,
    errors: {},
    values,
  }
}

export default function Form({ data, edit }) {
  const [{ values, loading, errors }, setState] = useState(() =>
    getInitialState(data, edit)
  )

  const [isModalOpen, setIsModalOpen] = useState(false)

  const { user } = useUser()
  const router = useRouter()

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

    try {
      const slug = dashify(values.title)
      if (edit) {
        await updateFeedback({
          ...data,
          ...values,
          slug,
        })
      } else {
        await createFeedback({
          ...values,
          author: user.username,
          slug,
        })
      }
      router.push(`/feedback/detail/${slug}`)
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        errors: { submit: error.message },
      }))
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }))
    }
  }

  const InputError = () => (
    <span className="text-red-900">Can&quot;t be empty</span>
  )

  return (
    <main className="max-w-[calc(540px+3rem)] mx-auto p-6 md:pt-14 lg:pt-20">
      <GoBackButton />
      <form
        onSubmit={onSubmit}
        className={`form-${
          edit ? 'edit' : 'new'
        } bg-white text-[13px] p-6 pt-11 md:p-10 md:pt-12 mt-14 md:mt-10 lg:mt-16 flex flex-col rounded-10 relative`}
      >
        <h1 className="text-lg md:text-2xl text-indigo-800">
          {edit ? `Edit '${data.title}'` : 'Create New Feedback'}
        </h1>
        {errors && errors.submit && (
          <p className="font-bold text-red-900">Error {errors.submit}</p>
        )}
        <label className="font-bold text-indigo-800 mt-6 leading-5">
          Feedback Title{' '}
          <small className="block font-normal text-indigo-500">
            Add a short, descriptive headline
          </small>
          <input
            required
            value={values.title}
            name="title"
            onChange={onChange}
            className="w-full bg-indigo-100 rounded-5 px-4 py-2 mt-3"
          />
        </label>
        {errors.title ? <InputError /> : null}

        <label className="font-bold text-indigo-800 mt-6 leading-5">
          Category{' '}
          <small className="block font-normal text-indigo-500">
            Choose a category for your feedback
          </small>
          <select
            className="w-full py-2 pl-4 mt-3 border border-blue-500 rounded-5"
            value={values.category}
            name="category"
            onChange={onChange}
          >
            <option value="feature">Feature</option>
            <option value="ui">UI</option>
            <option value="ux">UX</option>
            <option value="enhancement">Enhancement</option>
            <option value="bug">Bug</option>
          </select>
        </label>

        {edit && (
          <label className="w-full font-bold text-indigo-800 mt-6 leading-5">
            Update Status{' '}
            <small className="block font-normal text-indigo-500">
              Change feedback state
            </small>
            <select
              className="w-full py-2 pl-4 mt-3 border border-blue-500 rounded-5"
              value={values.status}
              name="status"
              onChange={onChange}
            >
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
            required
            value={values.description}
            name="description"
            onChange={onChange}
            rows="4"
            className="bg-indigo-100 w-full rounded-5 px-4 py-2 mt-3"
          />
        </label>
        {errors.description ? <InputError /> : null}

        <div className="w-full flex flex-col mt-9 md:mt-6 md:flex-row-reverse space-y-4 md:space-y-0 ">
          <Button
            type="submit"
            variant="primary"
            label={edit ? 'Save Changes' : 'Add Feedback'}
          />
          <Button
            type="button"
            variant="secondary"
            label="Cancel"
            onClick={() => router.back()}
          />
          {edit && (
            <Button
              type="button"
              onClick={() => setIsModalOpen(true)}
              variant="danger"
              label="Delete"
            />
          )}
        </div>
      </form>

      {isModalOpen && (
        <DeleteFeedbackModal
          fdid={data?.id}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      )}
    </main>
  )
}
