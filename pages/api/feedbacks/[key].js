import dbConnect from '../../../lib/db/dbConnect'
import mongoose from 'mongoose'
import Feedback from 'models/Feedback'
import User from 'models/User'

export default async function handler(req, res) {
  const {
    query: { key, q },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      // http://localhost:3000/api/feedbacks/slug?q=hola
      try {
        const doc = await Feedback.findOne({ [key]: q })
          .populate({
            path: 'comments',
            populate: {
              path: 'user',
              model: 'User',
              select: 'image name username',
            },
          })
          .populate({
            path: 'comments.replies',
            populate: {
              path: 'user',
              model: 'User',
              select: 'image name username',
            },
          })
        if (!doc) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: doc })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT':
      try {
        const doc = await Feedback.findByIdAndUpdate(key, req.body, {
          new: true,
          runValidators: true,
        })
        if (!doc) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: doc })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE':
      try {
        const user = await User.findByIdAndUpdate(req.body.user, {
          $pull: {
            requests: mongoose.Types.ObjectId(key),
          },
        })
        // todo: remove from upvotes
        if (!user) {
          return res.status(400).json({ success: false })
        }

        const doc = await Feedback.deleteOne({ _id: key })

        if (!doc) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
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


/*

       const doc = await Feedback.updateOne(
          { _id: fdid },
          { $inc: { upvotes: isUpvoted ? -1 : 1 } }
        )

*/