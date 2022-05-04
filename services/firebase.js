import admin from '../firebase/nodeApp'

export async function getAllFeedbacks() {
  const db = admin.firestore()
  const result = await db.collection('feedbacks').get()
  const docs = result.docs.map((fd) => ({
    id: fd.id,
    ...fd.data(),
  }))
  const schema = {
    'in-progress': [],
    live: [],
    planned: [],
    suggestion: [],
  }
  return docs.reduce((acc, req) => {
    let status = req.status
    acc[status] = acc[status].length ? [...acc[status], req] : [req]
    return acc
  }, schema)
}

export async function getFeedbackById(id) {
  const db = admin.firestore()
  const doc = await db.collection('feedbacks').doc(id).get()
  if (doc.exists) {
    return doc.data()
  }
  throw new Error('The document does not exist')
}
