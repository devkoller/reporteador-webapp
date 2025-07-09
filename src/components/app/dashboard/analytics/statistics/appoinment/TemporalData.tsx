import { AppointmentType } from "@/types"
import { GenericChart } from "@/components/utils";

interface TemporalDataProps {
  data: AppointmentType[];
  handleFilter: (key: keyof AppointmentType, value: string) => void;
}

export const TemporalData = ({ data, handleFilter }: TemporalDataProps) => {


  return (
    <div className='space-y-8'>
      <GenericChart
        data={data}
        getKey={item => item.Fecha}
        sortBy="key"
        chartType="line"
        onFilter={val => handleFilter('Fecha', val)}
        title="Citas por Día"
        sortOrder="asc"
        description="Número de citas por día"
      />

      <GenericChart
        data={data}
        getKey={item => item.Hora.split(':')[0]}
        chartType="bar"
        sortBy="key"
        onFilter={val => handleFilter('Hora', val)}
        title="Hora de la cita"
        description="Horarios con mayor número de citas"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GenericChart
          data={data}
          getKey={item => item.Tipo}
          chartType="pie"
          onFilter={val => handleFilter('Tipo', val)}
          title="Tipo de cita"
        />
        <GenericChart
          data={data}
          getKey={item => item.EstadoCita}
          chartType="pie"
          onFilter={val => handleFilter('EstadoCita', val)}
          title="Estado de la cita"
        />
      </div>
    </div>
  )
}
