import { useToast } from '@/components/ui/toast'

const { toast } = useToast()

export const isNullOrEmpty = (value: unknown): value is null | undefined | '' | [] => {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)
  )
}

export const useToastError = (title: string, msg: string) => {
  toast({
    title: title,
    description: msg,
    variant: 'destructive'
  })
}
