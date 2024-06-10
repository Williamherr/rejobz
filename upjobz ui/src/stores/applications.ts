import { ref } from 'vue'
import { useFetch } from '@vueuse/core'
import type { Applications } from '@/components/datatables/columns'

export const useApplicationStore = () => {
  const data = ref<Applications[]>([])
  const error: any = ref(null)

  const fetchData = async () => {
    try {
      const { data: responseData, error: responseError } = await useFetch(
        'http://127.0.0.1:8000/api/application/'
      )
        .get()
        .json()
      data.value.push(...responseData.value)
      error.value = responseError.value || null
    } catch (err) {
      console.error('Error fetching data:', err)
      data.value = []
      error.value = err
    }
  }

  const add = (application: Applications) => {
    console.log('Adding data')
    data.value = [...data.value, application]
  }

  const remove = (id: number) => {
    data.value = data.value.filter((job: any) => job.id !== id)
  }

  const test = () => {
    console.log('test')
  }

  return {
    data,
    error,
    fetchData,
    add,
    remove,
    test
  }
}
