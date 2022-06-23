import { useState } from 'react'
import { mutate } from 'swr'
import { AxiosAPIService } from '../lib/services/axios'
import useUser from '../lib/hooks/useUser'
import Button from './Buttons/Default'
import ErrorMessage from './Error/DefaultError'

function ReplyForm({ fdid, cmid, replyingTo, closeForm }) {
  const [reply, setReply] = useState({
    content: '',
    error: '',
  })

  const { user } = useUser()

  const onChange = ({ target }) =>
    setReply({ content: target.value, error: '' })

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!reply.content)
      return setReply((state) => ({ ...state, error: "Can't be empty!" }))

    try {
      const doc = await AxiosAPIService.post(`/feedbacks/${fdid}/reply`, {
        cmid,
        reply: {
          content: reply.content,
          replyingTo,
          user: user._id,
        },
      })
      mutate(`/feedbacks/slug?q=${doc.slug}`, doc, false)
      setReply({ content: '', error: '' })
      closeForm()
    } catch (error) {
      setReply((state) => ({ ...state, error: error.message }))
    }
  }
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="col-span-3 md:col-start-2 md:col-span-2 md:flex md:space-x-4 mt-6 md:mb-2"
      >
        <textarea
          value={reply.content}
          onChange={onChange}
          aria-label={`Add a new reply to username:${replyingTo}`}
          maxLength="250"
          placeholder={`Replying to @${replyingTo}`}
          className={`w-full mb-3 md:mb-0 p-2 md:p-4 bg-indigo-100 text-indigo-800 md:text-sm rounded-5 border cursor-pointer ${
            reply.error
              ? 'border-red-900'
              : 'border-indigo-100 hover:border-blue-900'
          }`}
        />
        <Button type="submit" disabled={Boolean(reply.error)}>
          Post Reply
        </Button>
      </form>
      {reply.error && (
        <div className="col-span-3 md:col-start-2 md:col-span-2">
          <ErrorMessage text={reply.error} />
        </div>
      )}
    </>
  )
}

export default ReplyForm
