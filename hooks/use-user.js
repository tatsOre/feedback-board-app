import { useEffect, useState } from 'react'

export default function useUser() {
  const [user, setUser] = useState(null)

  const authUser = 'YIUtfVspL7sqQ8Uhsh7c'

  const users = [
    {
      id: 'YIUtfVspL7sqQ8Uhsh7c',
      image: 'user-images/image-jesse.jpg',
      name: 'Jesse Ronda',
      username: 'jesse10930',
      upvotes: [1],
    },
  ]

  const getUser = (id) => {
    /*     try {
      const response = await axios(`/api/user/${username}`)
      console.log(response)
      setUser(response.data)
    } catch (error) {
      console.log(error)
      setUser(null)
    } */

    return users.filter((user) => user.id === id)
  }

  if (authUser) getUser(authUser)
  
  useEffect(() => {
    
  }, [authUser])

  return { user, setUser }
}
