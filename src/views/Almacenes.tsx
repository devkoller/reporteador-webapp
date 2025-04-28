import { Layout } from '@/components/auth'
import { useFetch, usePost } from '@/hooks'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Card,
  CardContent,
  CardDescription, CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom'

import { Button } from "@/components/ui/button"
import { useState, useEffect, useContext } from 'react'
import { FaSpinner } from "react-icons/fa";

import { FormAlamacenes } from '@/components/Alamacenes'
import { AlmacenType } from '@/types'
import { UserConfigContext } from '@/context/UserConfigContext';



type StateTypeof = {
  almacenes: AlmacenType[]
  selectedAlmacen: AlmacenType | null
  SheetTitle: string
}


export const Almacenes = () => {
  const { config, } = useContext(UserConfigContext);
  const { execute } = usePost()
  const [open, setOpen] = useState(false)
  const [Data, setData] = useState<StateTypeof>({
    almacenes: [],
    selectedAlmacen: null,
    SheetTitle: '',
  })

  const { response: almacenesData, loading } = useFetch({
    url: "/warehouse/read/all",
    qs: {
      empresaId: config?.enterprise?.id,
    }
  })


  const handleNewAlmacen = () => {
    setOpen(prev => !prev)
    setData(prev => ({
      ...prev,
      selectedClient: null,
      SheetTitle: 'Nuevo Almacén',
    }))
  }


  const handleSheet = () => {
    setOpen(prev => !prev)
  }


  const update = () => {
    execute({
      url: "/warehouse/read/all",
      method: "get",
    }).then((res) => {
      if (res.status === 200) {
        setData(prev => ({
          ...prev,
          almacenes: res.data
        }))
      }
    })
  }

  const printWarehouse = () => {
    return Data.almacenes.map((warehouse,) => {
      return (
        <Card key={warehouse.id} className="overflow-hidden flex flex-col justify-end">
          <CardHeader className="pb-3">
            <CardTitle>{warehouse.nombre}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              {warehouse.location && (
                <p>
                  {warehouse.location}
                </p>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Capacidad</p>
                <p className="text-lg font-semibold">50%</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Productos</p>
                <p className="text-lg font-semibold">
                  {warehouse.currentProducts}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Badge
                variant={
                  warehouse.status === 1
                    ? "default"
                    : warehouse.status === 2
                      ? "outline"
                      : "secondary"
                }
              >
                {warehouse.status === 1 ? "Activo" : warehouse.status === 2 ? "Mantenimiento" : "Desconocido"}
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 pt-3">
            <Link to={`/warehouse/${warehouse.id}`} className="w-full">
              <Button variant="outline" className="w-full">
                Ver detalles
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )
    })
  }


  useEffect(() => {
    if (almacenesData) {
      setData(prev => ({
        ...prev,
        almacenes: almacenesData.data
      }))
    }
  }, [almacenesData])

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Almacenes</h1>
          <p className="text-muted-foreground mt-1">
            Administra tu inventario en múltiples ubicaciones
          </p>
        </div>
        <Button onClick={handleNewAlmacen}> Agregar almacén</Button>
      </div>
      {loading && (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin h-8 w-8" />
        </div>
      )}
      {!loading &&
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {printWarehouse()}
        </div>
      }
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className=''>
          <SheetHeader>
            <SheetTitle>
              {Data.SheetTitle}
            </SheetTitle>
            <SheetDescription>
            </SheetDescription>
          </SheetHeader>
          <FormAlamacenes
            selectedAlmacen={Data.selectedAlmacen}
            update={update}
            closeSheet={handleSheet}
          />

        </SheetContent>
      </Sheet>
    </Layout>
  )
}
