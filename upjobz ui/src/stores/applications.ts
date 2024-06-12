import { ref } from 'vue'
import { useFetch } from '@vueuse/core'
import type { Application } from '@/components/datatables/columns'

export const useApplicationStore = () => {
  const data = ref<Application[]>([])
  const error: any = ref(null)
  const editedRow = ref<Application | null>(null)

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

  const editRow = (id: string) => {
    editedRow.value = getById(id)
  }

  const getById = (id: string) => {
    return data.value.find((job: Application) => job.id == id) ?? null
  }

  const add = (application: Application) => {
    console.log('Adding data')
    data.value = [...data.value, application]
  }

  const remove = (id: string) => {
    data.value = data.value.filter((job: Application) => job.id != id)
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
    test,
    getById,
    editRow,
    editedRow
  }
}
