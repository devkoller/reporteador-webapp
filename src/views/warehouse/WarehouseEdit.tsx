import { Layout } from '@/components/auth'
import { Spinner } from '@/components/ui/spinner'

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useFetch } from "@/hooks"
import { AlmacenType } from "@/types"

import { TabGeneral, TabContact, TabFacilities } from '@/components/Alamacenes/edit'


interface StateTypeof {
  warehouse?: AlmacenType | null
}

export const WarehouseEdit = () => {
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
                <BreadcrumbLink>Editar almacén</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Editar Almacén: {Data.warehouse.nombre}
              </h1>
              <p className="text-muted-foreground mt-1">
                Actualiza la información del almacén y sus configuraciones
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

        <Tabs defaultValue="general" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="contact">Contacto</TabsTrigger>
            <TabsTrigger value="facilities">
              Instalaciones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6 space-y-6">
            <TabGeneral warehouse={Data.warehouse} />
          </TabsContent>

          <TabsContent value="contact" className="mt-6 space-y-6">
            <TabContact warehouseContact={Data.warehouse.warehouseContact} id_warehouse={Data.warehouse.id} />
          </TabsContent>

          <TabsContent value="facilities" className="mt-6 space-y-6">
            <TabFacilities warehouseFacility={Data.warehouse.warehouseFacility} id_warehouse={Data.warehouse.id} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
