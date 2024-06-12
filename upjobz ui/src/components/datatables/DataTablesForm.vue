<script setup lang="ts">
import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import type { Application } from './columns'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const props = defineProps({
  application: Object as () => Application
})

console.log('props', props.application.id)

const formSchema = toTypedSchema(
  z.object({
    jobId: z.string().min(0).max(50).optional(),
    position: z.string().min(1).max(50),
    company: z.string().min(0).max(50).optional(),
    status: z.string().min(0).max(50),
    date: z.string(),
    site: z.string().min(0).max(50).optional()
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    jobId: props.application?.jobId,
    position: props.application?.position,
    company: props.application?.company,
    status: props.application?.status,
    date: props.application?.dateApplied,
    site: props.application?.site
  }
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: 'You submitted the following values:',
    description: h(
      'pre',
      { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
      h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))
    )
  })
})
</script>

<template>
  <form class="w-full space-y-6 p-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="jobId">
      <FormItem>
        <FormLabel>JobId</FormLabel>
        <FormControl>
          <Input type="text" placeholder="123456" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="position">
      <FormItem>
        <FormLabel>Position</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Position" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="company">
      <FormItem>
        <FormLabel>Company</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Company" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="status">
      <FormItem>
        <FormLabel>Status</FormLabel>
        <FormControl>
          <Select>
            <SelectTrigger class="w-[180px]">
              <SelectValue :placeholder="componentField.modelValue || 'Application status?'" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="applied"> Applied </SelectItem>
                <SelectItem value="interviewing"> Interviewing </SelectItem>
                <SelectItem value="offered"> Offered </SelectItem>
                <SelectItem value="closed"> Closed </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="date">
      <FormItem>
        <FormLabel>Date</FormLabel>
        <FormControl>
          <Input type="date" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="site">
      <FormItem>
        <FormLabel>Site</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Site" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="float-right"> Submit </Button>
  </form>
</template>
