"use client"

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  Row,
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
type Checked = DropdownMenuCheckboxItemProps["checked"]



const csvConfig = mkConfig({
  fieldSeparator: ',',
  filename: 'sample', // export file name (without .csv)
  decimalSeparator: '.',
  useKeysAsHeaders: true,
})

export function DataTable<TData, TValue>({
  columns,
  data,
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
  })


  const [showPaymentStatusBar, setShowPaymentStatus] = React.useState<Checked>(false)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
  const [opened, { open, close }] = useDisclosure(false)

  const exportCsv = (model: RowModel<TData>) => {
    const rowData = model.rows.map((row: any) => row.original)
    const csv = generateCsv(csvConfig)(rowData)
    download(csvConfig)(csv)
  }

  return (
    <div>
      <div className="grid grid-cols-3 items-center py-4 space-x-8">
        <Filter
          placeholder="Cognome..."
          column={table.getColumn("last_name")}
        />
        <div className="ml-4 w-min hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Pagamento</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {/*<DropdownMenuSeparator />*/}
              <DropdownMenuCheckboxItem
                checked={showPaymentStatusBar}
                onCheckedChange={setShowPaymentStatus}
              >
                Confermato
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar}
                onCheckedChange={setShowActivityBar}
              >
                NON Confermato
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="hidden justify-end space-x-2">
          <div>
            <Button onClick={open}><PlusIcon />Aggiungi iscrizione</Button>
            <Modal opened={opened} onClose={close} title={"NUOVA ISCRIZIONE"} withCloseButton={false} size="xl">
              {/*<ConsoleEventEntryCreate onClose={close} />*/}
            </Modal>
          </div>
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