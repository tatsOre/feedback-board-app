import { createFirebaseApp } from '../firebase/clientApp'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

export async function createFeedback(data) {
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

export async function updateFeedback(data) {
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
