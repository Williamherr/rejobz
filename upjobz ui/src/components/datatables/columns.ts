import type { ColumnDef } from '@tanstack/vue-table'
import DropdownAction from '@/components/datatables/DataTableDropDown.vue'
import { h } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'
import DataTableColumnHeader from '@/components/datatables/DataTableColumnHeader.vue'

interface Applications {
  id: string
  jobId?: string
  position: string
  company: string
  status: 'pending' | 'approved' | 'rejected'
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
    accessorKey: 'site',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column: column,
        title: 'Site'
      })
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const application = row.original

      return h(
        'div',
        { class: 'relative float-right' },
        h(DropdownAction, {
          application
        })
      )
    }
  }
]
