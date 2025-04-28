import { ColumnDef } from "@tanstack/react-table"
import { InventoryType } from "@/types"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface inventoryTransferType extends InventoryType {
  transfer: string
}


export const Columns: ColumnDef<InventoryType>[] = [
  {
    accessorKey: "SKU",
    header: "COD.",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <span>{row.getValue("SKU")}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "nombre",
    header: "Producto",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <Package className="h-4 w-4" />
          <span>{row.getValue("nombre")}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "categoria",
    header: "Categoría",
    meta: {
      filterType: 'select',
    },
  },
  {
    accessorKey: "warehouseName",
    header: "Almacén",
  },
  {
    accessorKey: "currentStock",
    header: "Stock",

    cell: ({ row }) => {
      let currentStock: number = row.original.currentStock
      let minimumStock: number = row.original.minimumStock
      return (
        <div className="flex items-center justify-end">
          <span>{currentStock}
            {currentStock < minimumStock && currentStock > 0 && (
              <span className="ml-2 text-xs text-yellow-500">(Bajo)</span>
            )}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Estatus",
    meta: {
      filterType: 'select',
      filterOptions: [
        'En Stock',
        'Bajo Stock',
        'Agotado',
      ]
    },
    cell: ({ row }) => {
      let status = row.original.status
      return (
        <div className="flex items-center justify-center">
          <Badge
            variant={
              status === 'En Stock'
                ? "default"
                : status === 'Bajo Stock'
                  ? "outline"
                  : "destructive"
            }
          >
            {status}
          </Badge>
        </div>
      )
    }
  },
]


export const getColumnsDetails = (goToDetails: (inventory: InventoryType) => void) => {
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


export const ColumnsTransfer: ColumnDef<inventoryTransferType>[] = [
  {
    accessorKey: "check",
    header: ({ table }) => {
      return (
        <input
          type="checkbox"
          // Marca si todas las filas están seleccionadas.
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      )
    },
    cell: ({ row }) => (
      <input
        type="checkbox"
        // Marca si la fila está seleccionada.
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "nombre",
    header: "Producto",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <Package className="h-4 w-4" />
          <span>{row.getValue("nombre")}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "currentStock",
    header: "Stock disponible",
  },
  {
    accessorKey: "transfer",
    header: "Cantidad de transferencia",
    enableColumnFilter: false,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <Input
          type="number"
          className="border-500-slate"
          value={row.getValue("transfer")}
          onChange={(e) => {
            row.original.transfer = e.target.value
          }}
        />
      )
    }
  },
]

export const getColumnsAdjustStock = (adjustStock: (inventory: InventoryType) => void) => {
  return [
    ...Columns,
    {
      accessorKey: "actions",
      header: "Acciones",
      enableColumnFilter: false,
      enableSorting: false,
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
