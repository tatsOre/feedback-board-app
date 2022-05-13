import { createContext, useContext, useEffect, useState } from 'react'
import { createFirebaseApp } from '../firebase/clientApp'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const UserContext = createContext()

export default function CreateUserContext({ children }) {
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
      console.log('', 'Getting user in context')
    setUser({
      id: 'YIUtfVspL7sqQ8Uhsh7c',
      image: 'user-images/image-jesse.jpg',
      name: 'Jesse Ronda',
      username: 'jesse10930',
      upvotes: [1],
    })
    setLoadingUser(false)
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
