import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type ClientType = {
  id: number
  nombre: string
  rfc: string
  telefono?: string
  direccionCP?: string
  direccionCalle?: string
  direccionCiudad?: string
  direccionPais?: string
  razonSocial?: string
  regimenFiscal?: string
  representanteLegal?: string
}


export const Columns: ColumnDef<ClientType>[] = [
  {
    accessorKey: "nombre",
    header: 'Cliente',
  },
  {
    accessorKey: "rfc",
    header: 'Nombre',
  },
]


export const getColumns = (handleEdit: (client: ClientType) => void) => {
  return [
    ...Columns,
    {
      accessorKey: "actions",
      header: "Acciones",
      cell: ({ row }: { row: any }) => {

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  handleEdit(row.original)
                }}
              >
                Editar cliente
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}