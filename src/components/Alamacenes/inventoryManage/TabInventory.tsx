import { Card, CardContent, CardHeader, } from "@/components/ui/card"
import { Spinner } from '@/components/ui/spinner'
import { AlmacenType } from '@/types'
import { useState, useContext, useEffect } from 'react'
import { useFetch, } from '@/hooks'
import { UserConfigContext } from '@/context/UserConfigContext';
import { InventoryType } from "@/types"
import { DataTable } from '@/components/utils'
import { getColumnsAdjustStock } from "@/components/inventory"
import { Button } from "@/components/ui/button"
import { AddProduct } from "./AddProduct"
import { AdjustStockForm } from "./AdjustStockForm"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"


interface TabInventoryProps {
  warehouse: AlmacenType
}

interface useStateTypeof {
  inventoryData: InventoryType[] | []
  selectedRow: InventoryType | null
  typeForm: number | null
  title: string | null
}

export const TabInventory = ({ warehouse }: TabInventoryProps) => {
  const [open, setOpen] = useState(false)
  const [Data, setData] = useState<useStateTypeof>({
    inventoryData: [],
    selectedRow: null,
    typeForm: null,
    title: null,
  })
  const { config, loading: loadingUserConfig } = useContext(UserConfigContext);

  const { response: warehousesData, loading: loadingFetch, refetch } = useFetch({
    url: "/inventory/read/all",
    qs: {
      enterpriseID: config?.enterprise?.id,
      warehouseID: warehouse.id,
    }
  })

  const updateInventory = () => {
    refetch()
  }

  const adjustStock = (row: InventoryType) => {
    setData(prev => ({
      ...prev,
      typeForm: 2,
      title: 'Ajustar Stock',
      selectedRow: row,
    }))
    setOpen(prev => !prev)
  }

  const openAddProduct = () => {
    setData(prev => ({
      ...prev,
      typeForm: 1,
      title: 'Agregar Producto',
      selectedRow: null,
    }))
    setOpen(prev => !prev)
  }

  const closeDialog = () => {
    setOpen(false)
    setData(prev => ({
      ...prev,
      typeForm: null,
      title: null,
      selectedRow: null,
    }))
  }

  const Columns = getColumnsAdjustStock(adjustStock)

  useEffect(() => {
    if (warehousesData) {
      setData(prev => ({
        ...prev,
        inventoryData: warehousesData.data,
      }))
    }
  }, [warehousesData])



  if (loadingUserConfig || loadingFetch) {
    return (
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Spinner />
        </div>
      </div>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                Inventario actual
              </h2>
              <p className="text-muted-foreground mt-1">
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={openAddProduct}>
                <Plus className="mr-2 h-4 w-4" />
                Agregar articulo
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={Data.inventoryData}
            columns={Columns}
          />
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {Data.title}
            </DialogTitle>
            <DialogDescription>
              {Data.typeForm === 2 &&
                (
                  <>
                    Ajustar el inventario para el producto {Data.selectedRow?.nombre}
                  </>
                )
              }
            </DialogDescription>
            {Data.typeForm === 1 && (
              <>
                <AddProduct
                  warehouse={warehouse}
                  closeDialog={closeDialog}
                  updateInventory={updateInventory}
                />
              </>
            )}
            {Data.typeForm === 2 && (
              <>
                <AdjustStockForm
                  warehouse={warehouse}
                  closeDialog={closeDialog}
                  updateInventory={updateInventory}
                  product={Data.selectedRow}
                />
              </>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
