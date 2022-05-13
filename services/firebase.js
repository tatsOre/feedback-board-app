import admin from '../firebase/nodeApp'

export async function getUserById(id) {
  const db = admin.firestore()
  const doc = await db.collection('users').doc(id).get()
  if (doc.exists) {
    return { id: doc.id, ...doc.data() }
  }
  throw new Error('The user does not exist')
}

export async function getUserByUsername(username) {
  const db = admin.firestore()
  const snapshot = await db
    .collection('users')
    .where('username', '==', username)
    .get()

  if (!snapshot.empty) {
    const docs = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    return docs[0]
  }
  throw new Error('The user does not exist')
}

export async function getAllFeedbacks() {
  const db = admin.firestore()
  const result = await db
    .collection('feedbacks')
    .orderBy('upvotes', 'desc')
    .get()
  const docs = result.docs.map((fd) => ({
    id: fd.id,
    ...fd.data(),
  }))

  const schema = {
    planned: [],
    'in-progress': [],
    live: [],
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
    return { id: doc.id, ...doc.data() }
  }
  throw new Error('The document does not exist')
}

export async function getFeedbackByField(field, value) {
  const db = admin.firestore()
  const snapshot = await db
    .collection('feedbacks')
    .where(field, '==', value)
    .get()

  if (!snapshot.empty) {
    const docs = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    return docs[0]
  }
  throw new Error('The document does not exist')
}
