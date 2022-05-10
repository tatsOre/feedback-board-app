import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useUser() {
  const [user, setUser] = useState(null)
  const username = 'jesse10930'

  useEffect(() => {
    async function getUser(username) {
      const response = await axios(`/api/user/${username}`)

      if (response.statusText === 'OK') {
        setUser(response.data)
      }
    }

    if (username) getUser(username)
  }, [username])

  return { user, setUser }
}
