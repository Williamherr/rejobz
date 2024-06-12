<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { inject } from 'vue'
import DataTablesForm from './DataTablesForm.vue'

const application: any = inject('application')

const saveHandler = () => {
  console.log('Save handler')
  console.log('e', application.editedRow)
}

const close = () => {
  console.log('Close handler')
  application.editRow('')
}
</script>

<template>
  <Dialog :open="application.editedRow" @close="close">
    <DialogContent :customOnClose="close">
      <DialogHeader>
        <DialogTitle>Edit job application</DialogTitle>
        <DialogDescription>
          Make changes to your application here. Click save when you're done.
        </DialogDescription>

        <div v-if="application.editedRow">
          <DataTablesForm :application="application.editedRow.value" />
        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
