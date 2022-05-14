import { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createFirebaseApp } from '../firebase/clientApp'
import { doc, getDoc, getFirestore } from 'firebase/firestore'

export const UserContext = createContext()

export default function CreateUserContext({ children }) {
  const [user, setUser] = useState()
  const [loadingUser, setLoadingUser] = useState(true)

  const getLoggedInUser = async (uid) => {
    const app = createFirebaseApp()
    const db = getFirestore(app)
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const doc = {...docSnap.data(), id: docSnap.id}
      setUser(doc)
    } else {
      setUser(null)
    }

    setLoadingUser(false)
  }

  useEffect(() => {
    getLoggedInUser('YIUtfVspL7sqQ8Uhsh7c')
    return () => setUser(null)
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
