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

export type UserType = {
  id: number
  username: string
  nombre: string
  correo: string
  persona: {
    nombre: string
    ape1: string
    ape2?: string
  }
  typeFilter?: string
}


export const Columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "username",
    cell: info => info.getValue(),
    header: 'Usuario',
    filterFn: 'fuzzy',
  },
  {
    accessorKey: "nombre",
    header: 'Nombre',
  },
  {
    accessorKey: "correo",
    header: 'Correo',
  },
]


export const getColumns = (handleEdit: (user: UserType) => void, handleGrants: (user: UserType) => void) => {
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
                Editar usuario
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  handleGrants(row.original)
                }}
              >
                Editar permisos
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}