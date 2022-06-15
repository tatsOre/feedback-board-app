import useUser from 'lib/hooks/useUser'
import { useState } from 'react'


//import useFeedbackData from '../hooks/useFeedbackData'

//import { updateFeedbackReplies } from '../services/firebase-client'

import Button from './Buttons/Default'
import ErrorMessage from './Error/DefaultError'

function ReplyForm({ comment, cmid, closeForm }) {
  const [reply, setReply] = useState({
    content: '',
    error: '',
  })

  //const { data, setData } = useFeedbackData()
  const { user } = useUser()

  const onChange = ({ target }) =>
    setReply({ content: target.value, error: '' })

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!reply.content)
      return setReply((state) => ({ ...state, error: "Can't be empty!" }))

    const newReply = {
      content: reply.content,
      replyingTo: comment.user.username,
      user: {
        image: user.image,
        name: user.name,
        username: user.username,
      },
    }
    try {
      //const updatedComments = await updateFeedbackReplies(data, newReply, cmid)
      //setData((data) => ({ ...data, comments: updatedComments }))
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
          aria-label={`Add a new reply to username:${comment.user.username}`}
          maxLength="250"
          placeholder={`Replying to @${comment.user.username}`}
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
