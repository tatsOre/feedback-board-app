import { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { createFirebaseApp } from '../firebase/clientApp'
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'

export const UserContext = createContext()

export default function CreateUserContext({ children }) {
  const [user, setUser] = useState()
  const [loadingUser, setLoadingUser] = useState(true)

  const getLoggedInUser = async (uid) => {
    const app = createFirebaseApp()
    const db = getFirestore(app)

    const q = query(collection(db, 'users'), where('userId', '==', uid))
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      setUser(null)
    } else {
      const docs = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setUser(docs[0])
    }
    setLoadingUser(false)
  }

  const signIn = () => {
    const app = createFirebaseApp()
    const auth = getAuth()
    signInWithEmailAndPassword(
      auth,
      process.env.NEXT_PUBLIC_USER_EMAIL,
      process.env.NEXT_PUBLIC_USER_PASSWORD
    )
      .then((userCredential) => {
        getLoggedInUser(userCredential.user.uid)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    signIn()
    return () => setUser(null)
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
