import { Layout } from "@/components/auth"
import { useEffect, useState, } from "react"
import { useFetch, useDynamicFilters } from "@/hooks"
import { Spinner } from "@/components/ui/spinner"
import { DateRange } from "react-day-picker"

import { Link } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { DatePickerWithRange } from "@/components/utils"
import { subDays, format } from "date-fns"

import { EmergencyType } from "@/types"
import { GenericChart } from "@/components/utils";
import { getAgeGroup } from "@/utils/functions"
import { FiltersPanel } from "@/components/utils"





const filterableKeys: (keyof EmergencyType)[] = [
  'Genero',
  'FechaIngreso',
  'Centro',
  'DestinoUrgencias',
  'DiagnosticoEgreso',
  'DiagnostivoIngreso',
  'EdadDias',
  'EdadMeses',
  'Estado',
  'FechaAtencion',
  'FechaAtendido',
  'FechaEgreso',
  'Localidad',
  'Localizacion',
  'MotivoUrgencia',
  'MotivoUrgenciaLibre',
  'Municipio',
  'Nombre',
  'NombreMedico',
  'Pagador',
  'Piso',
  'PrimeraVez',
  'Procedencia',
  'SeguridadSocial',
  'ServicioIngreso',
  'Turno',
  'UnidadEnfermeria',
  'categoria_registro',
  'desc_area',
  'edadaños',
  'epis_pk',
  'fecha_nac',
  'registro',
  'tipo_urgencia',
  'usuario_registro',
  'AgeGroup',
  'financiamiento'
];

const fastFilterableKeys: (keyof EmergencyType)[] = [
  'Centro',
  'Genero',
];

export const emergency = () => {
  const [rawData, setRawData] = useState<EmergencyType[]>([]);
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 3),
    to: new Date(),
  })

  const { response: emergencyData, loading, refetch } = useFetch({
    url: "/v1/data/vUrgencias",
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
  } = useDynamicFilters<EmergencyType>(
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
    if (emergencyData) {
      setRawData(emergencyData.data)
    }
  }, [emergencyData])


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
              <h1 className="text-2xl font-bold tracking-tight">Urgencias</h1>
              <p className="text-muted-foreground">
                Comprensiva visualización de métricas de urgencias
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

        <FiltersPanel<EmergencyType>
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
            <TabsTrigger value="trends">Tendencias de citas</TabsTrigger>
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
                getKey={item => item.FechaIngreso || ''}
                sortBy="key"
                sortOrder="asc"
                chartType="line"
                onFilter={val => handleInclude('FechaIngreso', val)}
                title="Fecha de ingresoo"
                description=""
              />
              <GenericChart
                data={filteredData}
                getKey={item => item.FechaAtendido || ''}
                sortBy="key"
                sortOrder="asc"
                chartType="line"
                onFilter={val => handleInclude('FechaAtendido', val)}
                title="Fecha de atención"
                description=""
              />
              <GenericChart
                data={filteredData}
                getKey={item => item.FechaEgreso || ''}
                sortBy="key"
                sortOrder="asc"
                chartType="line"
                onFilter={val => handleInclude('FechaEgreso', val)}
                title="Fecha de egreso"
                description=""
              />

              <GenericChart
                data={filteredData}
                getKey={item => item.tipo_urgencia || ''}
                sortBy="key"
                chartType="pie"
                onFilter={val => handleInclude('tipo_urgencia', val)}
                title="Tipos de urgencias"
                description=""
              />

              <GenericChart
                data={filteredData}
                getKey={item => item.Turno || ''}
                sortBy="key"
                chartType="pie"
                onFilter={val => handleInclude('Turno', val)}
                title="Turno de ingreso"
                description=""
              />
              <GenericChart
                data={filteredData}
                getKey={item => item.DestinoUrgencias || ''}
                sortBy="key"
                chartType="pie"
                onFilter={val => handleInclude('DestinoUrgencias', val)}
                title="Destino Urgencias"
                description=""
                top={5}
              />
              <GenericChart
                data={filteredData}
                getKey={item => item.PrimeraVez || ''}
                sortBy="key"
                chartType="pie"
                onFilter={val => handleInclude('PrimeraVez', val)}
                title="Primera Vez"
                description=""
                top={5}
              />
              <GenericChart
                data={filteredData}
                getKey={item => item.MotivoUrgencia || ''}
                chartType="bar"
                onFilter={val => handleInclude('MotivoUrgencia', val)}
                title="Motivo de urgencia"
                description=""
                top={15}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">

              <GenericChart
                data={filteredData}
                getKey={item => item.DiagnostivoIngreso || ''}
                chartType="treemap"
                onFilter={val => handleInclude('DiagnostivoIngreso', val)}
                title="Diagnostico de ingreso"
                description=""
                top={15}
              />

              <GenericChart
                data={filteredData}
                getKey={item => item.DiagnosticoEgreso || ''}
                chartType="treemap"
                onFilter={val => handleInclude('DiagnosticoEgreso', val)}
                title="Diagnostico de egreso"
                description=""
                top={15}
              />


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
                getKey={item => item.Procedencia}
                chartType="pie"
                onFilter={val => handleInclude('Procedencia', val)}
                title="Procedencia "
                description="Gráfica de procedencia de los pacientes"
                top={20}
              />

              <GenericChart
                data={filteredData}
                getKey={item => item.UnidadEnfermeria}
                chartType="bar"
                onFilter={val => handleInclude('UnidadEnfermeria', val)}
                title="Unidad Enfermería "
                description="Gráfica de Unidad Enfermería"
                top={20}
              />

            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <GenericChart
                data={filteredData}
                getKey={item => item.ServicioIngreso}
                chartType="treemap"
                onFilter={val => handleInclude('ServicioIngreso', val)}
                title="Servicio de ingreso"
                description="Gráfica de servicio de ingreso"
                top={20}
              />

              <GenericChart
                data={filteredData}
                getKey={item => item.desc_area}
                chartType="treemap"
                onFilter={val => handleInclude('desc_area', val)}
                title="Area"
                description=""
                top={20}
              />

            </div>
          </TabsContent>

          <TabsContent value="demographic" className="space-y-4">
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
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
                sortOrder="asc"
                chartType="bar"
                title="Distribución de Edad"
              />

              <GenericChart
                data={filteredData}
                getKey={item => item.financiamiento}
                chartType="pie"
                onFilter={val => handleInclude('financiamiento', val)}
                title="Financiamiento"
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

            <div className="grid gap-4 md:grid-cols-2">
              <GenericChart
                data={filteredData}
                getKey={item => item.Pagador}
                chartType="bar"
                onFilter={val => handleInclude('Pagador', val)}
                title="Pagador Evento"
                description="Pagador Evento de los pacientes"
              />

              <GenericChart
                data={filteredData}
                getKey={item => item.SeguridadSocial}
                chartType="bar"
                onFilter={val => handleInclude('SeguridadSocial', val)}
                title="Seguridad Social"
                description="Seguridad Social de los pacientes"
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
