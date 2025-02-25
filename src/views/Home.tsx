import { Layout } from '@/components/auth'
import { useFetch } from '@/hooks'
import { useState, useEffect } from 'react'
import { utils } from '@/utils'
import { Spinner } from '@/components/ui/spinner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'


export const Home = () => {
  const { response: inventario, loading: loadingInventario } = useFetch({
    url: "/api/inventory/inventory/get",
    qs: {},
  })

  const { response: compras, loading: loadingCompras } = useFetch({
    url: "/api/inventory/movement/report",
    qs: {
      tipoMovimientoId: 1,
    },
  })

  const { response: venta, loading: loadingVenta } = useFetch({
    url: "/api/inventory/movement/report",
    qs: {
      tipoMovimientoId: 2,
    },
  })

  const [Data, setData] = useState({
    inventario: {
      currency: 0,
      itemsLength: 0,
    },
    compras: {
      currency: 0,
      itemsLength: 0,
    },
    venta: {
      currency: 0,
      itemsLength: 0,
    }
  })


  useEffect(() => {
    if (inventario) {
      let totals = 0
      let totalItems = 0
      inventario.data.map((inv: any) => {
        if (inv.cantidad > 0) {
          const precio = parseFloat(inv.movimientoDetalle.precioSImp)
          const total = parseFloat(inv.cantidad) * precio
          totals += total
          totalItems += parseInt(inv.cantidad)
        }

      })

      setData(prev => (
        {
          ...prev,
          inventario: {
            currency: totals,
            itemsLength: totalItems,
          }
        }
      )
      )
    }
  }, [inventario])


  useEffect(() => {
    if (compras) {
      let total = 0

      compras.data.map((inv: any) => {
        total += parseFloat(inv.precioSImp)
      })

      console.log("🚀 > useEffect > total:", total);

      setData(prev => (
        {
          ...prev,
          compras: {
            currency: total,
            itemsLength: compras.data.length,
          }
        }
      )
      )
    }
  }, [compras])

  useEffect(() => {
    if (venta) {
      let total = 0
      venta.data.map((inv: any) => {
        total += parseFloat(inv.precioSImp)
      })

      setData(prev => ({
        ...prev,
        venta: {
          currency: total,
          itemsLength: venta.data.length,
        }
      }))
    }
  }, [venta])

  if (loadingInventario || loadingCompras || loadingVenta) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5">
        <Card className='cursor-pointer'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Inventario
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {utils.formatCurrency(Data.inventario.currency)}
            </div>
            <p className="text-xs text-muted-foreground">
              {Data.inventario.itemsLength} artículos en el inventario
            </p>
          </CardContent>
        </Card>
        <Card className='cursor-pointer'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Costo de compra
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {utils.formatCurrency(Data.compras.currency)}
            </div>
            <p className="text-xs text-muted-foreground">
              {/* {Data.inventario.itemsLength} artículos en el inventario */}
            </p>
          </CardContent>
        </Card>
        <Card className='cursor-pointer'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Costo de venta
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {utils.formatCurrency(Data.venta.currency)}
            </div>
            <p className="text-xs text-muted-foreground">
              {/* {Data.inventario.itemsLength} artículos en el inventario */}
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
