
import { useFetch } from "@/hooks"
import { useState, useEffect } from "react"
import { Spinner } from '@/components/ui/spinner'
import { CostoVentaColumns } from "./Columns"
import { DataTable } from '@/components/utils'
import { utils } from '@/utils'

export const CostoVenta = () => {
  const { response: inventario, loading } = useFetch({
    url: "/api/inventory/movement/report",
    qs: {
      tipoMovimientoId: 2,
    },
  })
  const [Data, setData] = useState({
    items: [],
    total: "",
    totalItems: 0,
  })


  useEffect(() => {
    if (inventario) {
      let total = 0

      const data = inventario.data.map((inv: any) => {

        const precio = inv.precioSImp / inv.cantidad
        total += inv.precioSImp


        return {
          ...inv,
          articulo: inv?.articulo.nombre,
          quantity: inv.cantidad,
          price: utils.formatCurrency(parseInt(precio.toFixed(2))),
          total: utils.formatCurrency(inv.precioSImp.toFixed(2)),
        }
      })

      setData(prev => (
        {
          ...prev,
          items: data,
          total: utils.formatCurrency(parseInt(total.toFixed(2))),
        }
      )
      )
    }
  }, [inventario])

  if (loading) {
    return <Spinner />
  }
  return (
    <div>
      <DataTable
        data={Data.items}
        columns={CostoVentaColumns}
      />
    </div>
  )
}
