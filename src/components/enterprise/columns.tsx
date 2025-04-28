import { ColumnDef } from "@tanstack/react-table"
import { EnterpriseType } from "@/types"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export const Columns: ColumnDef<EnterpriseType>[] = [

  {
    accessorKey: "descripcion",
    header: "Nombre",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <Building2 className="h-4 w-4" />
          <span>{row.original.descripcion}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "location",
    header: "Dirección",
  },
  {
    accessorKey: "rfc",
    header: "RFC",
  },
]


interface ColumnDetailsProps {
  goToDetails: (enterprise: EnterpriseType) => void
  goToEdit: (enterprise: EnterpriseType) => void
}


export const getColumnsDetails = ({ goToDetails, goToEdit }: ColumnDetailsProps) => {
  return [
    ...Columns,
    {
      accessorKey: "actions",
      header: "Acciones",
      enableColumnFilter: false,
      enableSorting: false,
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
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  goToEdit(row.original)
                }}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  goToDetails(row.original)
                }}
              >
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}



export const getColumnsAdjustStock = (adjustStock: (inventory: EnterpriseType) => void) => {
  return [
    ...Columns,
    {
      accessorKey: "actions",
      header: "Acciones",
      cell: ({ row }: { row: any }) => {
        return (
          <Button onClick={() => adjustStock(row.original)}>
            Ajustar stock
          </Button>
        )
      },
    },
  ]
}
