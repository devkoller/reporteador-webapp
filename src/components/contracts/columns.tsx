import { ColumnDef } from "@tanstack/react-table"
import { ContractType } from "@/types"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"


export const Columns: ColumnDef<ContractType>[] = [
  {
    accessorKey: "codeContract",
    header: "ID",
    cell: ({ row }) => {
      let year = format(row.original.createdAt, 'yyyy')
      return (
        <Link to={`/contract/${row.original.id}`} className="hover:underline">
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>C-{year}-{row.original.id}</span>
          </div>
        </Link>
      )
    }
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <span>{row.getValue("name")}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "typeContract",
    header: "Tipo de contrato",
  },
  {
    accessorKey: "endDate",
    header: "Fecha de vencimiento",
  },
  {
    accessorKey: "value",
    header: "Valor",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <span>{row.getValue("value")}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Estatus",
    cell: ({ row }) => {
      let status = row.original.estatus
      return (
        <div className="flex items-center justify-center">
          <Badge
            variant={
              status === 'active'
                ? "default"
                : status === 'completed'
                  ? "outline"
                  : "destructive"
            }
          >
            {
              status === 'active'
                ? "Activo"
                : status === 'completed'
                  ? "Completado"
                  : "Cancelado"
            }
          </Badge>
        </div>
      )
    }
  },
  {
    accessorKey: "order",
    header: "Ordenes",
  },
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
              asChild
            >
              <Link to={`/contract/edit/${row.original.id}`}>
                Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
