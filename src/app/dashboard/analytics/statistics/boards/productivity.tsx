import { Layout } from "@/components/auth"
import { useEffect, useState } from "react"
import { useFetch, useDynamicFilters } from "@/hooks"
import { Spinner } from "@/components/ui/spinner"
import { DateRange } from "react-day-picker"

import { Link } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { DatePickerWithRange } from "@/components/utils"
import { subDays, format } from "date-fns"

import { ProductivityType } from "@/types"
import { FiltersPanel } from "@/components/utils"
import { GenericChart } from "@/components/utils";
import { getAgeGroup } from "@/utils/functions"



const filterableKeys: (keyof ProductivityType)[] = [
  'Agenda',
  'CITAS_AÑO',
  'CITAS_SERV_AÑO',
  'Cita',
  'Diagnostico',
  'EdadDias',
  'EdadMeses',
  'EstadoCita',
  'Estado',
  'FechaEntrada',
  'Localidad',
  'Medico',
  'Municipio',
  'Nombre',
  'Pagador',
  'Servicio',
  'ServicioAgenda',
  'TipoCita',
  'Turno',
  'Visita',
  'agenda_efectora',
  'centro',
  'diagnosticos',
  'div',
  'edadaños',
  'fecha',
  'fecha_nac',
  'nombre_corto',
  'registro',
  'AgeGroup',
  'Centro',
  'Genero',
];

const fastFilterableKeys: (keyof ProductivityType)[] = [
  'Centro',
  'Genero',
];

export const productivity = () => {
  const [rawData, setRawData] = useState<ProductivityType[]>([]);
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const { response: productivityData, loading, refetch } = useFetch({
    url: "/v1/data/vProductividad",
    qs: {
      start: format(date?.from || '', "dd/MM/yyyy"),
      end: format(date?.to || '', "dd/MM/yyyy"),
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
  } = useDynamicFilters<ProductivityType>(
    rawData,
    filterableKeys,
    {
      getValue: (item, key) => {
        // if (key === 'Hora') return item.Hora.split(':')[0];
        if (key === 'AgeGroup') return getAgeGroup(item.fecha_nac);
        return (item[key] as any as string) || '';
      },
    }
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
              <h1 className="text-2xl font-bold tracking-tight">Productividad</h1>
              <p className="text-muted-foreground">
                Comprensiva visualización de métricas de productividad
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <DatePickerWithRange
              date={date}
              setDate={setDate}
              className="w-[300px]"
            />
            <Button onClick={() => refetch()}>Aplicar</Button>
          </div>
        </div>

        <FiltersPanel<ProductivityType>
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
            <TabsTrigger value="trends">Tendencias</TabsTrigger>
            <TabsTrigger value="resources">Recursos hospitalarios</TabsTrigger>
            <TabsTrigger value="demographic">Datos demográficos y segmentación</TabsTrigger>
            <TabsTrigger value="data">Datos</TabsTrigger>
          </TabsList>

          <TabsContent value="numbers" className="space-y-4">
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <GenericChart
                data={filteredData}
                getKey={item => item.fecha || ''}
                sortBy="key"
                chartType="line"
                onFilter={val => handleInclude('fecha', val)}
                title="fecha"
                description=""
              />
              <GenericChart
                data={filteredData}
                getKey={item => item.Diagnostico || ''}
                sortBy="key"
                chartType="treemap"
                onFilter={val => handleInclude('Diagnostico', val)}
                title="Diagnostico"
                description=""
                className="col-span-2"
                top={20}
              />





              {/* <GenericChart
                data={filteredData}
                getKey={item => item.DestinoUrgencias || ''}
                sortBy="key"
                chartType="pie"
                onFilter={val => handleInclude('DestinoUrgencias', val)}
                title="Destino Urgencias"
                description=""
                top={5}
              /> */}

            </div>
            <div className="grid gap-4 md:grid-cols-2">

              {/* <GenericChart
                data={filteredData}
                getKey={item => item.DiagnostivoIngreso || ''}
                chartType="treemap"
                onFilter={val => handleInclude('DiagnostivoIngreso', val)}
                title="Diagnostico de ingreso"
                description=""
                top={15}
              /> */}

              {/* <GenericChart
                data={filteredData}
                getKey={item => item.DiagnosticoEgreso || ''}
                chartType="treemap"
                onFilter={val => handleInclude('DiagnosticoEgreso', val)}
                title="Diagnostico de egreso"
                description=""
                top={15}
              /> */}

            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <div className='grid gap-4 md:grid-cols-2'>
              <GenericChart
                data={filteredData}
                getKey={item => item.Centro}
                chartType="pie"
                onFilter={val => handleInclude('Centro', val)}
                title="Unidades hospitalarias"
                description="Gráfica de ingresos por unidad hospitalaria"
              />

              <GenericChart
                data={filteredData}
                getKey={item => item.Turno || ''}
                sortBy="key"
                chartType="pie"
                onFilter={val => handleInclude('Turno', val)}
                title="Turno"
                description=""
              />
              {/* <GenericChart
                      data={filteredData}
                      getKey={item => item.ing_tipo_desc}
                      chartType="pie"
                      onFilter={val => handleInclude('ing_tipo_desc', val)}
                      title="ing_tipo_desc"
                      description="Gráfica de ingresos por piso"
                      top={20}
                    /> */}

              {/* <GenericChart
                      data={filteredData}
                      getKey={item => item.division}
                      chartType="pie"
                      onFilter={val => handleInclude('division', val)}
                      title="division"
                      description="Gráfica de ingresos por piso"
                      top={20}
                    /> */}

              {/* <GenericChart
                      data={filteredData}
                      getKey={item => item.PISO_DESC}
                      chartType="treemap"
                      onFilter={val => handleInclude('PISO_DESC', val)}
                      title="Piso"
                      description="Gráfica de ingresos por piso"
                      top={20}
                    /> */}



              {/* <GenericChart
                data={filteredData}
                getKey={item => item.Procedencia}
                chartType="pie"
                onFilter={val => handleInclude('Procedencia', val)}
                title="Procedencia "
                description="Gráfica de procedencia de los pacientes"
                top={20}
              /> */}

              {/* <GenericChart
                data={filteredData}
                getKey={item => item.UnidadEnfermeria}
                chartType="bar"
                onFilter={val => handleInclude('UnidadEnfermeria', val)}
                title="Unidad Enfermería "
                description="Gráfica de Unidad Enfermería"
                top={20}
              /> */}

            </div>

            <div className="grid gap-4 md:grid-cols-1">
              <GenericChart
                data={filteredData}
                getKey={item => item.Servicio}
                chartType="treemap"
                onFilter={val => handleInclude('Servicio', val)}
                title="Servicio"
                description="Gráfica de servicio"
                top={20}
              />

              {/* <GenericChart
                data={filteredData}
                getKey={item => item.desc_area}
                chartType="treemap"
                onFilter={val => handleInclude('desc_area', val)}
                title="desc_area"
                description=""
                top={20}
              /> */}

            </div>
          </TabsContent>

          <TabsContent value="demographic" className="space-y-4">
            <div className='grid gap-4 md:grid-cols-2'>
              <GenericChart
                data={filteredData}
                getKey={item => item.Genero}
                chartType="pie"
                onFilter={val => handleInclude('Genero', val)}
                title="Genero"
                description="Genero de los pacientes"
              />

              <GenericChart
                data={filteredData}
                getKey={item => item.fecha_nac}
                transformKey={getAgeGroup}
                onFilter={val => handleInclude('AgeGroup', val)}
                sortBy="key"
                chartType="bar"
                title="Distribución de Edad"
              />

            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <GenericChart
                data={filteredData}
                getKey={item => item.Estado}
                chartType="bar"
                onFilter={val => handleInclude('Estado', val)}
                onSearch={text => handleSearchInclude('Estado', text)}
                searchText={searchFilters['Estado']?.include || ''}
                title="Estados de Residencia"
                description="Los 20 estados donde residen más pacientes"
                top={20}
              />

              <GenericChart
                data={filteredData}
                getKey={item => item.Municipio}
                chartType="bar"
                onFilter={val => handleInclude('Municipio', val)}
                onSearch={text => handleSearchInclude('Municipio', text)}
                searchText={searchFilters['Municipio']?.include || ''}
                title="Municipios de Residencia"
                description="Los 20 municipios donde residen más pacientes"
                top={20}
              />
              <GenericChart
                data={filteredData}
                getKey={item => item.Localidad}
                chartType="treemap"
                onFilter={val => handleInclude('Localidad', val)}
                onSearch={text => handleSearchInclude('Localidad', text)}
                searchText={searchFilters['Localidad']?.include || ''}
                title="Localidad de Residencia"
                description="Los 40 localidades donde residen más pacientes"
                top={40}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <GenericChart
                data={filteredData}
                getKey={item => item.Pagador}
                chartType="bar"
                onFilter={val => handleInclude('Pagador', val)}
                title="Pagador Evento"
                description="Pagador Evento de los pacientes"
              />
            </div>

          </TabsContent>


          <TabsContent value="data" className="space-y-4">
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
