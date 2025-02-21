
import { useFetch } from "@/hooks"
import { useState, useEffect } from "react"
import { Spinner } from '@/components/ui/spinner'
import { InventoryColumns } from "./Columns"
import { DataTable } from '@/components/utils'
import { utils } from '@/utils'



export const Inventario = () => {
  const { response: inventario, loading } = useFetch({
    url: "/api/inventory/inventory/get",
    qs: {},
  })
  const [Data, setData] = useState({
    items: [],
    total: "",
    totalItems: 0,
  })


  useEffect(() => {
    if (inventario) {
      let totals = 0
      let totalItems = 0

      const data = inventario.data.map((inv: any) => {

        const precio = parseFloat(inv.movimientoDetalle.precioSImp)
        const total = parseFloat(inv.cantidad) * precio

        totals += total
        totalItems += parseInt(inv.cantidad)

        return {
          ...inv,
          articulo: inv.catArticulo.nombre,
          quantity: parseFloat(inv.cantidad).toFixed(2),
          price: utils.formatCurrency(parseInt(precio.toFixed(2))),
          total: utils.formatCurrency(parseInt(total.toFixed(2))),
        }
      })

      setData(prev => (
        {
          ...prev,
          items: data,
          total: utils.formatCurrency(parseInt(totals.toFixed(2))),
          totalItems: totalItems,
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
        columns={InventoryColumns}
      />
    </div>
  )
}
