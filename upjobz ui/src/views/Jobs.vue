<script setup lang="ts">
import { Skeleton } from '@/components/loaders'
import { useFetch } from '@/lib/fetch'
import { columns } from '@/components/datatables/columns'
import DataTable from '@/components/datatables/DataTable.vue'

const { data, error } = useFetch('http://127.0.0.1:8000/api/application/')
</script>

<template>
  <div class="border-1 border border-red-800 w-full m-auto">
    <div v-if="error">
      <p>Oops! Error encountered: {{ error.message }}</p>
    </div>
    <div v-else-if="data">
      <div class="container py-10 mx-auto">
        <h1>Jobs Applications</h1>
        <DataTable :columns="columns" :data="data" :addRow="addRow" />
      </div>
    </div>
    <div v-else><Skeleton></Skeleton></div>
  </div>
</template>
