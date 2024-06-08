import { h } from 'vue'

import DropdownAction from '@/components/datatables/DataTableDropDown.vue'
import DataTableColumnHeader from '@/components/datatables/DataTableColumnHeader.vue'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { DownloadIcon } from 'lucide-vue-next'

import { downloadExcel } from '@/actions/download'

import type { ColumnDef } from '@tanstack/vue-table'

export interface Applications {
  id: string
  jobId: string
  position: string
  company: string
  status: 'applied' | 'interviewing' | 'offered' | 'closed'
  site: string
}

export const columns: ColumnDef<Applications>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all'
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
        ariaLabel: 'Select row'
      }),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'position',
    header: ({ column }) => {
      return h(DataTableColumnHeader, {
        column: column,
        title: 'Position',
        disableAll: true
      })
    }
  },
  {
    accessorKey: 'company',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column: column,
        title: 'Company'
      })
  },
  {
    accessorKey: 'status',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column: column,
        title: 'Status'
      })
  },
  {
    accessorKey: 'dateApplied',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column: column,
        title: 'Date Applied'
      })
  },
  {
    accessorKey: 'site',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column: column,
        title: 'Site'
      })
  },
  {
    id: 'actions',
    header: ({ table }) =>
      h('span', { class: 'float-right space-x-2' }, [
        h(
          Button,
          {
            onClick: () => {
              const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original)
              downloadExcel(selectedRows)
            }
          },
          h(DownloadIcon)
        )
      ]),

    cell: ({ row }) => {
      const application = row.original
      return h(
        'div',
        { class: 'relative float-right' },
        h(DropdownAction, {
          application
        })
      )
    },

    enableHiding: false
  }
]
