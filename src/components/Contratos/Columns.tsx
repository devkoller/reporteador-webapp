import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { FaTrash, FaFilePdf } from 'react-icons/fa'
import { ProveedorType } from '@/components/Proveedores'


export type ContratoType = {
  id: number
  nombre: string
  active?: boolean
  catCliente?: catClienteType | null
  clienteId?: number
  contratosDetalles?: DetalleType[] | null
  cretatedAt?: string
  deletedAt?: string
  updatedAt?: string
}

export type DetalleType = {
  active?: boolean
  articuloId?: number
  cantidad?: number
  catArticulo?: catArticuloType | null
  contratoId?: number
  createdAt?: string
  deleted?: boolean
  deletedAt?: string
  id: number
  precioVenta?: string
  preciocimp?: string
  preciosimp?: string
  total?: string
  updatedAt?: string
}

export type catArticuloType = {
  id: number
  nombre: string
  descrip?: string
}

export type catClienteType = {
  id: number
  nombre: string
}

export type ArtiCompuesto = {
  nombre: string
  cantidad: string
  total: string
  precioVenta: string
}

export type EmpresaType = {
  id: number
  descripcion: string
  razonSocial?: string
  rfc?: string
}

export type CotizacionDetalleType = {
  id: number
  articuloId: number
  articulo: catArticuloType
  cotizacionCompraId: number
  iva: number
  precio: string
  cantidad: string
  createdAt: string
}

export type CotizacionesType = {
  contrato?: ContratoType
  contratoId?: number
  cotizacionDetalle?: CotizacionDetalleType[]
  creteadAt?: string
  deletedAt?: string
  empresa?: EmpresaType
  empresaId?: number
  id?: number
  proveedor?: ProveedorType
  proveedorId?: number
  updatedAt?: string
  userId?: number
  vigencia?: string

}

export type OcDetalleType = {
  id: number
  articulo?: catArticuloType
  articuloId?: number
  cantidad?: string
  createdAt?: string
  deletedAt?: string
  descuento?: string
  ipes?: string
  iva?: string
  ordenCompraId?: number
  precio?: string
  updatedAt?: string
}

export type PedidoType = {
  id: number
  contratoId?: number
  createdAt?: string
  deletedAt?: string
  empresaId?: number
  folioPedido?: string
  proveedorId?: number
  status?: string
  updatedAt?: string
  userId?: number
}

export type OcType = {
  id: number
  condicionEntrega?: string
  contratoId?: number
  createdAt: string
  deletedAt?: string
  empresa?: EmpresaType
  empresaId?: number
  fechaEntrega?: string
  noOrden?: string
  ordenCompraDetalle?: OcDetalleType[]
  pedido?: PedidoType
  pedidoId?: number
  proveedor?: ProveedorType
  proveedorId?: number
  status?: string
  updatedAt?: string
  userId?: number
  usuario?: {}
}

export interface ArtiCotizacionType extends catArticuloType {
  cantidad: string
  precio: string
}

export const DetallesColumns: ColumnDef<DetalleType>[] = [
  {
    accessorKey: "catArticulo.nombre",
    header: 'Articulo',
  },
  {
    accessorKey: "cantidad",
    header: 'Cantidad',
  },
  {
    accessorKey: "preciosimp",
    header: 'Precio unitario S/imp',
  },
  {
    accessorKey: "preciocimp",
    header: 'Precio unitario C/imp',
  },
  {
    accessorKey: "total",
    header: 'Total',
  },
  {
    accessorKey: "precioVenta",
    header: 'Precio de venta',
  }
]

export const CotizacionesColumns: ColumnDef<CotizacionesType>[] = [
  {
    accessorKey: "proveedor.nombre",
    header: 'Proveedor',
  },
  {
    accessorKey: "contador",
    header: 'Artículos (distintos)',
  },
  {
    accessorKey: "totalArticulos",
    header: 'Cantidad de artículos',
  },
  {
    accessorKey: "total",
    header: 'Cotización total',
  },
]

export const OrdenDetalleColumn: ColumnDef<CotizacionDetalleType>[] = [
  {
    accessorKey: "nombre",
    header: 'Articulo',
  },
  {
    accessorKey: "cantidad",
    header: 'Cantidad',
  },
  {
    accessorKey: "precio",
    header: 'Precio',
  },
  {
    accessorKey: "total",
    header: 'Total',
  },
]

export const ArticulosColumns: ColumnDef<catArticuloType>[] = [
  {
    accessorKey: "nombre",
    header: 'Articulo',
  },
]

export const CotizacionColumns: ColumnDef<ArtiCotizacionType>[] = [
  {
    accessorKey: "nombre",
    header: 'Articulo',
  },
  {
    accessorKey: "cantidad",
    header: 'Cantidad',
  },
  {
    accessorKey: "precio",
    header: 'Precio',
  },
]

export const ArtiCompColumns: ColumnDef<ArtiCotizacionType>[] = [
  {
    accessorKey: "nombre",
    header: 'Articulo',
  },
  {
    accessorKey: "cantidad",
    header: 'Cantidad disponible',
  },
]



export const OcColumns: ColumnDef<OcType>[] = [
  {
    accessorKey: "noOrden",
    header: 'No. de orden',
  },
  {
    accessorKey: "proveedor.nombre",
    header: 'Proveedor',
  },
  {
    accessorKey: "condicionEntrega",
    header: 'Condición de entrega',
  },
  {
    accessorKey: "fechaEntrega",
    header: 'Fecha de entrega',
  },
  {
    accessorKey: "contador",
    header: 'Artículos (distintos)',
  },
  {
    accessorKey: "totalArticulos",
    header: 'Cantidad de artículos',
  },
  {
    accessorKey: "total",
    header: 'Total',
  },
]


export const getOCColumns = (showPDF: (row: OcDetalleType) => void) => {
  return [
    ...OcColumns,
    {
      accessorKey: "actions",
      header: "PDF de la orden",
      cell: ({ row }: { row: any }) => {
        return (
          <Button variant="ghost" onClick={() => {
            showPDF(row.original)
          }
          }>
            <FaFilePdf />
          </Button>
        )
      },
    },
  ]
}

export const getOCDetalleColumns = (deteleRow: (row: OcDetalleType) => void) => {
  return [
    ...OrdenDetalleColumn,
    {
      accessorKey: "actions",
      header: "Eliminar articulo",
      cell: ({ row }: { row: any }) => {
        return (
          <Button variant="ghost" onClick={() => {
            deteleRow(row.original)
          }
          }>
            <FaTrash />
          </Button>
        )
      },
    },
  ]
}
export const getArticulosColumns = (deleteRow: (row: DetalleType) => void) => {
  return [
    ...DetallesColumns,
    {
      accessorKey: "actions",
      header: "Eliminar movimiento",
      cell: ({ row }: { row: any }) => {
        return (
          <Button variant="ghost" onClick={() => {
            deleteRow(row.original)
          }
          }>
            <FaTrash />
          </Button>
        )
      },
    },
  ]
}

export const getCotizaColumns = (deleteRow: (row: ArtiCotizacionType) => void) => {
  return [
    ...CotizacionColumns,
    {
      accessorKey: "actions",
      header: "Acciones",
      cell: ({ row }: { row: any }) => {
        return (
          <Button variant="ghost" onClick={() => {

            // if (row && row.getIsSelected()) {
            //   row.toggleSelected(); // Desmarca la fila si está seleccionada
            // }

            deleteRow(row.original)
          }
          }>
            <FaTrash />
          </Button>
        )
      },
    },
  ]
} 