<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/loaders'
import { useFetch } from '@/lib/fetch.ts'

const { data, error } = useFetch('http://127.0.0.1:8000/api/application/')
</script>

<template>
  <div class="border-1 border border-red-800 w-1/2 m-auto">
    <h1>Jobs</h1>
    <div v-if="error">
      <p>Oops! Error encountered: {{ error.message }}</p>
    </div>
    <div v-else-if="data">
      Data loaded:
      <pre>{{ data }}</pre>
    </div>
    <div v-else><Skeleton></Skeleton></div>
  </div>
</template>
