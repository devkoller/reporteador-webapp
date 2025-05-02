import { ColumnDef } from "@tanstack/react-table"
import { RecordsShippingType } from "@/types"
import { Input } from "@/components/ui/input"

export const Columns: ColumnDef<RecordsShippingType>[] = [
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
      const item = row.original
      return (
        <div className="flex items-center space-x-2">
          {/* <Package className="h-4 w-4" /> */}
          <span>
            {item.isService && item.service?.name}
            {item.isPackage && item.package?.name}
            {!item.isService && !item.isPackage && item.product?.nombre}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "quantity",
    header: "Cantidad",
    enableColumnFilter: false,
    enableSorting: false,
    cell: ({ row }) => {
      const item = row.original
      return (
        <div className="flex justify-center space-x-2">
          {/* <Package className="h-4 w-4" /> */}
          <span>
            {item.quantity}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "receivedQuantity",
    header: "Cantidad restante",
    enableColumnFilter: false,
    enableSorting: false,
    cell: ({ row }) => {
      const item = row.original
      return (
        <div className="flex justify-center space-x-2">
          {/* <Package className="h-4 w-4" /> */}
          <span>
            {item.receivedQuantity}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "quantityToSave",
    header: "Cantidad en proceso",
    enableColumnFilter: false,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <Input
          type="number"
          className="border-500-slate"
          onChange={(e) => {
            row.original.quantityToSave = parseInt(e.target.value)
          }}
        />
      )
    }
  },
]
