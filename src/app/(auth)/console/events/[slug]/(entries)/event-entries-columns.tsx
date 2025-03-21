"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/shadcn/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu"
import { createClient } from "@/utils/supabase/client"
import { sendConfirmationMail } from "@/utils/mailer"
import { MantineProvider, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import EntryConfirmButton from "./event-entry-confirm"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  order_id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string,
  payment_method: string
  payment_id: string
  payment_status: 'pending' | 'processing' | 'success' | 'failed'
}

type ColumnsProps = {
  onConfirm: (entry: any) => void
}

export const getColumns = ({ onConfirm }: ColumnsProps): ColumnDef<Payment>[] => [
  {
    accessorKey: "order_id",
    header: "Ordine",
  },
  {
    accessorKey: "product_type",
    header: "Tipo",
  },
  {
    accessorKey: "payment_method",
    header: "Pagamento",
    cell: ({ row }) => {
      const entry = row.original

      if (entry.payment_method === 'stripe' && entry.payment_id) {
        return <a href={"https://dashboard.stripe.com/payments/" + entry.payment_id} target="_blank">{printMethod(entry.payment_method)}</a>
      } else {
        return printMethod(entry.payment_method)
      }
    },
  },
  {
    accessorKey: "payment_status",
    header: "Esito",
    cell: ({ row }) => {
      const entry = row.original

      return printStatus(entry.payment_status)
    }
  },
  {
    accessorKey: "last_name",
    header: "Cognome",
  },
  {
    accessorKey: "first_name",
    header: "Nome",
  },
  {
    accessorKey: "birth_year",
    header: "Anno",
  },
  {
    accessorKey: "gender",
    header: "Sesso",
  },
  {
    accessorKey: "club",
    header: "Club",
  },
  {
    id: "confirm",
    cell: ({ row }) => {
      const entry = row.original

      if (entry.payment_status === 'pending') {
        return (
          <EntryConfirmButton entry={entry} onConfirm={onConfirm} />
        )
      }
    },
  },
  /*{
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
      
 
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.order_id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },*/
]

const printMethod = (method: string) => {
  switch (method) {
    case 'stripe':
      return 'online'
    case 'cash':
      return 'contanti'
    case 'sepa':
      return 'bonifico'
    default:
      return 'ND'
  }
}

const printStatus = (status: string) => {
  switch (status) {
    case 'paid':
      return 'pagato'
    case 'pending':
      return 'in attesa'
    default:
      return 'ND'
  }
}
