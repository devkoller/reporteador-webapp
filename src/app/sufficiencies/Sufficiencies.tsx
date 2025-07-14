import { Layout } from "@/components/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/utils"
import { useEffect, useState } from "react"
import { useFetch } from "@/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SufficienciesType } from "@/types"
import { Spinner } from "@/components/ui/spinner"

export const Sufficiencies = () => {
  const [data, setData] = useState<SufficienciesType[]>([])

  const { response: sufficiencies, loading } = useFetch({
    url: "/v1/data/sufficiencies",
  })

  useEffect(() => {
    if (sufficiencies) {
      setData(sufficiencies.data)
    }
  }, [sufficiencies])
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
                  <CardTitle>Suficiencias</CardTitle>
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
                    { header: 'Código del articulo', accessorKey: 'cod_bar_mc_pr' },
                    { header: 'Descripción del articulo', accessorKey: 'alm_art_desc' },
                    { header: 'Adjudicado', accessorKey: 'adjudicado' },
                    { header: 'Ejercicio', accessorKey: 'anio' },
                    { header: 'Cantidad licitada', accessorKey: 'cant_lici' },
                    { header: 'Cantidad', accessorKey: 'cantidad' },
                    { header: 'Concepto', accessorKey: 'concepto' },
                    { header: 'Centro', accessorKey: 'corta' },
                    { header: 'Costo licitacion', accessorKey: 'cost_lici' },
                    { header: 'Costo promedio', accessorKey: 'costo' },
                    { header: 'Estado', accessorKey: 'desc_stat' },
                    { header: 'Descripcion', accessorKey: 'descrip' },
                    { header: 'fech_alta', accessorKey: 'fech_alta' },
                    { header: 'fech_cier', accessorKey: 'fech_cier' },
                    { header: 'Folio', accessorKey: 'folio' },
                    { header: 'IVa', accessorKey: 'iva' },
                    { header: 'Partida', accessorKey: 'partida' },
                    { header: 'Presupuesto', accessorKey: 'presupuesto' },
                    { header: 'status', accessorKey: 'status' },
                    { header: 'Tipo gasto', accessorKey: 'tipo_gasto' },
                    { header: 'Tipo suficiencia', accessorKey: 'tipo_sufu' },
                    { header: 'Total licitado', accessorKey: 'tota_lici' },
                    { header: 'Total', accessorKey: 'total' },
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
