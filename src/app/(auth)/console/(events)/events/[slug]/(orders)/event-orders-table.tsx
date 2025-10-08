"use client"

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  Row,
  RowData,
  RowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table"

import { Button } from "@/components/ui/shadcn/button"
import { Input } from "@/components/ui/shadcn/input"
import React, { useEffect, useMemo, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { DownloadIcon, PlusIcon } from "lucide-react"
import { MantineProvider, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { mkConfig, generateCsv, download } from 'export-to-csv'
//import ConsoleEventEntryCreate from "./event-entry-update"
import { Event } from '@/types/events'

interface DataTableProps<TData, TValue> {
  event: Partial<Event>
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  //onCreate: (entry: any) => void,
  //meta: any
}
type Checked = DropdownMenuCheckboxItemProps["checked"]

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    addRow: any
  }
}

/*declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    foo: string
  }
}*/
// column.columnDef.meta


const csvConfig = mkConfig({
  fieldSeparator: ';',
  //filename: `iscrizioni-${name.toLowerCase()}`, // export file name (without .csv)
  decimalSeparator: '.',
  useKeysAsHeaders: true,
})

export function DataTable<TData, TValue>({
  event,
  columns,
  data,
  //onCreate,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      //sorting,
      columnFilters,
    },
    meta: {
      addRow: (entry: any) => {
        console.log('lolle', entry)
        /*const newRow: Student = {
          studentId: Math.floor(Math.random() * 10000),
          name: "",
          dateOfBirth: "",
          major: "",
        };
        const setFunc = (old: Student[]) => [...old, newRow];
        setData(setFunc);
        setOriginalData(setFunc);*/
      },
    }
  })


  const [showPaymentStatusBar, setShowPaymentStatus] = React.useState<Checked>(false)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
  const [opened, { open, close }] = useDisclosure(false)

  const exportCsv = (model: RowModel<TData>) => {
    const rowData: any[] = model.rows.map((row: any) => ({
      order_id: row.original.order_id,
      first_name: row.original.first_name,
      last_name: row.original.last_name,
      menu_1: row.original.menu_1,
      menu_2: row.original.menu_2,
      email: row.original.email ?? '',
    }))
    /*const rowData = model.rows.map((row: any) => row.original)*/
    const csv = generateCsv({ ...csvConfig, filename: `ordini-${event.slug}` })(rowData)
    download({ ...csvConfig, filename: `ordini-${event.slug}` })(csv)
  }

  return (
    <div>
      <div className="grid grid-cols-3 items-center py-4 space-x-8">
        <Filter
          placeholder="Cognome..."
          column={table.getColumn("last_name")}
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" size="sm" onClick={() => exportCsv(table.getRowModel())}>
            <DownloadIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    </div>
  )
}

function Filter({
  column,
  placeholder,
  className,
}: Partial<{
  column: Column<any, unknown>,
  placeholder: string
  className: string
}>) {
  const value = String(column?.getFilterValue() ?? '')

  return (
    <DebouncedInput
      className={className}
      onChange={value => column?.setFilterValue(value)}
      placeholder={placeholder}
      type="text"
      value={value}
    />
  )
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <Input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}