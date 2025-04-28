import { Layout } from "@/components/auth"
import { useState, useEffect, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { useFetch } from "@/hooks"
import { ArrowLeft, Plus, } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ProveedorType } from "@/types"
import { Spinner } from "@/components/ui/spinner"
import { AddProducts } from "@/components/Proveedores/manage/AddProducts"
import { DataTable } from "@/components/utils"
import { productProviderActions } from "@/components/Proveedores"
import { ProductsType } from "@/types"
import { UserConfigContext } from "@/context/UserConfigContext"



interface StateTypeof {
  provider: ProveedorType | null
  products: ProductsType[]
}

export const ManagesProducts = () => {
  const { id } = useParams()
  const { config, loading } = useContext(UserConfigContext)

  const [showAddDialog, setShowAddDialog] = useState(false)

  const [Data, setData] = useState<StateTypeof>({
    provider: null,
    products: [],
  })

  const { response: providersData, loading: fetchLoading, refetch } = useFetch({
    url: `/provider/read/${id}`,
    qs: {
      enterpriseID: config?.enterprise?.id,
    },
  })


  // Handle removing a product from provider
  const handleRemoveProduct = (row: ProductsType) => {
    console.log("🚀 > ManageProducts.tsx:43 > handleRemoveProduct > row:", row);
  }

  const ColumnsProductProvider = productProviderActions({ handleRemoveProduct })

  useEffect(() => {
    if (providersData) {
      setData((prev) => ({
        ...prev,
        provider: providersData.data,
        products: providersData.data.products,
      }))
    }
  }, [providersData])

  if (fetchLoading || loading) {
    return (
      <Layout>
        <Spinner />
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
                <Link to={`/provider/${id}`}>
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Regresar</span>
                </Link>
              </Button>
              <h2 className="text-3xl font-bold tracking-tight">Administrar productos</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Agregar productos
              </Button>
            </div>
          </div>


          <Card>
            <CardHeader>
              <CardTitle>Productos de {Data.provider?.nombre}</CardTitle>
              <CardDescription>
                Administra los productos ofrecidos por este proveedor. Agrega nuevos productos o actualiza los existentes.
              </CardDescription>
            </CardHeader>
            <CardContent>


              <DataTable
                columns={ColumnsProductProvider}
                data={Data.products}
              />


            </CardContent>
          </Card>
        </div>

        {/* Add Products Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Agregar productos al proveedor</DialogTitle>
              <DialogDescription>
                Selecciona los productos que deseas agregar a {Data.provider?.nombre}. Puedes filtrar por categoría o buscar productos específicos.
              </DialogDescription>
            </DialogHeader>


            <AddProducts providerID={id ? parseInt(id) : 0} refetchProviders={refetch} setShowAddDialog={setShowAddDialog} />
            {/* <ScrollArea className="h-[300px] rounded-md border p-4">
            </ScrollArea> */}

          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}
