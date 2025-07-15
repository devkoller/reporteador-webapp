import { Layout } from "@/components/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/utils"
import { useEffect, useState } from "react"
import { useFetch } from "@/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ContractType } from "@/types"
import { Spinner } from "@/components/ui/spinner"

export const Orders = () => {
  const [data, setData] = useState<ContractType[]>([])

  const { response: ordersData, loading } = useFetch({
    url: "/v1/data/orders",
  })

  useEffect(() => {
    if (ordersData) {
      setData(ordersData.data)
    }
  }, [ordersData])

  return (
    <Layout>
      <Tabs defaultValue="contracts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contracts">Tabla de información</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Ordenes de compra</CardTitle>
                  <CardDescription>Información</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <Spinner />
                </div>
              ) : (
                <DataTable
                  data={data}
                  columns={[
                    { header: 'Ejercicio', accessorKey: 'año' },
                    { header: 'Numero de orden', accessorKey: 'no_orden' },
                    { header: 'Numero de pedido', accessorKey: 'no_ped' },
                    { header: 'Licitación', accessorKey: 'num_licitacion' },
                    { header: 'Código del articulo', accessorKey: 'cod_bar_mc_pr' },
                    { header: 'Descripcion', accessorKey: 'descripcion' },
                    { header: 'Cantidad', accessorKey: 'cantidad' },
                    { header: '$ Precio', accessorKey: 'precio' },
                    { header: 'Cantidad Cancelada', accessorKey: 'cant_cancelada' },
                    { header: '$ Subtotal orden', accessorKey: 'subtotal_ord' },
                    { header: '$ Subtotal pedido', accessorKey: 'subtotal_ped' },
                    { header: '$ Total orden', accessorKey: 'total_ord' },
                    { header: 'Centro', accessorKey: 'centro' },
                    { header: 'Almacén', accessorKey: 'almacen_deno' },
                    {
                      header: 'Cinco al millar', accessorKey: 'cinco_al_millar',
                      cell: (info) => info.getValue() ? "Sí" : "No"

                    },
                    { header: 'Condiciones de pago', accessorKey: 'condiciones_pago' },
                    { header: 'Estado de la orden', accessorKey: 'estado_ord' },
                    { header: 'Estado del pedido', accessorKey: 'estado_ped' },
                    { header: 'Fecha de envió', accessorKey: 'fecha_envio' },
                    { header: 'Fondeo orden', accessorKey: 'fondeo_ord' },
                    { header: 'Fondeo pedido', accessorKey: 'fondeo_ped' },
                    { header: 'IVA', accessorKey: 'iva' },
                    { header: '$ IVA Orden', accessorKey: 'iva_ord' },
                    { header: '$ IVA Pedido', accessorKey: 'iva_ped' },
                    { header: 'Monto ieps', accessorKey: 'monto_ieps' },
                    { header: 'Objeto del gasto Orden', accessorKey: 'og_ord' },
                    { header: 'Objeto del gasto Pedido', accessorKey: 'og_ped' },
                    { header: '% ieps', accessorKey: 'porciento_ieps' },
                    { header: 'Proveedor', accessorKey: 'proveedo_nom' },
                    { header: 'Servicio orden', accessorKey: 'servicio_ord' },
                    { header: 'Servicio pedido', accessorKey: 'servicio_ped' },
                    { header: 'Suministro orden', accessorKey: 'suministro_ord' },
                    { header: 'Suministro pedido', accessorKey: 'suministro_ped' },
                    { header: 'Tiempo de entrega', accessorKey: 'tiempo_entrega' },
                  ]}
                />
              )}

            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  )
}
