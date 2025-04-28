import { ColumnDef } from "@tanstack/react-table"
import { ServiceType } from "@/types"
import { Badge } from "@/components/ui/badge"


export const Columns: ColumnDef<ServiceType>[] = [
  {
    accessorKey: "SKU",
    header: "ID",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <span>{row.original.SKU}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "name",
    header: "Servicio",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <span>{row.original.name}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "categoryName",
    header: "Categoría",
    meta: {
      filterType: 'select',
    },
  },
  {
    accessorKey: "typeService",
    header: "Tipo de servicio",
    meta: {
      filterType: 'select',
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <Badge variant={row.original.typeService === 'selling' ? 'default' : 'secondary'} className="flex items-center space-x-2">
            <span>{row.original.typeService === 'selling' ? 'Venta' : 'Compra'}</span>
          </Badge>
        </div>
      )
    }
  },
]
