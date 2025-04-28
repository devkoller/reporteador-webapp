import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ProveedorType, ProductsType } from "@/types"
import { Truck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Package, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const ColumnsAddProduct: ColumnDef<ProductsType>[] = [
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
    header: 'Producto',
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <Truck className="h-4 w-4" />
          <span>{row.getValue("nombre")}</span>
        </div>
      )
    }
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
          defaultValue={row.original.price}
          onChange={(e) => {
            row.original.price = parseInt(e.target.value)
          }}
        />
      )
    }
  },
  {
    accessorKey: "exits",
    header: "Ya existe",
    enableColumnFilter: false,
    enableSorting: false,
    cell: ({ row }) => {
      if (row.original.isProductProvider) {
        return (
          <Badge variant="secondary" className="flex items-center">
            <Check className="mr-2 h-4 w-4" />
            Agregado
          </Badge>
        )
      }
      return (
        <span className=""></span>
      )
    }
  },
]



interface handleRemoveProductProps {
  handleRemoveProduct: (proveedores: ProductsType) => void
}

export const productProviderActions = ({
  handleRemoveProduct
}: handleRemoveProductProps) => {
  return [
    ...ColumnsProductsProvider,
    {
      accessorKey: "actions",
      header: "Acciones",
      enableColumnFilter: false,
      enableSorting: false,
      cell: ({ row }: { row: any }) => {

        return (
          <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => handleRemoveProduct(row.original)}>
            <X className="h-4 w-4" />
          </Button>
        )
      },
    },
  ]
}

export const Columns: ColumnDef<ProveedorType>[] = [
  {
    accessorKey: "nombre",
    header: 'Proveedor',
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <Truck className="h-4 w-4" />
          <span>{row.getValue("nombre")}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "contact",
    header: 'Contacto',
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span>{row.original.representanteLegal}</span>
          <span className="text-xs text-muted-foreground">{row.original.telefono}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "rfc",
    header: 'RFC',
  },
]

interface ColumnDetailsProps {
  handleEdit: (proveedores: ProveedorType) => void
  goToDetails: (proveedores: ProveedorType) => void
}


export const getColumns = ({
  handleEdit,
  goToDetails,
}: ColumnDetailsProps) => {
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
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  goToDetails(row.original)
                }}
              >
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleEdit(row.original)
                }}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}


export const ColumnsProductsProvider: ColumnDef<ProductsType>[] = [
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
    accessorKey: "currentStock",
    header: "Stock",

    cell: ({ row }) => {
      let currentStock = row.original.currentStock || 0
      let minimumStock = row.original.minimumStock || 5
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
    accessorKey: "price",
    header: "Precio",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end">
          <span>
            {row.original.price}
          </span>
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
        'Sin Stock',
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