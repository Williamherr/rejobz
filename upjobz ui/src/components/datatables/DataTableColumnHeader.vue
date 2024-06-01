<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { type Applications } from './columns'
import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon } from '@radix-icons/vue'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface DataTableColumnHeaderProps {
  column: Column<Applications, any>
  title: string
  disableHide?: Boolean
  disabledSort?: Boolean
  disableAll?: Boolean
}

defineProps<DataTableColumnHeaderProps>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<template>
  <div
    v-if="column.getCanSort() && !disableAll"
    :class="cn('flex items-center space-x-2', $attrs.class ?? '')"
  >
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" size="sm" class="-ml-3 h-8 data-[state=open]:bg-accent">
          <span>{{ title }}</span>
          <ArrowDownIcon v-if="column.getIsSorted() === 'desc'" class="w-4 h-4 ml-2" />
          <ArrowUpIcon v-else-if="column.getIsSorted() === 'asc'" class="w-4 h-4 ml-2" />
          <CaretSortIcon v-else class="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <div v-if="!disabledSort">
          <DropdownMenuItem @click="column.toggleSorting(false)">
            <ArrowUpIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem @click="column.toggleSorting(true)">
            <ArrowDownIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator v-if="!disableHide && !disabledSort" />
        <DropdownMenuItem v-if="!disableHide" @click="column.toggleVisibility(false)">
          <EyeNoneIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Hide
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  <div v-else :class="$attrs.class">
    {{ title }}
  </div>
</template>
