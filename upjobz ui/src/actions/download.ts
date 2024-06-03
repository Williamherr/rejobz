import Cookies from 'js-cookie'
import type { Applications } from '@/components/datatables/columns'

export const downloadExcel = (data: Applications[]) => {
  const csrftoken: string | undefined = Cookies.get('csrftoken') || ''
  fetch(`${import.meta.env.VITE_API}application/export/excel/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    credentials: 'include',
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'Applications.xls'
      document.body.appendChild(a)
      a.click()
      a.remove()
    })
}
