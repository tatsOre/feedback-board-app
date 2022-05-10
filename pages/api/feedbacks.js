import { getAllFeedbacks } from "../../services/firebase";

/* await axios.get('/api/feedbacks') */
export default async function allFeedbacksHandler (req, res) {
    try {
        response = await getAllFeedbacks()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).end()
    }
}
