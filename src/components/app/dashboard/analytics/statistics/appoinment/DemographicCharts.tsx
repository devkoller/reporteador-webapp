import { AppointmentType } from "@/types"
import { GenericChart } from "@/components/utils"
import { getAgeGroup } from "@/utils/functions"


interface DemographicChartsProps {
  data: AppointmentType[];
  handleFilter: (key: keyof AppointmentType, value: string) => void;
  handleSearch: (key: keyof AppointmentType, value: string) => void;
  searchFilters: Partial<Record<keyof AppointmentType, any>>;
}

export const DemographicCharts = ({ data, handleFilter, handleSearch, searchFilters }: DemographicChartsProps) => {


  return (
    <div className='space-y-8'>

      <div className='grid gap-4 md:grid-cols-2'>
        <GenericChart
          data={data}
          getKey={item => item.Genero}
          chartType="pie"
          onFilter={val => handleFilter('Genero', val)}
          title="Genero"
          description="Genero de los pacientes"
        />

        <GenericChart
          data={data}
          getKey={item => item.fecha_nac}
          transformKey={getAgeGroup}
          onFilter={val => handleFilter('AgeGroup', val)}
          chartType="bar"
          title="Distribución de Edad"
        />


      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <GenericChart
          data={data}
          getKey={item => item.Estado}
          chartType="bar"
          onFilter={val => handleFilter('Estado', val)}
          onSearch={text => handleSearch('Estado', text)}
          searchText={searchFilters['Estado']?.include || ''}
          title="Estados de Residencia"
          description="Los 20 estados donde residen más pacientes"
          top={20}
        />

        <GenericChart
          data={data}
          getKey={item => item.Municipio}
          chartType="bar"
          onFilter={val => handleFilter('Municipio', val)}
          onSearch={text => handleSearch('Municipio', text)}
          searchText={searchFilters['Municipio']?.include || ''}
          title="Municipios de Residencia"
          description="Los 20 municipios donde residen más pacientes"
          top={20}
        />

        <GenericChart
          data={data}
          getKey={item => item.Colonia}
          chartType="treemap"
          onFilter={val => handleFilter('Colonia', val)}
          onSearch={text => handleSearch('Colonia', text)}
          searchText={searchFilters['Colonia']?.include || ''}
          title="Colonias de Residencia"
          description="Los 40 colonias donde residen más pacientes"
          top={40}
        />
      </div>




    </div>
  )
}
