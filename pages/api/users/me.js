import dbConnect from '../../../lib/db/dbConnect'
import User from '../../../models/User'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const doc = await User.findOne({ username: 'velvetround' })
        if (!doc) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: doc })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
