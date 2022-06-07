import { createFirebaseApp } from '../firebase/clientApp'
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

/**
 * Create a new document in the 'feedbacks' collection
 * @param   {Object}  data  Form input values
 * @returns {Object}
 *    Error:   if the document already exists | values are missing
 *    Success: id and slug of the newly document
 */
export async function createFeedback(data) {
  if (!data.title || !data.description) {
    throw new Error('Missing title or description')
  }

  const app = createFirebaseApp()
  const db = getFirestore(app)
  const q = query(collection(db, 'feedbacks'), where('slug', '==', data.slug))
  const snapshot = await getDocs(q)

  if (!snapshot.empty) {
    throw new Error('The document already exist')
  }
  const docRef = await addDoc(collection(db, 'feedbacks'), {
    ...data,
    status: 'suggestion',
    upvotes: 0,
    comments: [],
    created: new Date().toISOString(),
  }).catch((error) => {
    throw new Error(error.message)
  })
  return { id: docRef.id, slug: data.slug }
}

/**
 * Update a feedback document
 * @param   {Object}  data  Newly provided data
 * @returns {Object}
 *    Error:   if the document does not exist | values are missing | Firestore error
 *    Success: nothing
 */
export async function updateFeedback(data) {
  if (!data.title || !data.description) {
    throw new Error('Missing title or description')
  }

  const app = createFirebaseApp()
  const db = getFirestore(app)
  const docRef = doc(db, 'feedbacks', data.id)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    throw new Error('The document does not exist')
  }
  await updateDoc(docRef, {
    ...data,
    updated: new Date().toISOString(),
  }).catch((error) => {
    throw new Error(error.message)
  })
}

/**
 * Get document by field
 * @param   {String}  field  Could be slug or title
 * @param   {String}  value  Value to look for
 * @returns {Object}
 *    Error:   if the document does not exist
 *    Success: feedback document with Firestore ID
 */
export async function getFeedbackByField(field, value) {
  const app = createFirebaseApp()
  const db = getFirestore(app)
  const q = query(collection(db, 'feedbacks'), where(field, '==', value))
  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    throw new Error('The document does not exist')
  }
  const docs = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  return docs[0]
}

/**
 * Get document by id
 * @param   {String}  id  Feedback Document ID
 * @returns {Object}
 *    Error:   if the document does not exist
 *    Success: Firestore Document
 */
export async function getFeedbackById(fdid) {
  const app = createFirebaseApp()
  const db = getFirestore(app)
  const docRef = doc(db, 'feedbacks', fdid)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    throw new Error('The document does not exist')
  }
  return { ...docSnap.data(), id: docSnap.id }
}

export async function updateFeedbackComments(data, content, user) {
  const app = createFirebaseApp()
  const db = getFirestore(app)
  const fdRef = doc(db, 'feedbacks', data.id)

  const comment = {
    id: data.comments.length + 1,
    content,
    user: {
      image: user.image,
      name: user.name,
      username: user.username,
    },
  }

  let updatedDoc = null
  try {
    await updateDoc(fdRef, {
      updated: new Date().toISOString(),
      comments: arrayUnion(comment),
    })
    updatedDoc = await getFeedbackById(data.id)
  } catch (error) {
    console.log(error)
  }
  return updatedDoc
}

export async function updateFeedbackReplies(data, reply, cmid) {
  const app = createFirebaseApp()
  const db = getFirestore(app)
  const fdRef = doc(db, 'feedbacks', data.id)

  const updatedComments = data.comments.map((c) => {
    if (c.id === cmid) {
      return { ...c, replies: c.replies ? [...c.replies, reply] : [reply] }
    }
    return c
  })

  await updateDoc(fdRef, {
    updated: new Date().toISOString(),
    comments: updatedComments,
  }).catch((error) => {
    throw new Error(error.message)
  })
  return updatedComments
}

export async function deleteFeedback(fdid, user) {
  const app = createFirebaseApp()
  const db = getFirestore(app)

  const docRef = doc(db, 'feedbacks', fdid)
  await deleteDoc(docRef).catch((error) => {
    throw new Error(error.message)
  })
  await updateDoc(doc(db, 'users', user.id), {
    upvoted: arrayRemove(fdid),
  }).catch((error) => {
    throw new Error(error.message)
  })
}
