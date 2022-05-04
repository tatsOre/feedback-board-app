import admin from '../../../firebase/nodeApp'
/*
  await axios.get(`/api/feedback/${id}`);
  await axios.delete(`/api/feedback/${id}`);
  await axios.put(`/api/feedback/${id}`, {
    slug: 'foo-bar',
    title: 'Foo Bar',
    ...
  });
*/

export default async (req, res) => {
  const {
    query: { id },
    method,
    body,
  } = req
  const db = admin.firestore()

  switch (method) {
    case 'GET':
      const doc = await db.collection('feedbacks').doc(id).get()
      if (!doc.exists) {
        res.status(404).end('The document does not exist')
      } else {
        res.status(200).json(doc.data())
      }
      break

    case 'PUT':
      await db
        .collection('feedbacks')
        .doc(id)
        .update({
          ...body,
          updated: new Date().toISOString(),
        })
      res.status(200).end()
      break

    case 'DELETE':
      await db.collection('feedbacks').doc(id).delete()
      res.status(200).end()
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
