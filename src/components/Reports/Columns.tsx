import { ColumnDef } from "@tanstack/react-table"


export type InventaryType = {
  name: string
  quantity: number
  price: number
  total: number
}

export type catAlmacenType = {
  id?: number
  nombre?: string
  descrip?: string
  empresaId?: number
  tipo?: string
  padre?: number
}

export type catTipoMovimientoType = {
  id?: number
  descripcion?: string
  grant?: string
  monto_afecta?: string
}

export type catArticuloType = {
  active?: boolean
  claveProdServId?: number
  createdAt?: string
  deleted?: boolean
  deletedAt?: string
  descrip?: string
  id?: number
  marca?: string
  nombre?: string
  precioPromedio?: number
  tipo?: number
  updatedAt?: string

}

export type DetalleType = {
  articulo: catArticuloType | null
  articuloCompuestoId?: number
  articuloId?: number
  cancelado?: boolean
  cantidad?: number
  catArticuloCodBarra?: {}
  catArticulosLote?: {}
  codigoBarrasId?: number
  contratosDetalleId?: number
  createdAt?: string
  deletedAt?: boolean
  facturaDetalleId?: number
  id?: number
  ipes?: string
  iva?: number
  loteId?: number
  movimientoId?: number
  precioCImp?: number
  precioSImp?: number
  updatedAt?: string
}

export type ProveedorType = {
  activo?: boolean
  createdAt?: string
  deleted?: boolean
  deletedAt?: string
  direccionCP?: string
  direccionCalle?: string
  direccionCiudad?: string
  direccionNumero?: string
  direccionPais?: string
  fechaAlta?: string
  id?: number
  nombre?: string
  razoSocial?: string
  regimenFiscal?: string
  representateLegal?: string
  rfc?: string
  telefono?: string
  updatedAt?: string
}

export type MovementsType = {
  almacenDestinoId?: number
  almacenID?: number
  almacenId?: number
  cancelado?: boolean
  canceladoFactura?: boolean
  caceladoUserId?: number
  catAlmacen?: catAlmacenType | {}
  catTipoMovimiento?: catTipoMovimientoType | {}
  cliente?: {}
  clienteId?: number
  contratoId?: number
  corteMovimientoId?: number
  createdAt?: string
  deleted?: boolean
  deletedAt?: string
  detalle?: DetalleType[] | []
  facturaId?: number
  fecha?: string
  id?: number
  movimiento?: string
  proveedor?: ProveedorType | {}
  proveedorId?: number
  tipoMovimientoId?: number
  totalcimp?: number
  totalsimp?: number
  updatedAt?: string
  userId?: number
}


export const InventoryColumns: ColumnDef<InventaryType>[] = [
  {
    accessorKey: "articulo",
    header: 'Articulo',
  },
  {
    accessorKey: "quantity",
    header: 'Cantidad',
  },
  {
    accessorKey: "price",
    header: 'Precio Unitario',
  },
  {
    accessorKey: "total",
    header: 'Total',
  },
]

export const CostoCompraColumns: ColumnDef<InventaryType>[] = [
  {
    accessorKey: "articulo",
    header: 'Articulo',
  },
  {
    accessorKey: "quantity",
    header: 'Cantidad',
  },
  {
    accessorKey: "price",
    header: 'Precio Unitario',
  },
  {
    accessorKey: "total",
    header: 'Total',
  },
]

export const CostoVentaColumns: ColumnDef<InventaryType>[] = [
  {
    accessorKey: "articulo",
    header: 'Articulo',
  },
  {
    accessorKey: "quantity",
    header: 'Cantidad',
  },
  {
    accessorKey: "price",
    header: 'Precio Unitario',
  },
  {
    accessorKey: "total",
    header: 'Total',
  },
]

export const MovimientosColumns: ColumnDef<MovementsType>[] = [
  {
    accessorKey: "movimiento",
    header: 'Tipo de Movimiento',
  },
  {
    accessorKey: "fecha",
    header: 'Fecha del movimiento',
  },
  {
    accessorKey: "totalsimp",
    header: 'Precio Unitario',
  },
  {
    accessorKey: "totalcimp",
    header: 'Total',
  },
]