import { useRouter } from 'next/router'
import { AxiosAPIService } from '../lib/services/axios'
import useUser from '../lib/hooks/useUser'
import Button from './Buttons/Default'

export default function DeleteFeedbackModal({ fdid, closeModal }) {
  const { user } = useUser()
  const router = useRouter()

  const handleDeleteFeedback = async () => {
    try {
      await AxiosAPIService.delete(fdid, user.id)
      router.push('/')
    } catch (error) {
      console.log(error) // Send Alert
    }
  }

  return (
    <div className="dialog-backdrop">
      <div
        id="alert_dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog_label"
        aria-describedby="dialog_desc"
      >
        <h2
          id="dialog_label"
          className="text-center text-xl text-indigo-800 mb-2"
        >
          Delete feedback
        </h2>

        <p id="dialog_desc" className="text-center text-indigo-500">
          Are you sure you want to delete this feedback request? This can&#39;t
          be undone.
        </p>

        <div className="dialog_form_actions flex justify-evenly mt-6">
          <Button variant="secondary" onClick={closeModal}>
            No, cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteFeedback}>
            Yes, delete
          </Button>
        </div>
      </div>
    </div>
  )
}
