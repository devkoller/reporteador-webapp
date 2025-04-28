import { Layout } from "@/components/auth"

import { useState, useContext, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Calendar, DollarSign, Package, TrendingUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { UserConfigContext } from '@/context/UserConfigContext';
import { useFetch } from "@/hooks"
import { format, parseISO, } from "date-fns"
import { AlmacenType, InventoryType, InfoMovementsType, inventoryMovementsType } from "@/types"
import { Spinner } from "@/components/ui/spinner"

interface StateTypeof {
  warehouse?: AlmacenType | null
  product?: InventoryType | null
  inputMovements?: InfoMovementsType | null
  outputMovements?: InfoMovementsType | null
  purchaseHistory?: inventoryMovementsType[] | null
  sellsHistory?: inventoryMovementsType[] | null
  lots: any[] | null
}

export const ProductsDetails = () => {
  const { config, } = useContext(UserConfigContext);
  const { productId, id } = useParams()
  const [Data, setData] = useState<StateTypeof>({
    warehouse: null,
    product: null,
    purchaseHistory: [],
    sellsHistory: [],
    lots: [],
  })

  const { response: productData, loading: loadingProduct } = useFetch({
    url: "/inventory/read/product",
    qs: {
      productID: productId,
      enterpriseID: config?.enterprise?.id,
      warehouseID: id,

    }
  })

  const { response: warehouseData, loading: loadingWarehouse } = useFetch({
    url: "/warehouse/read/" + id,
  })

  useEffect(() => {
    if (productData) {
      setData(prev => ({
        ...prev,
        product: productData.data.product,
        inputMovements: productData.data.inputMovements,
        outputMovements: productData.data.outputMovements,
        purchaseHistory: productData.data?.inputMovements?.move,
        sellsHistory: productData.data?.outputMovements?.move,
        lots: productData.data?.lots,
      }))
    }
  }, [productData])

  useEffect(() => {
    if (warehouseData) {

      setData(prev => ({
        ...prev,
        warehouse: warehouseData.data,
      }))
    }
  }, [warehouseData])

  function calcularBeneficioPorcentaje(precioCompra: number, precioVenta: number) {
    const beneficio = precioVenta - precioCompra;
    const porcentaje = (beneficio / precioCompra) * 100;
    return parseFloat(porcentaje.toFixed(2)); // redondea a 2 decimales
  }


  if (loadingProduct || loadingWarehouse) {
    return (
      <Layout>
        <div className="">
          <h1 className="text-3xl font-bold">Cargando...</h1>
          <Spinner />
        </div>
      </Layout>
    )
  }

  if (Data.warehouse === null || Data.product === null) {
    return (
      <Layout>
        <div className="">
          <h1 className="text-3xl font-bold">Producto no encontrado</h1>
          <Link to={"/warehouse/" + id}>
            <Button className="mt-4">Regresar al almacén</Button>
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="">
        <div className="mb-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/warehouse">Almacenes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/warehouse/${id}`}>{Data.warehouse?.nombre}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>Detalles del producto</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">{Data.product?.nombre || ""}</h1>
                <Badge
                  variant={
                    Data.product?.status === 'En Stock'
                      ? "default"
                      : Data.product?.status === 'Bajo Stock'
                        ? "outline"
                        : "destructive"
                  }
                >
                  {Data.product?.status}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">{Data.product?.SKU}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to={`/warehouse/${id}`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Regresar
                </Link>
              </Button>
              <Button variant="outline">Editar producto</Button>
              <Button>Ajustar Stock</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Inventario actual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Package className="h-5 w-5 mr-2 text-muted-foreground" />
                <div className="text-2xl font-bold">{Data.product?.currentStock}</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Ultimo precio de compra</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
                <div className="text-2xl font-bold">${Data.inputMovements?.lastPrice}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Precio promedio: ${Data.inputMovements?.average}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Margen de beneficio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-muted-foreground" />
                <div className="text-2xl font-bold">{
                  !Data.outputMovements?.average ? 0 : calcularBeneficioPorcentaje(Data.inputMovements?.average || 0, Data.outputMovements?.average || 0)}%</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Costo promedio: ${Data.outputMovements?.average || 0}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Ultima actualización</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                <div className="text-2xl font-bold">{format(parseISO(Data.product?.updatedAt || ''), "MMMM d, yyyy")}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Información del producto</CardTitle>
              <CardDescription>Información detallada del producto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Categoría</h3>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Marca</h3>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Dimensiones</h3>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Peso</h3>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Material</h3>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Garantía</h3>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Código de barras</h3>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Descripción</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Inventario resumido
              </CardTitle>
              <CardDescription>
                Estatus actual del inventario
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Compras totales:</span>
                  <span className="font-medium">{Data.inputMovements?.sumQuantity} unidades</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Ventas totales:</span>
                  <span className="font-medium">{Data.outputMovements?.sumQuantity || 0} unidades</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Inventario actual:</span>
                  <span className="font-medium">{Data.product?.currentStock} unidades</span>
                </div>
                <div className="border-t pt-4">
                  <span className="text-sm text-muted-foreground">Valor del inventario:</span>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm">Al costo:</span>
                    <span className="font-medium">${((Data.product?.currentStock ?? 0) * (Data.inputMovements?.average ?? 0)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm">A la venta:</span>
                    <span className="font-medium">${((Data.product?.currentStock || 0) * (Data.outputMovements?.average || 0)).toFixed(2)}</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <span className="text-sm text-muted-foreground">Localización:</span>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm">Almacén:</span>
                    <span className="font-medium">{Data.warehouse?.nombre}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="lots" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lots">Lotes</TabsTrigger>
            <TabsTrigger value="purchases">Historial de compras</TabsTrigger>
            <TabsTrigger value="sales">Historial de ventas</TabsTrigger>
          </TabsList>

          <TabsContent value="lots" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle>Lotes del inventario</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Numero de lote</TableHead>
                        <TableHead>Fecha de llegada</TableHead>
                        <TableHead>Fecha de expiración</TableHead>
                        <TableHead className="text-right">Inventario inicial</TableHead>
                        <TableHead className="text-right">Inventario actual</TableHead>
                        <TableHead className="text-right">Precio unitario</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Data.lots?.map((lot) => {
                        let details = lot.details

                        let expirationDate = new Date(lot.expirationDate).getTime()

                        return (
                          <TableRow key={lot.id}>
                            <TableCell className="font-medium">LOT-{lot.id}</TableCell>

                            <TableCell>
                              {format(parseISO(lot.createdAt), "MMMM d, yyyy")}
                            </TableCell>
                            <TableCell>
                              {!isNaN(expirationDate) && expirationDate
                                ? format(parseISO(lot.expirationDate), "MMMM d, yyyy")
                                : '-'}
                            </TableCell>
                            <TableCell className="text-right">{details.quantity}</TableCell>
                            <TableCell className="text-right">{lot.availableQuantity}</TableCell>
                            <TableCell className="text-right">${details.unitPrice}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="purchases" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle>Historial de compras</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Exportar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Numero de orden</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Proveedor</TableHead>
                        <TableHead>Lote</TableHead>
                        <TableHead className="text-right">Cantidad</TableHead>
                        <TableHead className="text-right">Precio unitario</TableHead>
                        <TableHead className="text-right">Precio total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Data.purchaseHistory?.map((purchase: any) => {
                        let quantity = purchase.details[0].quantity
                        let unitPrice = purchase.details[0].unitPrice
                        let lots = purchase.details[0].lots
                        return (
                          <TableRow key={purchase.id}>
                            <TableCell className="font-medium">P{purchase.typeMovement}-{purchase.id}</TableCell>
                            <TableCell>{format(parseISO(purchase.createdAt), "MMMM d, yyyy")}</TableCell>
                            <TableCell>{purchase?.provider?.nombre || '-'}</TableCell>
                            <TableCell>LOT-{lots.id}</TableCell>
                            <TableCell className="text-right">{quantity}</TableCell>
                            <TableCell className="text-right">${unitPrice}</TableCell>
                            <TableCell className="text-right">${unitPrice * quantity}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle>Historial de venta</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Numero de orden</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Proveedor</TableHead>
                        <TableHead>Lote</TableHead>
                        <TableHead className="text-right">Cantidad</TableHead>
                        <TableHead className="text-right">Precio unitario</TableHead>
                        <TableHead className="text-right">Precio total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Data.sellsHistory?.map((purchase: any) => {
                        let quantity = purchase.details[0].quantity
                        let unitPrice = purchase.details[0].unitPrice
                        let lots = purchase.details[0].lots
                        return (
                          <TableRow key={purchase.id}>
                            <TableCell className="font-medium">P{purchase.typeMovement}-{purchase.id}</TableCell>
                            <TableCell>{format(parseISO(purchase.createdAt), "MMMM d, yyyy")}</TableCell>
                            <TableCell>{purchase?.provider?.nombre || '-'}</TableCell>
                            <TableCell>LOT-{lots.id}</TableCell>
                            <TableCell className="text-right">{quantity}</TableCell>
                            <TableCell className="text-right">${unitPrice}</TableCell>
                            <TableCell className="text-right">${unitPrice * quantity}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
