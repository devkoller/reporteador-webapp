import { Layout } from "@/components/auth"
import { useEffect, useState } from "react"
import { useFetch, useDynamicFilters } from "@/hooks"
import { Spinner } from "@/components/ui/spinner"
import { DateRange } from "react-day-picker"
import { useNavigate } from "react-router-dom"

import { Link } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { DatePickerWithRange } from "@/components/utils"
import { addDays, format } from "date-fns"

import { TemporalData, ResourceCharts, DemographicCharts, Numbers, Data } from "@/components/app/dashboard"
import { AppointmentType } from "@/types"
import { FiltersPanel } from "@/components/utils"
import { getAgeGroup, formatoHHMMSS, tiempoAMilisegundos } from "@/utils/functions"

const filterableKeys: (keyof AppointmentType)[] = [
  'Fecha',
  'Hora',
  'Agenda',
  'Genero',
  'Centro',
  'Servicio',
  'Visita',
  'Tipo',
  'AgeGroup',
  'Usuario',
  'Estado',
  'Municipio',
  'Localidad',
  'Colonia',
];

const fastFilterableKeys: (keyof AppointmentType)[] = [
  'Centro',
  'Genero',
];


export const appointments = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  })
  const [DataInfo, setDataInfo] = useState({
    appointmentDontFinalized: 0,
    promedioMs: '0h 0m 0s',
  });

  const [rawData, setRawData] = useState<AppointmentType[]>([]);
  const { response: appointmentData, loading, refetch, error } = useFetch({
    url: "/v1/data/vCitados",
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
  } = useDynamicFilters<AppointmentType>(
    rawData,
    filterableKeys,
    {
      getValue: (item, key) => {
        if (key === 'Hora') return item.Hora.split(':')[0];
        if (key === 'AgeGroup') return getAgeGroup(item.fecha_nac);
        return (item[key] as any as string) || '';
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [])

  useEffect(() => {
    if (appointmentData) {
      let countNoAttended = 0;
      let diff = []

      for (let element of appointmentData.data) {
        if (parseInt(element.HoraEntrada) && !parseInt(element.HoraSalida)) {
          countNoAttended++;
        }

        if (parseInt(element.HoraSalida) && parseInt(element.HoraEntrada)) {
          let msEntrada = tiempoAMilisegundos(element.HoraEntrada);
          let msSalida = tiempoAMilisegundos(element.HoraSalida);
          diff.push(msSalida - msEntrada)
        }
      }

      const sumaMs = diff.reduce((acc, d) => acc + d, 0);
      const promedioMs = sumaMs / diff.length;

      setDataInfo({
        appointmentDontFinalized: countNoAttended,
        promedioMs: formatoHHMMSS(promedioMs),
      })

      setRawData(appointmentData.data)
    }
  }, [appointmentData])

  useEffect(() => {
    if (error) {
      navigate("/analitica")
    }
  }, [error])


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
            <Link to="/analitica">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Citas</h1>
              <p className="text-muted-foreground">
                Comprensiva visualización de métricas de citas
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

        <FiltersPanel<AppointmentType>
          filteredData={rawData}
          filters={filters}
          searchFilters={searchFilters}
          handleInclude={handleInclude}
          handleExclude={handleExclude}
          handleSearchInclude={handleSearchInclude}
          handleSearchExclude={handleSearchExclude}
          fastFiltersKeys={fastFilterableKeys}
        />




        <Tabs defaultValue="numbers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="numbers">Métricas</TabsTrigger>
            <TabsTrigger value="trends">Tendencias de citas</TabsTrigger>
            <TabsTrigger value="resources">Recursos hospitalarios</TabsTrigger>
            <TabsTrigger value="demographic">Datos demográficos y segmentación</TabsTrigger>
            <TabsTrigger value="data">Datos</TabsTrigger>
          </TabsList>

          <TabsContent value="numbers" className="space-y-4">
            {rawData.length > 0
              && (
                <Numbers
                  data={filteredData as AppointmentType[]}
                  DataInfo={DataInfo}
                />
              )}
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            {rawData.length > 0
              && (
                <TemporalData
                  data={filteredData as AppointmentType[]}
                  handleFilter={handleInclude}
                />
              )}
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            {rawData.length > 0
              && (
                <ResourceCharts
                  data={filteredData as AppointmentType[]}
                  handleFilter={handleInclude}
                  handleSearch={handleSearchInclude}
                  searchFilters={searchFilters}
                />
              )}
          </TabsContent>

          <TabsContent value="demographic" className="space-y-4">
            {rawData.length > 0
              && (
                <DemographicCharts data={filteredData as AppointmentType[]} handleFilter={handleInclude} handleSearch={handleSearchInclude} searchFilters={searchFilters} />
              )}
          </TabsContent>


          <TabsContent value="data" className="space-y-4">
            {rawData.length > 0
              && (
                <Data data={filteredData as AppointmentType[]} />
              )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout >
  )
}
