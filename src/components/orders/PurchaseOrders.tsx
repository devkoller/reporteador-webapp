import { Link } from "react-router-dom"
import { MoreHorizontal, ArrowDownCircle, Calendar, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PurchaseOrderType } from "@/types"
import { format } from "date-fns"

interface PurchaseOrdersProps {
  purchaseOrders: PurchaseOrderType[]
}

export const PurchaseOrders = ({ purchaseOrders }: PurchaseOrdersProps) => {

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Ordenes de compra</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ordenes</CardTitle>
            <CardDescription>
              Administra tus ordenes de compra para tus proveedores.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Orden ID</TableHead>
                      <TableHead>Proveedor</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Productos</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Estatus</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchaseOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No se encontraron ordenes
                        </TableCell>
                      </TableRow>
                    ) : (
                      purchaseOrders.map((order) => {
                        const totalProducts = order.details.reduce((acc, item) => acc + item.quantity, 0)

                        return (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <ArrowDownCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                                PO-{format(new Date(order.createdAt), "yyyy")}-{order.id}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Truck className="mr-2 h-4 w-4 text-muted-foreground" />
                                {order.provider.nombre}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                {format(new Date(order.createdAt), "dd/MM/yyyy")}
                              </div>
                            </TableCell>
                            <TableCell>{totalProducts}</TableCell>
                            <TableCell>{order.total}</TableCell>
                            <TableCell>
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
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Abrir menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                  <DropdownMenuItem asChild>
                                    <Link to={`/order/purchase/${order.id}`}>Ver detalles</Link>
                                  </DropdownMenuItem>
                                  {/* <DropdownMenuItem>Update status</DropdownMenuItem> */}
                                  {/* <DropdownMenuItem>Print order</DropdownMenuItem> */}
                                  <DropdownMenuSeparator />
                                  {/* <DropdownMenuItem className="text-red-600">Cancel order</DropdownMenuItem> */}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    )}
                  </TableBody>
                </Table>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
