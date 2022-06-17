import mongoose from 'mongoose'
import dbConnect from '../../../../lib/db/dbConnect'
import Feedback from '../../../../models/Feedback'
import User from '../../../../models/User'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        const { fdid } = req.body

        const user = await User.findByIdAndUpdate(id, {
          $pull: { upvoted: mongoose.Types.ObjectId(fdid) },
        })

        if (!user) {
          return res
            .status(400)
            .json({ success: false, data: 'User does not exist' })
        }

        const doc = await Feedback.findByIdAndUpdate(fdid, {
          $inc: { upvotes: -1 },
        })

        if (!doc) {
          return res
            .status(400)
            .json({ success: false, data: 'Document does not exist' })
        }

        res.status(200).json({ success: true, data: 'Done' })
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
