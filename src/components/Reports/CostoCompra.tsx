
import { useFetch } from "@/hooks"
import { useState, useEffect } from "react"
import { Spinner } from '@/components/ui/spinner'
import { CostoCompraColumns } from "./Columns"
import { DataTable } from '@/components/utils'
import { utils } from '@/utils'


export const CostoCompra = () => {
  const { response: compras, loading } = useFetch({
    url: "/api/inventory/movement/report",
    qs: {
      tipoMovimientoId: 1,
    },
  })
  const [Data, setData] = useState({
    items: [],
    total: "",
    totalItems: 0,
  })


  useEffect(() => {
    if (compras) {
      let total = 0
      const res = compras.data.map((inv: any) => {
        const precio = inv.precioSImp / inv.cantidad
        total += inv.precioSImp
        return {
          ...inv,
          id: inv.articuloId,
          articulo: inv?.articulo.nombre,
          quantity: inv.cantidad,
          price: utils.formatCurrency(parseFloat(precio.toFixed(2))),
          total: utils.formatCurrency(inv.precioSImp.toFixed(2)),
        }
      })

      setData((prev) => ({
        ...prev,
        items: res,
        total: utils.formatCurrency(total),
      }))
    }
  }, [compras])

  if (loading) {
    return <Spinner />
  }
  return (
    <div>
      <DataTable
        data={Data.items}
        columns={CostoCompraColumns}
      />
    </div>
  )
}
