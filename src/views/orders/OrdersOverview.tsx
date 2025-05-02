import { Layout } from "@/components/auth";

import { Link } from "react-router-dom"
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Overview, PurchaseOrders, SellingOrders } from "@/components/orders"

import { useEffect, useState, useContext } from "react"
import { UserConfigContext } from "@/context/UserConfigContext";
import { useFetch } from "@/hooks";
import { Spinner } from "@/components/ui/spinner"
import { PurchaseOrderType, SellingOrderType } from "@/types";


interface StateTypeof {
  purchaseOrders: PurchaseOrderType[]
  sellingOrders: SellingOrderType[]
}


export const OrdersOverview = () => {
  const { config } = useContext(UserConfigContext)
  const [Data, setData] = useState<StateTypeof>({
    purchaseOrders: [],
    sellingOrders: []
  })

  const { response: ordersData, loading } = useFetch({
    url: "/order/read/all",
    qs: {
      enterpriseID: config?.enterprise.id,
    }
  })


  useEffect(() => {
    if (ordersData) {
      setData(prev => ({
        ...prev,
        purchaseOrders: ordersData.data?.purchaseOrders,
        sellingOrders: ordersData.data?.salesOrders
      }))

    }

  }, [ordersData])




  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Administrador de ordenes
            </h2>
            <div className="flex items-center space-x-2">
              <Button asChild variant="outline">
                <Link to="/order/purchase/new">
                  <ArrowDownCircle className="mr-2 h-4 w-4" />
                  Nueva Orden de Compra
                </Link>
              </Button>
              <Button asChild>
                <Link to="/order/selling/new">
                  <ArrowUpCircle className="mr-2 h-4 w-4" />
                  Nueva Orden de Venta
                </Link>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">General</TabsTrigger>
              <TabsTrigger value="selling">Ordenes de venta</TabsTrigger>
              <TabsTrigger value="buying">Ordenes de compra</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Overview purchaseOrders={Data.purchaseOrders} sellingOrders={Data.sellingOrders} />
            </TabsContent>

            <TabsContent value="buying">
              <PurchaseOrders purchaseOrders={Data.purchaseOrders} />
            </TabsContent>

            <TabsContent value="selling">
              <SellingOrders sellingOrders={Data.sellingOrders} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  )
}
