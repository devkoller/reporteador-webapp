import { Layout, } from '@/components/auth'
import { useState, useEffect, useContext } from "react"
// import { Link } from "react-router-dom"
// import { Plus } from "lucide-react"
// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserConfigContext } from '@/context/UserConfigContext';
import { useFetch } from '@/hooks';
import { Spinner } from '@/components/ui/spinner'
import { InventoryType } from "@/types"
import { DataTable } from '@/components/utils'
import { Columns } from "@/components/inventory"


export const Inventory = () => {
  const [inventoryData, setInventoryData] = useState<InventoryType[]>([])
  const { config, loading: loadingUserConfig } = useContext(UserConfigContext);

  const { response: inventory, loading: loadingFetch } = useFetch({
    url: "/inventory/read/all",
    qs: {
      enterpriseID: config?.enterprise?.id,
    }
  })

  useEffect(() => {
    if (inventory) {
      setInventoryData(inventory.data)
    }
  }, [inventory])

  if (loadingUserConfig || loadingFetch) {
    return (
      <Layout>
        <div className="flex flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <Spinner />
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Administrador de inventario</h2>
            {/* <div className="flex items-center space-x-2">
              <Button asChild>
                <Link to="/inventory/add">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar articulo
                </Link>
              </Button>
            </div> */}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Inventario</CardTitle>
              <CardDescription>
                Administra tu inventario de productos en todos los almacenes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={inventoryData}
                columns={Columns}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
