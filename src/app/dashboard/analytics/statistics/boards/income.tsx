import { Layout } from "@/components/auth"
import { useEffect, useState, } from "react"
import { useFetch, useDynamicFilters, usePost } from "@/hooks"
import { Spinner } from "@/components/ui/spinner"
import { DateRange } from "react-day-picker"

import { Link } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { DatePickerWithRange } from "@/components/utils"
import { subDays, format } from "date-fns"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { IncomeType } from "@/types"
import { GenericChart, IndicatorCard } from "@/components/utils";
import { getAgeGroup } from "@/utils/functions"
import { IncomeColumns } from "@/components/app/dashboard"
import { DataTable } from "@/components/utils"
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
import { FiltersPanel } from "@/components/utils"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type DataType = 'Ingresos' | 'Egresos' | 'Ocupacion'

const filterableKeys: (keyof IncomeType)[] = [
  'CIE_ALTA',
  'CIE_DESC_ALTA',
  'Centro',
  'Destino_alta',
  'Diagnostico',
  'Escolaridad',
  'Estado',
  'EstadoCivil',
  'FechaEgreso',
  'FechaIngreso',
  'Fecha_Alta',
  'Genero',
  'Hora_Alta',
  'Localidad',
  'Motivo_alta',
  'Municipio',
  'Ocupacion',
  'PISO_DESC',
  'PagadorEvento',
  'Proc_urg',
  'Procedencia',
  'ServicioEgreso',
  'TurnoIngreso',
  'UnidadEnfermeria',
  'cama',
  'capturo',
  'divi',
  'division',
  'fecha_nac',
  'hrs',
  'ing_tipo_desc',
  'med_alta',
  'meding',
  'nombre',
  'numdias',
  'registro',
  'segsoc',
  'servicio',
  "Egreso",
  'AgeGroup',
  'financiamiento',
  'estado_cama',
  'censable'

];

const fastFilterableKeys: (keyof IncomeType)[] = [
  'Centro',
  'Genero',
];

export const income = () => {
  const [rawData, setRawData] = useState<IncomeType[]>([]);
  const { execute, loading: loadingPost } = usePost()
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 3),
    to: new Date(),
  })
  const [typeInfo, setTypeInfo] = useState<DataType>('Ocupacion');

  const { response: incomeData, loading, refetch } = useFetch({
    url: "/v1/data/vIngresosAdministrativos",
    qs: {
      start: format(date?.from || '', "dd/MM/yyyy"),
      end: format(date?.to || '', "dd/MM/yyyy"),
      type: typeInfo,
      camas: false
    },
    enabled: false
  })

  // const [onlyWithFechaEgr, setOnlyWithFechaEgr] = useState(true);
  // const extraFilter = useCallback(
  //   (item: IncomeType) => {
  //     if (typeInfo === 'Ingresos') {
  //       // si ponemos true: queremos sólo los que NO tienen fechaEgr
  //       return !onlyWithFechaEgr ? !item.FechaEgreso : !!item.FechaEgreso;
  //     }
  //     return true;
  //   },
  //   [typeInfo, onlyWithFechaEgr]
  // );

  const handlePDF = async () => {


    execute({
      url: "/v1/data/report/pdf",
      body: {
        columns: IncomeColumns,
        title: "Ocupación hospitalaria",
        type: 2,
        typeReport: typeInfo,
        start: format(date?.from || '', "dd/MM/yyyy"),
        end: format(date?.to || '', "dd/MM/yyyy"),
        filters: {
          filters,
          searchFilters,
          filterableKeys
        },
        charts: [
          {
            type: "pie",
            key: "estado_cama",
            title: "Ocupación hospitalaria",
          },
          {
            type: "pie",
            key: "financiamiento",
            title: "Financiamiento",
          },
          {
            type: "bar",
            key: "servicio",
            title: "Servicios",
            css: "col-span-2",
          },
        ]
      },
    }).then((resp) => {
      if (resp.status == 200) {
        const byteCharacters = atob(resp.data)
        const byteNumbers = new Uint8Array(byteCharacters.length)

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i)
        }

        const blob = new Blob([byteNumbers], { type: "application/pdf" })
        const blobURL = URL.createObjectURL(blob)

        // Abrir en una nueva pestaña
        window.open(blobURL, "_blank")

      } else {
        throw new Error()
      }
    }).catch((error) => {
      console.log("🚀 > Data.tsx:51 > handleExcel > error:", error);

    })
  }

  const {
    filteredData,
    filters,
    searchFilters,
    handleInclude,
    handleExclude,
    handleSearchInclude,
    handleSearchExclude,
  } = useDynamicFilters<IncomeType>(
    rawData,
    filterableKeys,
    {
      getValue: (item, key) => {
        // if (key === 'Hora') return item.Hora.split(':')[0];
        if (key === 'AgeGroup') return getAgeGroup(item.fecha_nac);
        return (item[key] as any as string) || '';
      },
      // extraFilter
    }
  );

  useEffect(() => {
    refetch();
  }, [])

  useEffect(() => {
    refetch();
  }, [typeInfo])


  useEffect(() => {
    if (incomeData) {
      // console.log(incomeData.data);
      setRawData(incomeData.data)
    }
  }, [incomeData])




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
              <h1 className="text-2xl font-bold tracking-tight">Ingresos y egresos</h1>
              <p className="text-muted-foreground">
                Comprensiva visualización de métricas de ingresos y egresos
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* {typeInfo === 'Ingresos' && (
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" checked={onlyWithFechaEgr}
                  onCheckedChange={setOnlyWithFechaEgr} />
                <Label htmlFor="airplane-mode">Incluir egresos</Label>
              </div>
            )} */}
            {typeInfo != 'Ocupacion' && (
              <>
                <DatePickerWithRange
                  date={date}
                  setDate={setDate}
                  className="w-[300px]"
                />
                <Button onClick={() => refetch()}>Aplicar</Button>
              </>
            )}
            <Select defaultValue={typeInfo} onValueChange={(val) => {
              setTypeInfo(() => {
                return val as DataType
              });
              // setFilters({} as Record<keyof IncomeType, string[]>);
              // setSearchFilters({} as Partial<Record<keyof IncomeType, string>>);
            }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ocupacion">Ocupación hospitalaria</SelectItem>
                <SelectItem value="Ingresos">Ingresos</SelectItem>
                <SelectItem value="Egresos">Egresos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <FiltersPanel<IncomeType>
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
            <TabsTrigger value="trends">Tendencias</TabsTrigger>
            <TabsTrigger value="resources">Recursos hospitalarios</TabsTrigger>
            <TabsTrigger value="demographic">Datos demográficos y segmentación</TabsTrigger>
            <TabsTrigger value="data">Datos</TabsTrigger>
          </TabsList>

          <TabsContent value="numbers" className="space-y-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {typeInfo === 'Ocupacion' && (
                  <>
                    <IndicatorCard
                      title="Camas"
                      description="Totales"
                      data={filteredData}
                      computeValue={data => {
                        return data.length
                      }}
                    />

                  </>
                )}
                {typeInfo === 'Ingresos' && (
                  <>
                    <IndicatorCard
                      title="Pacientes totales"
                      description="ingresados"
                      data={filteredData}
                      computeValue={data => {
                        return data.length
                      }}
                    />

                    {/* {onlyWithFechaEgr && (
                      <IndicatorCard
                        title="Pacientes"
                        description="que ya egresados"
                        data={filteredData}
                        computeValue={data => {
                          let countFechaEgreso = data.filter(item => item.FechaEgreso != null);
                          return countFechaEgreso.length
                        }}
                      />

                    )} */}
                  </>

                )}
                {typeInfo === 'Egresos' && (
                  <>
                    <IndicatorCard
                      title="Pacientes"
                      description="egresados"
                      data={filteredData}
                      computeValue={data => {
                        return data.length
                      }}
                    />

                    <IndicatorCard
                      title="Pacientes"
                      description="egresados"
                      data={filteredData}
                      computeValue={data => {
                        return data.length
                      }}
                    />

                  </>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {typeInfo === 'Egresos' ? (
                <GenericChart
                  data={filteredData}
                  getKey={item => item.FechaEgreso}
                  sortBy="date"
                  sortOrder="asc"
                  chartType="line"
                  onFilter={val => handleInclude('FechaEgreso', val)}
                  title="Egresos por dia"
                  description="Egresos por dia"
                  className="col-span-2"
                />
              ) : (
                <GenericChart
                  data={filteredData}
                  getKey={item => item.FechaIngreso}
                  sortBy="date"
                  chartType="line"
                  sortOrder="asc"
                  onFilter={val => handleInclude('FechaIngreso', val)}
                  title="Ingresos por dia"
                  description="Ingresos por dia"
                  className="col-span-2"
                />
              )}



              <GenericChart
                data={filteredData}
                getKey={item => item.estado_cama}
                chartType="pie"
                onFilter={val => handleInclude('estado_cama', val)}
                title="Turno"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">

              <GenericChart
                data={filteredData}
                getKey={item => item.TurnoIngreso}
                chartType="pie"
                onFilter={val => handleInclude('TurnoIngreso', val)}
                title="Turno"
              />


              <GenericChart
                data={filteredData}
                getKey={item => item.Diagnostico}
                chartType="treemap"
                onFilter={val => handleInclude('Diagnostico', val)}
                onSearch={text => handleSearchInclude('Diagnostico', text)}
                searchText={searchFilters['Diagnostico']?.include || ''}
                title="Diagnostico de ingreso"
                description="Diagnostico por ingresos"
                top={20}
              />

              {typeInfo === 'Egresos' && (
                <GenericChart
                  data={filteredData}
                  getKey={item => item.CIE_DESC_ALTA}
                  chartType="treemap"
                  onFilter={val => handleInclude('CIE_DESC_ALTA', val)}
                  onSearch={text => handleSearchInclude('CIE_DESC_ALTA', text)}
                  searchText={searchFilters['CIE_DESC_ALTA']?.include || ''}
                  title="Diagnostico de egreso"
                  description="Diagnostico por egreso"
                  top={20}
                />
              )}
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
                getKey={item => item.ing_tipo_desc}
                chartType="pie"
                onFilter={val => handleInclude('ing_tipo_desc', val)}
                title="Tipo de ingreso"
                description=""
                top={20}
              />


              <GenericChart
                data={filteredData}
                getKey={item => item.PISO_DESC}
                chartType="treemap"
                onFilter={val => handleInclude('PISO_DESC', val)}
                onSearch={text => handleSearchInclude('Diagnostico', text)}
                searchText={searchFilters['Diagnostico']?.include || ''}
                title="Piso"
                description="Gráfica de ingresos por piso"
                top={20}
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
                onSearch={text => handleSearchInclude('Diagnostico', text)}
                searchText={searchFilters['Diagnostico']?.include || ''}
                title="Unidad Enfermería "
                description="Gráfica de Unidad Enfermería"
                top={20}
              />

              {typeInfo === 'Egresos' ? (

                <GenericChart
                  data={filteredData}
                  getKey={item => item.ServicioEgreso}
                  chartType="treemap"
                  onFilter={val => handleInclude('ServicioEgreso', val)}
                  onSearch={text => handleSearchInclude('ServicioEgreso', text)}
                  searchText={searchFilters['ServicioEgreso']?.include || ''}
                  title="Servicio de egreso"
                  description="Gráfica de servicio de egreso"
                  top={20}
                />
              ) : (
                <GenericChart
                  data={filteredData}
                  getKey={item => item.servicio}
                  chartType="treemap"
                  onFilter={val => handleInclude('servicio', val)}
                  onSearch={text => handleSearchInclude('Diagnostico', text)}
                  searchText={searchFilters['Diagnostico']?.include || ''}
                  title="Servicio de ingreso"
                  description="Gráfica de servicio de ingreso"
                  top={20}
                />
              )}

            </div>

          </TabsContent>

          <TabsContent value="demographic" className="space-y-4">

            <div className='grid gap-4 md:grid-cols-1 lg:grid-cols-3'>
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

            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-2'>
              <GenericChart
                data={filteredData}
                getKey={item => item.Escolaridad}
                chartType="bar"
                onFilter={val => handleInclude('Escolaridad', val)}
                title="Escolaridad"
                description="Escolaridad de los pacientes"
              />

              <GenericChart
                data={filteredData}
                getKey={item => item.EstadoCivil}
                chartType="bar"
                onFilter={val => handleInclude('EstadoCivil', val)}
                title="Estado Civil"
                description="Estado Civil de los pacientes"
              />

              <GenericChart
                data={filteredData}
                getKey={item => item.Ocupacion}
                chartType="bar"
                onFilter={val => handleInclude('Ocupacion', val)}
                title="Ocupación"
                description="Ocupación de los pacientes"
              />

              <GenericChart
                data={filteredData}
                getKey={item => item.PagadorEvento}
                chartType="bar"
                onFilter={val => handleInclude('PagadorEvento', val)}
                title="Pagador Evento"
                description="Pagador Evento de los pacientes"
              />
            </div>


          </TabsContent>


          <TabsContent value="data" className="space-y-4">
            <div className="flex flex-row items-center justify-between">
              <Button
                className="btn btn-primary"
                onClick={handlePDF}
                disabled={loadingPost}
              >
                Descargar report PDF
              </Button>

            </div>
            <Card>
              <CardHeader className="">
                <CardTitle className="text-sm font-medium">Tabla de datos</CardTitle>
                <CardDescription>
                  Tabla de citas. Muestra la información detallada de cada cita programada.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={IncomeColumns}
                  data={filteredData}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
