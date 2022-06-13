import dashify from 'dashify'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { createFeedback, updateFeedback } from '../services/firebase-client'
import useUser from 'hooks/useUser'
import Button from './Buttons/Default'
import GoBackButton from './Buttons/GoBack'
import DropdownSelect from './Select'
import DeleteFeedbackModal from './DeleteFeedback'
import ErrorMessage from './Error/DefaultError'

import { CATEGORY_OPTIONS, STATUS_OPTIONS } from '../constants'

const getInitialState = (data, edit) => {
  let values = {
    title: data?.title || '',
    category: data?.category || 'feature',
    description: data?.description || '',
  }
  if (edit) values = { ...values, status: data?.status }

  return {
    loading: false,
    error: {},
    values,
  }
}

const useFormValidation = (data) => {
  let errors = {}
  let isFormValid = true

  for (const key in data) {
    if (!data[key]) {
      isFormValid = false
      errors[key] = `${key} can't be empty`
    }
  }
  return { isFormValid, errors }
}

export default function Form({ data, edit }) {
  const [{ values, loading, error }, setState] = useState(() =>
    getInitialState(data, edit)
  )

  const [isModalOpen, setModalOpen] = useState(false)
  const { user } = useUser()
  const router = useRouter()

  const handleCloseModal = () => setModalOpen(false)

  const handleOpenModal = () => setModalOpen(true)

  const onChange = ({ target }) => {
    setState((state) => ({
      ...state,
      error: { ...state.error, [target.name]: '' },
      values: { ...state.values, [target.name]: target.value },
    }))
  }

  const onCategoryChange = (value) => {
    setState((state) => ({
      ...state,
      values: { ...state.values, category: value },
    }))
  }

  const onStatusChange = (value) => {
    setState((state) => ({
      ...state,
      values: { ...state.values, status: value },
    }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    const { isFormValid, errors } = useFormValidation(values)
    if (!isFormValid) {
      return setState((state) => ({ ...state, error: errors }))
    }

    try {
      const slug = dashify(values.title)
      setState((state) => ({ ...state, loading: true }))
      if (edit) {
        await updateFeedback({ ...data, ...values, slug })
      } else {
        await createFeedback({ ...values, author: user.userId, slug })
      }
      router.push(`/feedback/detail/${slug}`)
    } catch (err) {
      console.log(err) // send ErrorAlert
    } finally {
      setState((state) => ({ ...state, loading: false }))
    }
  }

  return (
    <main className="max-w-[calc(540px+3rem)] mx-auto p-6 md:pt-14 lg:pt-20 text-indigo-500 font-normal">
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

        <h2 className="text-indigo-800 mt-6 leading-5">Feedback Title</h2>
        <label>
          Add a short, descriptive headline
          <input
            name="title"
            maxLength="200"
            value={values.title}
            onChange={onChange}
            className={`h-12 w-full rounded-5 px-4 py-2 mt-3 bg-indigo-100 border hover:cursor-pointer ${
              error.title
                ? 'border-red-900'
                : 'border-indigo-100 hover:border-blue-900'
            }`}
          />
        </label>
        {error.title && (
          <ErrorMessage text={error.title} style={{ marginTop: '5px' }} />
        )}

        <h2 className="text-indigo-800 mt-6 leading-5">Category</h2>
        <DropdownSelect
          options={CATEGORY_OPTIONS}
          selected={values.category}
          onChange={onCategoryChange}
          label="Choose a category for your feedback"
        />

        {edit && (
          <>
            <h2 className="text-indigo-800 mt-6 leading-5">Update Status</h2>
            <DropdownSelect
              options={STATUS_OPTIONS}
              selected={values.status}
              onChange={onStatusChange}
              label="Change feedback state"
            />
          </>
        )}

        <h2 className="text-indigo-800 mt-6 leading-5">Feedback Detail</h2>

        <label>
          Include any specific comments on what should be improved, added, etc.
          <textarea
            name="description"
            rows="4"
            maxLength="200"
            value={values.description}
            onChange={onChange}
            className={`w-full rounded-5 px-4 py-2 mt-3 bg-indigo-100 border hover:cursor-pointer ${
              error.description
                ? 'border-red-900'
                : 'border-indigo-100 hover:border-blue-900'
            }`}
          />
        </label>
        {error.description && <ErrorMessage text={error.description} />}

        <div className="w-full flex flex-col mt-9 md:mt-6 md:flex-row-reverse space-y-4 md:space-y-0 ">
          <Button type="submit" variant="primary">
            {edit ? 'Save Changes' : 'Add Feedback'}
          </Button>
          <Button variant="secondary" onClick={() => router.back()}>
            Cancel
          </Button>
          {edit && (
            <Button variant="danger" onClick={handleOpenModal}>
              Delete
            </Button>
          )}
        </div>
      </form>

      {isModalOpen && (
        <DeleteFeedbackModal fdid={data?.id} closeModal={handleCloseModal} />
      )}
    </main>
  )
}
