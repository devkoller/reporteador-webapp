import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from '@/components/ui/spinner'
import { AlmacenType, InventoryType } from '@/types'
import { useState, useContext, useEffect } from 'react'
import { useFetch } from '@/hooks'
import { UserConfigContext } from '@/context/UserConfigContext';
import { DataTable } from '@/components/utils'
import { getColumnsDetails } from "@/components/inventory"
import { useNavigate } from "react-router-dom"

interface TabInventoryProps {
  warehouse: AlmacenType
}

export const TabInventory = ({ warehouse }: TabInventoryProps) => {
  const navigate = useNavigate()
  const [inventoryData, setInventoryData] = useState<InventoryType[]>([])
  const { config, loading: loadingUserConfig } = useContext(UserConfigContext);

  const { response: inventory, loading: loadingFetch, } = useFetch({
    url: "/inventory/read/all",
    qs: {
      enterpriseID: config?.enterprise?.id,
      warehouseID: warehouse.id,
    }
  })

  useEffect(() => {
    if (inventory) {
      setInventoryData(inventory.data)
    }
  }, [inventory])

  const goToDetails = (row: InventoryType) => {
    navigate(`/warehouse/${warehouse.id}/product/${row.productID}`, {
      state: {
        warehouse: warehouse,
        inventory: row,
      }
    })
  }

  const Columns = getColumnsDetails(goToDetails)



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
    <Card>
      <CardHeader>
        <CardTitle>Inventario actual</CardTitle>
        <CardDescription>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          data={inventoryData}
          columns={Columns}
        />
      </CardContent>
    </Card>
  )
}
