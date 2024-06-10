import { useToastError } from '@/lib/validate'

export const addApplication = () => {
  const data = {
    position: 'New Job'
  }
  return fetch('http://127.0.0.1:8000/api/application/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .catch((err) => {
      useToastError('Unable to add application', err.message)
      throw new Error(err)
    })
}

export const deleteApplication = (id: string) => {
  return fetch(`${import.meta.env.VITE_API}application/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
    })
    .catch((err) => {
      useToastError('Unable to delete application', err.message)
      throw new Error(err)
    })
}
