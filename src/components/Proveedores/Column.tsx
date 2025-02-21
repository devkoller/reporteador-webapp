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

export type ProveedorType = {
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


export const Columns: ColumnDef<ProveedorType>[] = [
  {
    accessorKey: "nombre",
    header: 'Proveedor',
  },
  {
    accessorKey: "rfc",
    header: 'RFC',
  },
]


export const getColumns = (handleEdit: (proveedores: ProveedorType) => void) => {
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
                Editar proveedores
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}