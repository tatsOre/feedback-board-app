import dbConnect from '../../../lib/db/dbConnect'
import Feedback from 'models/Feedback'
import User from 'models/User'
import { reduceFeedbacksData } from 'lib/utils'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const docs = await Feedback.find({})
          .sort({ upvotes: 'desc' })
          .select('title description category comments upvotes slug status')

        const response = reduceFeedbacksData(docs)

        res.status(200).json({ success: true, data: response })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break

    case 'POST':
      try {
        const doc = await Feedback.create(req.body)

        await User.findByIdAndUpdate(req.body.author, {
          $addToSet: {
            requests: doc._id,
          },
        })

        res.status(201).json({ success: true, data: doc })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
