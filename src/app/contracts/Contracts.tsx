import { Layout } from "@/components/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/utils"
import { useEffect, useState } from "react"
import { useFetch } from "@/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ContractType } from "@/types"
import { Spinner } from "@/components/ui/spinner"


export const Contracts = () => {
  const [data, setData] = useState<ContractType[]>([])

  const { response: contractsData, loading } = useFetch({
    url: "/v1/data/contracts",
  })

  useEffect(() => {
    if (contractsData) {
      setData(contractsData.data)
    }
  }, [contractsData])


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
                  <CardTitle>Contratos</CardTitle>
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
                    { header: "Número de licitación", accessorKey: "num_licitacion" },
                    { header: "Nombre del proveedor", accessorKey: "proveedo_nom" },
                    { header: "Descripción del articulo", accessorKey: "art_mc_nom" },
                    { header: "Presentación", accessorKey: "presentacion" },
                    { header: "marca", accessorKey: "marca" },
                    { header: "Código", accessorKey: "codigo" },
                    { header: "Consumido", accessorKey: "consumido" },
                    { header: "Consumo", accessorKey: "consumo" },
                    { header: "Máximo", accessorKey: "max" },
                    { header: "Máximo (dinero)", accessorKey: "maximo_dinero" },
                    { header: "Mínimo", accessorKey: "min" },
                    { header: "Mínimo (dinero)", accessorKey: "minio_dinero" },
                    { header: "Precio unitario (Sin IVA)", accessorKey: "precio" },
                    { header: "Partida", accessorKey: "cta_contable" },
                    { header: "Ejercicio", accessorKey: "ejercicio" },
                    { header: "Fecha", accessorKey: "fecha" },
                    { header: "Centro", accessorKey: "unidad" },
                    { header: "Vigencia Inicio", accessorKey: "vigencia_inicio" },
                    { header: "Vigencia Fin", accessorKey: "vigencia_fin" },
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
