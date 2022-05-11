import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useUser(username) {
  const [user, setUser] = useState()
  
  const getUser = async (username) => {
    try {
      const response = await axios(`/api/user/${username}`)
      setUser(response.data)
    } catch (error) {
      console.log(error)
      setUser(null)
    }
  }

  useEffect(() => {
    if (username) getUser(username)
  }, [username])

  return { user, setUser }
}
