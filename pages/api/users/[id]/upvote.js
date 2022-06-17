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

        const user = await User.findById(id)

        if (!user) {
          return res
            .status(400)
            .json({ success: false, data: 'User does not exist' })
        }

        const isUpvoted = user.upvoted.includes(fdid)

        const doc = await Feedback.findByIdAndUpdate(
          fdid,
          {
            $inc: { upvotes: isUpvoted ? -1 : 1 },
          },
          { new: true }
        )

        if (!doc) {
          return res
            .status(400)
            .json({ success: false, data: 'Document does not exist' })
        }

        const operator = isUpvoted ? '$pull' : '$addToSet'

        await user.updateOne({
          [operator]: { upvoted: mongoose.Types.ObjectId(fdid) },
        })

        res.status(200).json({ success: true, data: doc })
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
