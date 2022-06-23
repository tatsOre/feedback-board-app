import dashify from 'dashify'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { mutate } from 'swr'

import Button from './Buttons/Default'
import GoBackButton from './Buttons/GoBack'
import DropdownSelect from './Select'
import DeleteFeedbackModal from './DeleteFeedback'
import ErrorMessage from './Error/DefaultError'

import { CATEGORY_OPTIONS, STATUS_OPTIONS } from '../lib/constants'
import useUser from '../lib/hooks/useUser'
import { AxiosAPIService } from '../lib/services/axios'

const useFormValidation = (data) => {
  let errors = {}
  let isFormValid = true

  if (!data.title) {
    errors['title'] = "Title can't be empty"
  }

  if (!data.description) {
    errors['description'] = "Description can't be empty"
  }
  return { isFormValid, errors }
}

export default function Form({ data, edit }) {
  const [{ values, isLoading, error }, setState] = useState({
    values: { ...data },
    isLoading: false,
    error: {},
  })
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

    let doc = {}

    try {
      const slug = dashify(values.title)
      const payload = { ...values, slug }

      if (edit) {
        doc = await AxiosAPIService.update(data._id, payload)
      } else {
        doc = await AxiosAPIService.post('/feedbacks', {
          ...payload,
          author: user.id,
        })
      }
      mutate(`/feedbacks/slug?q=${doc.slug}`, doc, false)
      router.push(`/feedback/${doc.slug}/detail`)
    } catch (error) {
      console.log(error) // Create Alert
    } finally {
      setState((state) => ({ ...state, isLoading: false }))
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
          <Button type="submit" disabled={isLoading}>
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
        <DeleteFeedbackModal fdid={data._id} closeModal={handleCloseModal} />
      )}
    </main>
  )
}
