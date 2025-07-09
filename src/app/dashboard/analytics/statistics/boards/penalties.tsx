import { Layout } from "@/components/auth"
import { useEffect, useState } from "react"
import { useFetch, useDynamicFilters } from "@/hooks"
import { Spinner } from "@/components/ui/spinner"

import { Link } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/utils"

import { PenaltiesType } from "@/types"
import { FiltersPanel } from "@/components/utils"
import { GenericChart } from "@/components/utils";

const filterableKeys: (keyof PenaltiesType)[] = [
  'penalizacion_pk',
  'estado',
  'descripcion',
  'fecha',
  'consecutivo_penalizacion',
  'estatus_correo_notificacion',
  'fecha_notificacion',
  'fecha_visualiza',
  'fecha_vedefinitiva',
  'ano',
  'total',
  'observaciones',
  'proveedo_nombre',
  'proveedo_rfc',
  'firma',
  'no_orden',
  'partida',
  'num_licitacion',
  'unidad_hosp_nombre',
  'almacen_deno',
  'fecha_limite',
  'porcentaje',
  'movBanco',
  'referencia',
];

const fastFilterableKeys: (keyof PenaltiesType)[] = [
  'estado'
];

export const Penalties = () => {
  const [rawData, setRawData] = useState<PenaltiesType[]>([]);

  const { response: productivityData, loading, refetch } = useFetch({
    url: "/v1/data/vPenalizaTodos",
    qs: {
    },
    enabled: false
  })

  const {
    filteredData,
    filters,
    searchFilters,
    handleInclude,
    handleExclude,
    handleSearchInclude,
    handleSearchExclude,
  } = useDynamicFilters<PenaltiesType>(
    rawData,
    filterableKeys,
  );

  useEffect(() => {
    refetch();
  }, [])

  useEffect(() => {
    if (productivityData) {
      setRawData(productivityData.data)
    }
  }, [productivityData])

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      </Layout>
    )
  }
  return (
    <Layout>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/estadisticas">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Penalizaciones</h1>
              <p className="text-muted-foreground">
                Monitor de penalizaciones y cumplimiento normativo
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
          </div>
        </div>

        <FiltersPanel<PenaltiesType>
          filteredData={rawData}
          filters={filters}
          searchFilters={searchFilters}
          handleInclude={handleInclude}
          handleExclude={handleExclude}
          handleSearchInclude={handleSearchInclude}
          handleSearchExclude={handleSearchExclude}
          fastFiltersKeys={fastFilterableKeys}
        />

        <Tabs defaultValue="trends" className="space-y-4">
          <TabsList>
            <TabsTrigger value="numbers">Métricas</TabsTrigger>
            <TabsTrigger value="trends">Graficas</TabsTrigger>
            <TabsTrigger value="data">Datos</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <GenericChart
                data={filteredData}
                getKey={item => item.proveedo_nombre || ''}
                sortBy="key"
                chartType="treemap"
                onFilter={val => handleInclude('proveedo_nombre', val)}
                title="Nombre de proveedor"
                description=""
              />
              <GenericChart
                data={filteredData}
                getKey={item => item.unidad_hosp_nombre || ''}
                sortBy="key"
                chartType="bar"
                onFilter={val => handleInclude('unidad_hosp_nombre', val)}
                title="Unidad hospitalaria"
                description=""
              />
              <GenericChart
                data={filteredData}
                getKey={item => item.estado || ''}
                sortBy="key"
                chartType="pie"
                onFilter={val => handleInclude('estado', val)}
                title="Estado"
                description=""
              />
              <GenericChart
                data={filteredData}
                getKey={item => item.fecha || ''}
                sortBy="key"
                chartType="line"
                onFilter={val => handleInclude('fecha', val)}
                title="Fecha de la penalización"
                description=""
              />
              <GenericChart
                data={filteredData}
                getKey={item => item.almacen_deno || ''}
                sortBy="key"
                chartType="bar"
                onFilter={val => handleInclude('almacen_deno', val)}
                title="Almacén"
                description=""
              />
              <GenericChart
                data={filteredData}
                getKey={item => item.estatus_correo_notificacion || ''}
                sortBy="key"
                chartType="bar"
                onFilter={val => handleInclude('estatus_correo_notificacion', val)}
                title="Estado de notificación"
                description=""
              />
              <GenericChart
                data={filteredData}
                getKey={item => item.partida || ''}
                sortBy="key"
                chartType="bar"
                onFilter={val => handleInclude('partida', val)}
                title="Partida"
                description=""
              />
            </div>

          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Datos de Penalizaciones</CardTitle>
              </CardHeader>

              <CardContent>
                <DataTable<PenaltiesType>
                  data={filteredData}
                  columns={[
                    { header: 'ID', accessorKey: 'penalizacion_pk' },
                    { header: 'Estado', accessorKey: 'estado' },
                    { header: 'Descripción', accessorKey: 'descripcion' },
                    { header: 'Fecha', accessorKey: 'fecha' },
                    { header: 'Consecutivo', accessorKey: 'consecutivo_penalizacion' },
                    { header: 'Estatus Notificación', accessorKey: 'estatus_correo_notificacion' },
                    { header: 'Fecha Notificación', accessorKey: 'fecha_notificacion' },
                    { header: 'Fecha Visualización', accessorKey: 'fecha_visualiza' },
                    { header: 'Fecha Vencimiento Definitiva', accessorKey: 'fecha_vedefinitiva' },
                    { header: 'Año', accessorKey: 'ano' },
                    { header: 'Total', accessorKey: 'total' },
                    { header: 'Observaciones', accessorKey: 'observaciones' },
                    { header: 'Proveedor Nombre', accessorKey: 'proveedo_nombre' },
                    { header: 'Proveedor RFC', accessorKey: 'proveedo_rfc' },
                    { header: 'Firma', accessorKey: 'firma' },
                    { header: 'No Orden', accessorKey: 'no_orden' },
                    { header: 'Partida', accessorKey: 'partida' },
                    { header: 'Num Licitación', accessorKey: 'num_licitacion' },
                    { header: 'Unidad Hospitalaria Nombre', accessorKey: 'unidad_hosp_nombre' },
                    { header: 'Almacén Denominación', accessorKey: 'almacen_deno' },
                    { header: 'Fecha Límite', accessorKey: 'fecha_limite' },
                    { header: 'Porcentaje', accessorKey: 'porcentaje' },
                    { header: 'Movimiento Banco', accessorKey: 'movBanco' },
                    { header: 'Referencia', accessorKey: 'referencia' }
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

    </Layout>
  )
}
