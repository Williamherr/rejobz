import { useToastError } from '@/lib/validate'

export const deleteApplication = (id: string) => {
  console.log('deleteApplication', id)
  fetch(`${import.meta.env.VITE_API}application/${id}`, {
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
    })
}
