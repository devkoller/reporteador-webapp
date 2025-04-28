import { useState, useEffect, useContext } from "react"
import { useFetch } from "@/hooks"
import { Layout } from "@/components/auth"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Edit, Mail, Phone, MapPin, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ProveedorType } from "@/types"
import { Spinner } from "@/components/ui/spinner"
import { ProviderProductsList } from "@/components/Proveedores/[id]/ProviderProductsList"
import { UserConfigContext } from "@/context/UserConfigContext"


interface StateTypeof {
  provider: ProveedorType | null
}

export const ProviderDetails = () => {
  const { id } = useParams()
  const { config, loading } = useContext(UserConfigContext)
  const [Data, setData] = useState<StateTypeof>({
    provider: null,
  })

  if (loading) {
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    </Layout>
  }

  const { response: providersData, loading: fetchLoading } = useFetch({
    url: `/provider/read/${id}`,
    qs: {
      enterpriseID: config?.enterprise?.id,
    },
  })

  useEffect(() => {
    if (providersData) {
      setData((prev) => ({
        ...prev,
        provider: providersData.data,
      }))
    }
  }, [providersData])

  if (fetchLoading) {
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
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" asChild>
                <Link to="/provider">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Regresar</span>
                </Link>
              </Button>
              <h2 className="text-3xl font-bold tracking-tight">{Data.provider?.nombre}</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button asChild>
                <Link to={`/provider/${id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar proveedor
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to={`/provider/${id}/products`}>
                  <Package className="mr-2 h-4 w-4" />
                  Administrar productos
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Representante legal</CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Data.provider?.representanteLegal}</div>
                <p className="text-xs text-muted-foreground">Contacto</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Productos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Productos suministrados por este proveedor
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="products" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">
                Resumen
              </TabsTrigger>
              <TabsTrigger value="products">Productos</TabsTrigger>
              {/* <TabsTrigger value="orders">Ordenes</TabsTrigger> */}
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Acerca de</CardTitle>
                  <CardDescription>
                    Información general sobre el proveedor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Separator className="my-4" />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-sm font-medium">Información del proveedor</h4>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{Data.provider?.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{Data.provider?.telefono}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{Data.provider?.direccionCalle}, {Data.provider?.direccionCiudad} </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-medium">Información adicional</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="font-medium">Categoría:</div>
                        <div>-</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Productos</CardTitle>
                  <CardDescription>
                    Productos suministrados por este proveedor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProviderProductsList products={Data.provider?.products} />
                </CardContent>
              </Card>
            </TabsContent>


            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ordenes</CardTitle>
                  <CardDescription>
                    Compras recientes a este proveedor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* {providerData.orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-center">
                          <Badge variant="outline">{order.status}</Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{order.amount}</p>
                          <p className="text-sm text-muted-foreground">{order.items} items</p>
                        </div>
                      </div>
                    ))} */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  )
}
