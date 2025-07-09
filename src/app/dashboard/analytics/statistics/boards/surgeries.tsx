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
import { addDays, subDays, format } from "date-fns"

import { SurgeryType } from "@/types"
import { FiltersPanel } from "@/components/utils"
import { GenericChart } from "@/components/utils";
import { getAgeGroup } from "@/utils/functions"



const filterableKeys: (keyof SurgeryType)[] = [
  'Centro',
  'Cirugia',
  'Diagnostico',
  'Fecha',
  'Hora_QX',
  'Nombre',
  'QX',
  'Radiologo',
  'Servicio',
  'Turno',
  'ambulatorio',
  'anestesiologo',
  'ci_inter_diagno1',
  'cirujano',
  'descripcion',
  'ejercicio',
  'icd_nom_proc_ppal',
  'imprevisto',
  'registro',
  'registro_reserva',
  'rud_reserva',
  'suspendida',
  'fecha_nac',
  'Genero',
  'AgeGroup',
];

const fastFilterableKeys: (keyof SurgeryType)[] = [
  'Centro',
  'Genero',
];

export const surgeries = () => {
  const [rawData, setRawData] = useState<SurgeryType[]>([]);
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 3),
    to: addDays(new Date(), 3),
  })

  const { response: surgeryData, loading, refetch } = useFetch({
    url: "/v1/data/vCirugias",
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
  } = useDynamicFilters<SurgeryType>(
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
    if (surgeryData) {
      setRawData(surgeryData.data)
    }
  }, [surgeryData])

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
              <h1 className="text-2xl font-bold tracking-tight">Cirugías</h1>
              <p className="text-muted-foreground">
                Comprensiva visualización de métricas de cirugías
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

        <FiltersPanel<SurgeryType>
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
            <div className="grid gap-4 md:grid-cols-2">
              <GenericChart
                data={filteredData}
                getKey={item => item.Fecha || ''}
                sortBy="key"
                chartType="line"
                onFilter={val => handleInclude('Fecha', val)}
                title="Fecha"
                description=""
              />
              <GenericChart
                data={filteredData}
                getKey={item => item.Diagnostico || ''}
                chartType="bar"
                onFilter={val => handleInclude('Diagnostico', val)}
                title="Diagnostico"
                description=""
                top={20}
              />
              <GenericChart
                data={filteredData}
                getKey={item => item.Turno || ''}
                chartType="bar"
                onFilter={val => handleInclude('Turno', val)}
                title="Turno"
                description=""
              />
              <GenericChart
                data={filteredData}
                getKey={item => item.Cirugia || ''}
                chartType="treemap"
                onFilter={val => handleInclude('Cirugia', val)}
                title="Cirugía"
                description=""
                top={20}
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
                getKey={item => item.QX}
                chartType="bar"
                onFilter={val => handleInclude('QX', val)}
                title="QX "
                description="Gráfica de QX"
                top={20}
              />

              <GenericChart
                data={filteredData}
                getKey={item => item.Servicio}
                chartType="bar"
                onFilter={val => handleInclude('Servicio', val)}
                title="Servicio"
                description="Gráfica de Servicio"
                top={20}
              />

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
            {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            </div> */}

          </TabsContent>


          <TabsContent value="data" className="space-y-4">
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
