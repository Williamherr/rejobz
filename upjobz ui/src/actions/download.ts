import Cookies from 'js-cookie'
import type { Applications } from '@/components/datatables/columns'
import { isNullOrEmpty } from '@/lib/validate'
import { useToast } from '@/components/ui/toast/use-toast'

export const downloadExcel = (data: Applications[]) => {
  const csrftoken: string = Cookies.get('csrftoken') || ''
  if (canDownload(data, csrftoken)) return

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
      a.download = 'Applications.xlsx'
      document.body.appendChild(a)
      a.click()
      a.remove()
    })
    .catch((error) => {
      console.error(error)
    })
}

const canDownload = (data: Applications[], csrftoken: string): Boolean => {
  const { toast } = useToast()
  let error = ''
  switch (false) {
    case !isNullOrEmpty(data):
      error = 'No data to download'
      break
    case !isNullOrEmpty(csrftoken):
      error = 'No csrf token found'
      break
  }

  if (!isNullOrEmpty(error)) {
    toast({
      title: 'Unable to download file',
      description: error,
      variant: 'destructive'
    })
  }

  return !isNullOrEmpty(error)
}
