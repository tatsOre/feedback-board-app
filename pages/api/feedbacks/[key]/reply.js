import dbConnect from 'lib/db/dbConnect'
import Feedback from 'models/Feedback'

export default async function handler(req, res) {
  const {
    query: { key },
    method,
    body,
  } = req

  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        await Feedback.findByIdAndUpdate(
          key,
          {
            $addToSet: { [`comments.$[outer].replies`]: body.reply },
          },
          {
            arrayFilters: [{ 'outer._id': body.cmid }],
          }
        ).clone()
        //todo: check how to return new doc with compound query
        const doc = await Feedback.findById(key)

        if (!doc) {
          return res.status(400).json({ success: false })
        }
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
