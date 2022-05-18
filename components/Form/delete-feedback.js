import { useRouter } from 'next/router'
import { useUser } from '../../context/userContext'
import { deleteFeedback } from '../../services/firebase-client'
import Button from '../Buttons/Default'

export default function DeleteFeedbackModal({ fdid, setShowModal }) {
  const { user } = useUser()
  const router = useRouter()

  const handleDeleteFeedback = async () => {
    try {
      await deleteFeedback(fdid, user)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div class="dialog-backdrop">
      <div
        id="alert_dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog_label"
        aria-describedby="dialog_desc"
      >
        <h2 id="dialog_label" class="text-center text-indigo-800">
          Confirmation
        </h2>

        <p id="dialog_desc" class="text-center text-indigo-500">
          Are you sure you want to delete this feedback request?
        </p>

        <div class="dialog_form_actions">
          <Button
            type="button"
            variant="secondary"
            label="Cancel"
            onClick={() => setShowModal(false)}
          />
          <Button
            type="button"
            variant="danger"
            label="Delete"
            aria-controls="notes"
            onClick={handleDeleteFeedback}
          />
        </div>
      </div>
    </div>
  )
}
