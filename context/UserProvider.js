import { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { createFirebaseApp } from '../firebase/clientApp'
import { getUserByField } from '../services/firebase-client'

export const UserContext = createContext()

export default function UserProvider({ children }) {
  const [user, setUser] = useState()
  const [loadingUser, setLoadingUser] = useState(true)
console.log('trying to reach me')
  const getLoggedInUser = async (uid) => {
    try {
      const data = await getUserByField('userId', uid)
      setUser(data)
    } catch (err) {
      setUser(null)
    } finally {
      setLoadingUser(false)
    }
  }

  const logInMock = () => {
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
    logInMock()
    return () => setUser(null)
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  )
}


