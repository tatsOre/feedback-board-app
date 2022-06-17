import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

import { AxiosAPIService } from '../services/axios'

export default function UserProvider({ children }) {
  const [user, setUser] = useState()

  const [loadingUser, setLoadingUser] = useState(true)

  const getLoggedInUser = async () => {
    try {
      const doc = await AxiosAPIService.get('/users/62a8912aec3546861ad8b8ed')
      setUser(doc)
    } catch (err) {
      setUser(null)
    } finally {
      setLoadingUser(false)
    }
  }

  useEffect(() => {
    getLoggedInUser()
    return () => setUser(null)
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  )
}
