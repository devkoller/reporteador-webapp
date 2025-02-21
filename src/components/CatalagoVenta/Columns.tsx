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

export type AritculosType = {
  id: number
  nombre: string
  descrip: number
  marca?: string
}

export const Columns: ColumnDef<AritculosType>[] = [
  {
    accessorKey: "nombre",
    header: 'Artículo',
  },
  {
    accessorKey: "descrip",
    header: 'Descripción',
  },
]

export const getColumns = (handleEdit: (articulos: AritculosType) => void) => {
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
                Editar articulo
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}