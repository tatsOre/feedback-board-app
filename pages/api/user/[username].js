import admin from '../../../firebase/nodeApp'

export default async function userHandler(req, res) {
  const {
    query: { username },
    method,
  } = req
  const db = admin.firestore()

  switch (method) {
    case 'GET':
      const snapshot = await db
        .collection('users')
        .where('username', '==', username)
        .get()

      if (snapshot.empty) {
        res.status(404).end('The user does not exist')
      } else {
        const result = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        res.status(200).json(result[0])
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
