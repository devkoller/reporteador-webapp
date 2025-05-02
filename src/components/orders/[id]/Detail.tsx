import { Link } from "react-router-dom"
import { ArrowLeft, Package, User, Calendar, Box, FileText, Printer, Wrench } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SellingOrderType, PurchaseOrderType } from "@/types"
import { format } from "date-fns"
import { RecordShipments } from "./RecordShipments"
import { usePost } from "@/hooks"


interface DetailProps {
  backUrl: string
  type: "selling" | "purchase"
  order: SellingOrderType | PurchaseOrderType
  refetch?: () => void

}

export const Detail = ({ backUrl, type, order, refetch }: DetailProps) => {
  const { execute, loading } = usePost()

  const quantityItems = order.details.reduce((acc, item) => acc + item.quantity, 0)

  const printOrder = async () => {
    let url = type === "selling" ? "/order/print/selling/" : "/order/print/purchase/"
    url += order.id
    execute({
      url,
      method: "get",
    }).then(response => {
      if (response.status === 200) {
        const byteCharacters = atob(response.data)
        const byteNumbers = new Uint8Array(byteCharacters.length)

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i)
        }

        const blob = new Blob([byteNumbers], { type: "application/pdf" })
        const blobURL = URL.createObjectURL(blob)

        // Abrir en una nueva pestaña
        window.open(blobURL, "_blank")
      }
    })
  }


  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" asChild>
              <Link to={backUrl}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Regresar</span>
              </Link>
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">PO-{format(order.createdAt, 'yyyy')}-{order.id}</h2>
            <Badge
              variant={
                order.status === "completed"
                  ? "default"
                  : order.status === "pending"
                    ? "outline"
                    : order.status === "partial"
                      ? "secondary"
                      : "destructive"
              }
            >
              {order.status === "completed"
                ? "Completada"
                : order.status === "pending"
                  ? "Pendiente"
                  : order.status === "partial"
                    ? "Parcial"
                    : "Cancelada"}
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" disabled={loading} onClick={printOrder}>
              <Printer className="mr-2 h-4 w-4" />
              Imprimir orden
            </Button>
            <RecordShipments type={type} order={order} refetch={refetch} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {type === "selling" ? "Cliente" : "Proveedor"}
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {type === "selling" ? (order as SellingOrderType)?.client?.nombre : (order as PurchaseOrderType).provider?.nombre}
              </div>
              <p className="text-xs text-muted-foreground">
                {type === "selling" ? (order as SellingOrderType)?.client?.representanteLegal : (order as PurchaseOrderType).provider?.representanteLegal}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fecha de orden</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{format(order.createdAt, 'yyyy-mm-dd')}</div>
              <p className="text-xs text-muted-foreground">
                Fecha de creación
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${order.total}</div>
              <p className="text-xs text-muted-foreground">{quantityItems} items</p>
            </CardContent>
          </Card>
        </div>

        {/* <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Shipping and payment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-medium">Shipping Information</h4>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-start">
                    <Truck className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Shipping Method</div>
                      <div>{orderData.shippingMethod}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-2 h-4 w-4" />
                    <div>
                      <div className="font-medium">Tracking Number</div>
                      <div>{orderData.trackingNumber}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-2 h-4 w-4" />
                    <div>
                      <div className="font-medium">Shipping Address</div>
                      <div>{orderData.shippingAddress}</div>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="mb-2 text-sm font-medium">Payment Information</h4>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-start">
                    <CreditCard className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Payment Method</div>
                      <div>{orderData.paymentMethod}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-2 h-4 w-4" />
                    <div>
                      <div className="font-medium">Payment Terms</div>
                      <div>{orderData.paymentTerms}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-2 h-4 w-4" />
                    <div>
                      <div className="font-medium">Billing Address</div>
                      <div>{orderData.billingAddress}</div>
                    </div>
                  </div>
                </div>
              </div>
              {orderData.notes && (
                <>
                  <Separator />
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Notes</h4>
                    <p className="text-sm">{orderData.notes}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
              <CardDescription>Status history of this order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-4">
                {orderData.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative flex h-full w-6 items-center justify-center">
                      <div className="absolute h-full w-px bg-muted" />
                      <div
                        className={`relative z-10 h-2 w-2 rounded-full ${index === 0 ? "bg-primary" : "bg-muted-foreground"
                          }`}
                      />
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="text-sm font-medium">{event.status}</div>
                      <div className="text-xs text-muted-foreground">{event.date}</div>
                      <div className="mt-1 text-sm">{event.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div> */}

        <Card>
          <CardHeader>
            <CardTitle>Productos de la orden</CardTitle>
            <CardDescription>Productos, servicios y paquetes que incluyen la orden</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead className="text-center">Tipo</TableHead>
                    <TableHead className="text-right">Cantidad</TableHead>
                    <TableHead className="text-right">Precio</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.details.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {item.isService && `SRV-${item.service?.id}`}
                        {item.isPackage && `PKG-${item.package?.id}`}
                        {!item.isService && !item.isPackage && `PRD-${item.product?.id}`}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                          {item.isService && item.service?.name}
                          {item.isPackage && item.package?.name}
                          {!item.isService && !item.isPackage && item.product?.nombre}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.isPackage && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            <Box className="mr-1 h-3 w-3" />
                            Paquete
                          </span>
                        )}
                        {item.isService && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <Wrench className="mr-1 h-3 w-3" />
                            Servicio
                          </span>
                        )}
                        {!item.service && !item.package && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Package className="mr-1 h-3 w-3" />
                            Producto
                          </span>

                        )}
                      </TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">${item.unitPrice}</TableCell>
                      <TableCell className="text-right">${item.quantity * item.unitPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${order.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>IVA:</span>
                <span>${order.tax}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${order.total}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
