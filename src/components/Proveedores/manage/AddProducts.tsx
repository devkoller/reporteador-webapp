import { useState, useEffect, useRef } from 'react'
import { useFetch, usePost, useToast } from "@/hooks"
import { DataTable, DataTableHandle } from '@/components/utils'
import { ColumnsAddProduct } from "@/components/Proveedores/Column"
import { ProductsType } from "@/types"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"


interface AddProductsProps {
  providerID: number
  refetchProviders: () => void
  setShowAddDialog: (show: boolean) => void
}


export const AddProducts = ({ providerID, refetchProviders, setShowAddDialog }: AddProductsProps) => {
  const { execute, loading: postLoading } = usePost()
  const { toast } = useToast()
  const [Data, setData] = useState({
    products: [],
  })

  const { response: productsData, loading: fetchLoading, refetch: refetchProducts } = useFetch({
    url: `/provider/read/products`,
    qs: {
      providerID: providerID,
    }
  })


  const tableRef = useRef<DataTableHandle<ProductsType>>(null);


  const getSelectedRows = () => {
    if (!tableRef.current) return []
    if (!tableRef.current.getSelectedRows) return []

    return tableRef.current.getSelectedRows()
  }

  const handleSubmit = async () => {
    const selectedRows = getSelectedRows()
    if (selectedRows.length === 0) {
      toast({
        title: "Error",
        description: "Debes seleccionar al menos un producto",
        variant: "destructive",
      })
      return
    }

    let isValid = selectedRows.find((row) => !row.price || row.price <= 0)


    if (isValid) {
      toast({
        title: "Error",
        description: "Debes ingresar un precio válido para todos los productos",
        variant: "destructive",
      })
      return
    }


    const body = {
      products: selectedRows.map((row) => ({
        articuloId: row.id,
        precio: row.price,
        proveedorId: providerID,
      })),
    }

    const { error } = await execute({
      url: `/provider/create/products`,
      body,
    })

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Éxito",
        description: "Productos agregados correctamente",
        variant: "default",
      })
      refetchProducts()
      refetchProviders()
      setShowAddDialog(false)
    }
  }

  useEffect(() => {
    if (productsData) {
      setData((prev) => ({
        ...prev,
        products: productsData.data,
      }))
    }
  }, [productsData])

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <DataTable
        columns={ColumnsAddProduct}
        data={Data.products}
        ref={tableRef}
        pageSize={5}
      />
      <div className="flex justify-between gap-3">
        <Button type="button" variant="outline" disabled={postLoading}>
          Cancelar
        </Button>
        <Button disabled={postLoading} onClick={handleSubmit}>
          {postLoading ? (
            "Guardando..."
          ) : (
            <>
              <ArrowRight className="mr-2 h-4 w-4" />
              Agregar productos
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
