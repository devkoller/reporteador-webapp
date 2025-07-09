import { AppointmentType } from "@/types"
import { GenericChart } from "@/components/utils";

interface ResourceChartsProps {
  data: AppointmentType[];
  handleFilter: (key: keyof AppointmentType, value: string) => void;
  handleSearch: (key: keyof AppointmentType, value: string) => void;
  searchFilters: Partial<Record<keyof AppointmentType, any>>;
}

export const ResourceCharts = ({ data, handleFilter, handleSearch, searchFilters }: ResourceChartsProps) => {
  return (
    <div className='space-y-8'>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <GenericChart
          data={data}
          getKey={item => item.Centro}
          chartType="bar"
          onFilter={val => handleFilter('Centro', val)}
          title="Unidades hospitalarias"
          description="Gráfica de citas por unidad hospitalaria"
        />

        <GenericChart
          data={data}
          getKey={item => item.Agenda}
          chartType="bar"
          onFilter={val => handleFilter('Agenda', val)}
          onSearch={text => handleSearch('Agenda', text)}
          searchText={searchFilters['Agenda']?.include || ''}
          top={20}
          title="Distribución de citas por agenda"
          description="Gráfica de las 20 agendas con más citas"
        />

        <GenericChart
          data={data}
          getKey={item => item.Visita}
          chartType="bar"
          onFilter={val => handleFilter('Visita', val)}
          title="Distribución de citas por visita"
          description="Gráfica de citas por visita"
        />
      </div>

      <GenericChart
        data={data}
        getKey={item => item.Servicio}
        chartType="treemap"
        onFilter={val => handleFilter('Servicio', val)}
        onSearch={text => handleSearch('Servicio', text)}
        searchText={searchFilters['Servicio']?.include || ''}
        top={20}
        title="Distribución de citas por servicio"
        description="Gráfica de los 20 servicios con más citas"
      />





    </div>
  )
}

