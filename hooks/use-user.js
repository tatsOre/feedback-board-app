import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useUser(username) {
  const [user, setUser] = useState()

  useEffect(() => {
    async function getUser(username) {
      const response = await axios(`/api/user/${username}`)
      console.log(response)

      if (response.statusText === 'OK') {
        setUser(response.data)
      }
    }

    if (username) getUser(username)
  }, [username])

  return { user, setUser }
}
