import useSWR from 'swr'

import { AxiosAPIService } from '../services/axios'

function useUser(id = '62a8912aec3546861ad8b8ed') {
  const { data, error, mutate } = useSWR(`/users/${id}`, AxiosAPIService.get)

  return {
    user: data,
    isUserLoading: !error && !data,
    isUserError: error,
    mutate
  }
}

export default useUser