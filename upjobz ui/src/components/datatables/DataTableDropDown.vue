<script setup lang="ts">
import { MoreHorizontal, Trash2, ClipboardCopy, Pencil } from 'lucide-vue-next'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { deleteApplication } from '@/actions/application'
import { isNullOrEmpty, useToastError } from '@/lib/validate'
import { inject } from 'vue'

const useAppStore: any = inject('application')
defineProps<{
  application: {
    id: string
    jobId: string
  }
}>()

function copy(id: string) {
  if (isNullOrEmpty(id)) {
    useToastError('No Job Id', 'This job application does not have a job id.')
    return
  }
  navigator.clipboard.writeText(id)
}
const deleteApp = async (id: string) => {
  await deleteApplication(id).then(() => {
    useAppStore.remove(id)
  })
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(application.jobId)"
        ><span class="flex flex-row gap-2 items-center"><ClipboardCopy /> Copy Job ID</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click=""
        ><span class="flex flex-row gap-2 items-center"><Pencil />Edit</span></DropdownMenuItem
      >
      <DropdownMenuItem @click="deleteApp(application.id)"
        ><span class="flex flex-row gap-2 items-center"><Trash2 />Delete</span></DropdownMenuItem
      >
    </DropdownMenuContent>
  </DropdownMenu>
</template>
