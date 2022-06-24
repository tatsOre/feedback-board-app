import { useState } from 'react'
import { mutate } from 'swr'
import { AxiosAPIService } from '../lib/services/axios'
import Button from './Buttons/Default'
import ErrorMessage from './Error/DefaultError'

export default function AddComment({ data, user }) {
  const [{ content, error }, setComment] = useState({
    content: '',
    error: '',
  })

  const charsLeft = 250 - content.length

  const onChange = ({ target }) =>
    setComment({ content: target.value, error: '' })

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!content)
      return setComment((state) => ({ ...state, error: "Can't be empty!" }))

    try {
      const comments = [...data.comments, { content, user: user._id }]

      const doc = await AxiosAPIService.update(data._id, { comments })

      mutate(`/feedbacks/slug?q=${data.slug}`, doc, false)

      setComment({ content: '', error: '' })
    } catch (error) {
      setComment((state) => ({ ...state, error: error.message }))
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-10 p-6 md:px-8 mt-6 flex flex-wrap justify-between items-center"
    >
      <h2 className="w-full text-indigo-800 text-lg mb-6">Add Comment</h2>
      <textarea
        value={content}
        onChange={onChange}
        className={`w-full text-[13px] md:text-[15px] text-indigo-800 bg-indigo-100 rounded-5 p-4 mb-2 ${
          error ? 'border-red-900' : 'border-indigo-100 hover:border-blue-900'
        } border cursor-pointer`}
        placeholder="Type your comment here"
        rows="3"
        maxLength="250"
      />
      {error && <ErrorMessage text={error} style={{ width: '100%' }} />}

      <p className="text-indigo-500 text-[13px]">
        {charsLeft} character{charsLeft > 1 || !charsLeft ? 's' : ''} left
      </p>
      <Button type="submit">Post Comment</Button>
    </form>
  )
}
