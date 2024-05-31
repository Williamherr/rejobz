// fetch.js
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url: string, randomError?: boolean) {
  const data = ref(null)
  const error = ref(null)

  if (randomError) return { data, error: new Error('Random Error') }

  const fetchData = async () => {
    // reset state before fetching..
    data.value = null
    error.value = null

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error }
}
