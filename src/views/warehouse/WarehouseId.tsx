import { Layout } from '@/components/auth'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ArrowLeft, Edit, MapPin, Package, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from '@/components/ui/spinner'
import { AlmacenType } from '@/types'
import { useFetch } from '@/hooks'
import { useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"

import {
  TabInventory,
  TabDetails,
  // TabShipments
} from '@/components/Alamacenes/id'




interface StateTypeof {
  warehouse?: AlmacenType | null
}

export const WarehouseId = () => {
  const { id } = useParams()
  const [Data, setData] = useState<StateTypeof>({
    warehouse: null,
  })

  const { response: almacenesData, loading } = useFetch({
    url: "/warehouse/read/" + id,
  })


  useEffect(() => {
    if (almacenesData) {
      setData(prev => ({
        ...prev,
        warehouse: almacenesData.data,
      }))
    }
  }, [almacenesData])



  if (loading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  if (!Data.warehouse) {
    return (
      <Layout>
        <div className="container mx-auto py-5">
          <h1 className="text-3xl font-bold">El almacén no fue encontrado</h1>
          <Link to="/warehouse">
            <Button className="mt-4">Regresar a la lista de almacenes</Button>
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="">
        <div className="mb-8">
          <Link to="/warehouse" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Regresar a almacenes
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {Data.warehouse.nombre}
              </h1>
              <div className="flex items-center mt-2">
                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                <p className="text-muted-foreground">
                  {Data.warehouse.address}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to={`/warehouse/${id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Link>
              </Button>
              <Button asChild>
                <Link to={`/warehouse/${id}/inventory/manage`}>Administrar inventario</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Capacidad de uso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">50%</div>
              <Progress value={50} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground mt-2">{100 - 50}% espacio disponible</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Productos totales</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <Package className="h-5 w-5 mr-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{Data.warehouse.currentProducts}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Estado del almacén</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                className="text-sm"
                variant={
                  Data.warehouse.status === 1 ? "default" : Data.warehouse.status === 2 ? "outline" : "secondary"
                }
              >
                {Data.warehouse.status === 1 ? "Activo" : Data.warehouse.status === 2 ? "Mantenimiento" : "Desconocido"}
              </Badge>
              <p className="text-xs text-muted-foreground mt-2">Ultima actualización: {Data.warehouse?.updatedAt || ''}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="inventory" className="mb-8">
          <TabsList className='mb-4'>
            <TabsTrigger value="inventory">Inventario</TabsTrigger>
            <TabsTrigger value="details">Detalles del almacén</TabsTrigger>
            {/* <TabsTrigger value="shipments">Envíos</TabsTrigger> */}
          </TabsList>
          <TabsContent value="inventory" className="mt-6">
            <TabInventory warehouse={Data.warehouse} />
          </TabsContent>
          <TabsContent value="details" className="mt-6">
            <TabDetails warehouse={Data.warehouse} />
          </TabsContent>
          {/* <TabsContent value="shipments" className="mt-6">
            <TabShipments warehouse={Data.warehouse} />
          </TabsContent> */}
        </Tabs>

      </div>
    </Layout>
  )
}
