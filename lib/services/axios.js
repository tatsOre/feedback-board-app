import { Axios } from 'axios'

const axios = new Axios({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const AxiosAPIService = {
  getAll: async () => {
    const response = await axios.get('/feedbacks')
    return JSON.parse(response.data).data
  },

  post: async (data, endpoint = '/feedbacks') => {
    const response = await axios.post(endpoint, JSON.stringify(data))
    const doc = JSON.parse(response.data)
    if (!doc.success) throw new Error(response.statusText)
    return doc.data
  },

  get: async (endpoint) => {
    const response = await axios.get(endpoint)
    const doc = JSON.parse(response.data)
    if (!doc.success) throw new Error(response.statusText)
    return doc.data
  },

  update: async (id, data) => {
    const response = await axios.put(`/feedbacks/${id}`, JSON.stringify(data))
    const doc = JSON.parse(response.data)
    if (!doc.success) throw new Error(response.statusText)
    return doc.data
  },

  delete: async (id, uid) => {
    const response = await axios.delete(`/feedbacks/${id}`, {
      data: JSON.stringify({ user: uid }),
    })
    const doc = JSON.parse(response.data)
    if (!doc.success) throw new Error(response.statusText)
    return doc.data
  },
}

export { AxiosAPIService }
