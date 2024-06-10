<script setup lang="ts">
import { Skeleton } from '@/components/loaders'
import { columns } from '@/components/datatables/columns'
import DataTable from '@/components/datatables/DataTable.vue'
import { isNullOrEmpty } from '@/lib/validate'

import { inject } from 'vue'
const application: any = inject('application')
application.fetchData()
let data = application.data
let error = application.error
</script>

<template>
  <div class="w-full m-auto">
    <div v-if="error">
      <p>Oops! Error encountered: {{ error }}</p>
    </div>
    <div v-else-if="!isNullOrEmpty(data)">
      <div class="container py-10 mx-auto">
        <h1>Jobs Applications</h1>
        <DataTable :columns="columns" :data="data" />
      </div>
    </div>
    <div v-else><Skeleton></Skeleton></div>
  </div>
</template>
