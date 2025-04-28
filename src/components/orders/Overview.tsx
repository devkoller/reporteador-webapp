
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, ArrowDownCircle, ArrowUpCircle } from "lucide-react"
import { PurchaseOrderType, SellingOrderType } from "@/types";
import { format } from "date-fns"
import moment from "moment"

interface OverviewProps {
  purchaseOrders: PurchaseOrderType[]
  sellingOrders: SellingOrderType[]
}

export const Overview = ({ purchaseOrders, sellingOrders }: OverviewProps) => {
  let totalOrdersPending = 0
  purchaseOrders.forEach((order) => {
    if (order.status === "pending") {
      totalOrdersPending += 1
    }
  })
  sellingOrders.forEach((order) => {
    if (order.status === "pending") {
      totalOrdersPending += 1
    }
  })
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ordenes totales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{
              (purchaseOrders.length + sellingOrders.length).toLocaleString()
            }</div>
            {/* <p className="text-xs text-muted-foreground">+12% from last month</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ordenes de venta</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{
              sellingOrders.length.toLocaleString()
            }</div>
            {/* <p className="text-xs text-muted-foreground">+18% from last month</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ordenes de compra</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{
              purchaseOrders.length.toLocaleString()
            }</div>
            {/* <p className="text-xs text-muted-foreground">+5% from last month</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ordenes pendientes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrdersPending}</div>
            {/* <p className="text-xs text-muted-foreground">-8% from last month</p> */}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              Ordenes de Venta Recientes
            </CardTitle>
            <CardDescription>
              Ultimas ordenes de venta realizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sellingOrders.map((i: SellingOrderType) => (
                <div key={i.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">Orden #SO-{moment(i.createdAt).format('YYYY')}-{100 + i.id}</p>
                    <p className="text-sm text-muted-foreground">{i.client.nombre}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${i.total.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{format(i.createdAt, "EEEE, MMMM d, yyyy")}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              Ordenes de Compra Recientes
            </CardTitle>
            <CardDescription>
              Ultimas ordenes de compra realizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {purchaseOrders.map((i) => (
                <div key={i.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">Orden #PO-{moment(i.createdAt).format('YYYY')}-{100 + i.id}</p>
                    <p className="text-sm text-muted-foreground">{i.provider.nombre}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${i.total.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{format(i.createdAt, "EEEE, MMMM d, yyyy")}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
