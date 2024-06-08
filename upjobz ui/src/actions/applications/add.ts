import { useToastError } from '@/lib/validate'

export const addApplication = (url: string, data: any) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => {
      useToastError('Unable to add application', err.message)
      return (err.value = err)
    })
}
