import { useToast } from '@/components/ui/toast/use-toast'

export const addApplication = (url: string, data: any) => {
  const { toast } = useToast()
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
      toast({
        title: 'Unable to download file',
        description: 'err',
        variant: 'destructive'
      })
      return (err.value = err)
    })
}
