import { Layout } from '@/components/auth'
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Building2, Edit, MapPin, } from "lucide-react"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFetch } from "@/hooks"
import { Spinner } from '@/components/ui/spinner'
import { EnterpriseType } from '@/types'

export const EnterpriseDetails = () => {
  const { id } = useParams()
  const [enterprise, setEnterprise] = useState<EnterpriseType>()

  const { response: enterpriseFetchData, loading } = useFetch({
    url: `/enterprise/read/${id}`,
  })


  useEffect(() => {
    if (enterpriseFetchData) {
      setEnterprise(enterpriseFetchData.data)
    }
  }, [enterpriseFetchData])


  if (loading) {
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
                <Link to="/enterprise">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Regresar</span>
                </Link>
              </Button>
              <h2 className="text-3xl font-bold tracking-tight">{enterprise?.descripcion}</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button asChild>
                <Link to={`/enterprise/${id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar empresa
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Localización</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{enterprise?.location}</div>
                <p className="text-xs text-muted-foreground">Sede</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Almacenes</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{enterprise?.warehouse?.length}</div>
                <p className="text-xs text-muted-foreground">Almacenes activos</p>
              </CardContent>
            </Card>
          </div>

          {/* <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                  <CardDescription>Enterprise description and details</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{enterpriseData.description}</p>
                  <Separator className="my-4" />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-sm font-medium">Enterprise Information</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="font-medium">Status:</div>
                        <div className="capitalize">{enterpriseData.status}</div>
                        <div className="font-medium">Location:</div>
                        <div>{enterpriseData.location}</div>
                        <div className="font-medium">Employees:</div>
                        <div>{enterpriseData.employees}</div>
                        <div className="font-medium">Established:</div>
                        <div>{enterpriseData.established}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-medium">Monthly Revenue</h4>
                      <div className="h-[200px] w-full">
                        <div className="flex h-full items-end gap-2">
                          {enterpriseData.monthlyRevenue.map((item) => (
                            <div key={item.month} className="relative flex w-full flex-col items-center">
                              <div
                                className="w-full bg-primary"
                                style={{
                                  height: `${(item.amount / 80000) * 100}%`,
                                }}
                              ></div>
                              <span className="mt-2 text-xs">{item.month}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="warehouses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Warehouses</CardTitle>
                  <CardDescription>Storage facilities managed by this enterprise</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {enterpriseData.warehouses.map((warehouse) => (
                      <Card key={warehouse.id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                          <CardDescription>{warehouse.location}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="font-medium">Capacity:</div>
                            <div>{warehouse.capacity}</div>
                            <div className="font-medium">Items:</div>
                            <div>{warehouse.items}</div>
                          </div>
                          <div className="mt-4">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/warehouse/${warehouse.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest inventory movements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {enterpriseData.recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <p className="font-medium">{transaction.type}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{transaction.items} items</p>
                          <p className="text-sm text-muted-foreground">{transaction.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs> */}
        </div>
      </div>
    </Layout>
  )
}
