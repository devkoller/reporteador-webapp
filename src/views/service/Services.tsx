import { Layout } from "@/components/auth"
import { useEffect, useState, useContext } from "react"
import { useFetch } from "@/hooks"
import { UserConfigContext } from "@/context/UserConfigContext"
import { Link } from "react-router-dom"
import { Plus, } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/utils"
import { Columns } from "@/components/products/services/columns"

export const Services = () => {
  const { config, loading: loadingUserConfig } = useContext(UserConfigContext)
  const [servicesData, setServicesData] = useState([])

  const { response: services, loading: loadingFetch } = useFetch({
    url: "/product/read/service",
    qs: {
      enterpriseID: config?.enterprise?.id,
    },
  })

  useEffect(() => {
    if (services) {
      setServicesData(services.data)
    }
  }, [services])

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
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between space-y-4 mb-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Servicios</h2>
            <p className="text-muted-foreground">
              Administra tus servicios de venta y compra
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Link to="/product/service/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Agrega un servicio
              </Button>
            </Link>
          </div>
        </div>
        <div className="">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Resumen de servicios</CardTitle>
                <CardDescription>
                  Lista de todos los servicios disponibles en el sistema
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <DataTable
                  data={servicesData}
                  columns={Columns}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
