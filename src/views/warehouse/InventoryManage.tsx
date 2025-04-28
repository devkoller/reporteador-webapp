import { Layout } from "@/components/auth"
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useFetch } from "@/hooks"
import { AlmacenType } from "@/types"

import { TabInventory } from "@/components/Alamacenes"
import { TabTransfer } from "@/components/Alamacenes"

interface StateTypeof {
  warehouse?: AlmacenType | null
}

export const InventoryManage = () => {
  const { id } = useParams()

  const [Data, setData] = useState<StateTypeof>({
    warehouse: null,
  })

  const { response: almacenesData } = useFetch({
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

  if (!Data.warehouse) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold">Almacén no encontrado</h1>
        <Link to="/warehouse">
          <Button className="mt-4">Regresar a almacenes</Button>
        </Link>
      </div>
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
                <BreadcrumbLink href={`/warehouse/${id}`}>{Data.warehouse.nombre}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>Administrar inventario</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Administrar inventario: {Data.warehouse.nombre}
              </h1>
              <p className="text-muted-foreground mt-1">
                Agregar, ajustar y transferir inventario para {Data.warehouse.nombre}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to={`/warehouse/${id}`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Regresar
                </Link>
              </Button>
            </div>
          </div>

        </div>

        <Tabs defaultValue="inventory" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inventory">Inventario</TabsTrigger>
            <TabsTrigger value="transfer">
              Transferir Stock
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="mt-6">
            <TabInventory warehouse={Data.warehouse} />
          </TabsContent>


          <TabsContent value="transfer" className="mt-6">
            <TabTransfer warehouse={Data.warehouse} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
