import dashify from 'dashify'
import { FirebaseError } from 'firebase/app'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useUser } from '../../context/UserProvider'
import { createFeedback, updateFeedback } from '../../services/firebase-client'

import Button from '../Buttons/Default'
import GoBackButton from '../Buttons/GoBack'
import ErrorAlert from '../Error'
import DropdownSelect from '../Select'
import DeleteFeedbackModal from '../DeleteFeedback'

import { CATEGORY_OPTIONS, STATUS_OPTIONS } from '../../constants'

function getInitialState(data, edit) {
  let values = {
    title: data?.title || '',
    category: data?.category || 'feature',
    description: data?.description || '',
  }
  if (edit) values = { ...values, status: data?.status }
  return {
    loading: false,
    error: null,
    values,
  }
}

export default function Form({ data, edit }) {
  const [{ values, loading, error }, setState] = useState(() =>
    getInitialState(data, edit)
  )

  const [isModalOpen, setIsModalOpen] = useState(false)

  const { user } = useUser()
  const router = useRouter()

  const onChange = (event) => {
    const { name, value } = event.target
    setState((state) => ({
      ...state,
      values: { ...state.values, [name]: value },
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
    setState((state) => ({ ...state, loading: true }))

    try {
      const slug = dashify(values.title)
      if (edit) {
        await updateFeedback({ ...data, ...values, slug })
      } else {
        await createFeedback({ ...values, author: user.userId, slug })
      }
      router.push(`/feedback/detail/${slug}`)
    } catch (err) {
      setState((state) => ({
        ...state,
        error: { name: err.name, message: err.message },
      }))
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
        {error && <ErrorAlert error={error} />}

        <h2 className="font-bold text-indigo-800 mt-6 leading-5">
          Feedback Title
        </h2>
        <label>
          Add a short, descriptive headline
          <input
            required
            value={values.title}
            name="title"
            onChange={onChange}
            className="w-full h-12 bg-indigo-100 rounded-5 px-4 py-2 mt-3 border border-indigo-100 hover:border-blue-900 hover:cursor-pointer"
          />
        </label>

        <h2 className="font-bold text-indigo-800 mt-6 leading-5">Category</h2>

        <DropdownSelect
          options={CATEGORY_OPTIONS}
          selected={values.category}
          onChange={onCategoryChange}
          label="Choose a category for your feedback"
        />

        {edit && (
          <>
            <h2 className="font-bold text-indigo-800 mt-6 leading-5">
              Update Status
            </h2>
            <DropdownSelect
              options={STATUS_OPTIONS}
              selected={values.status}
              onChange={onStatusChange}
              label="Change feedback state"
            />
          </>
        )}

        <h2 className="font-bold text-indigo-800 mt-6 leading-5">
          Feedback Detail
        </h2>

        <label>
          Include any specific comments on what should be improved, added, etc.
          <textarea
            required
            value={values.description}
            name="description"
            onChange={onChange}
            rows="4"
            className="bg-indigo-100 w-full rounded-5 px-4 py-2 mt-3 border border-indigo-100 hover:border-blue-900 hover:cursor-pointer"
          />
        </label>

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
              variant="danger"
              label="Delete"
              onClick={() => setIsModalOpen(true)}
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
