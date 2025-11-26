'use client'

import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  order_id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string,
  payment_method: string
  payment_id: string
  payment_status: 'pending' | 'processing' | 'success' | 'failed'
}

export const getColumns = (items: any[]): ColumnDef<Payment>[] => [
  {
    accessorKey: "order_id",
    header: "Ordine",
  },
  {
    accessorKey: "last_name",
    header: "Cognome",
  },
  {
    accessorKey: "first_name",
    header: "Nome",
  },
  /*...items.map((item: any) => ({
    accessorKey: item.id,
    header: item.name,
  })),*/
  {
    accessorKey: "menu_1",
    header: "Menu 1",
  },
  {
    accessorKey: "menu_2",
    header: "Menu 2",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
]
