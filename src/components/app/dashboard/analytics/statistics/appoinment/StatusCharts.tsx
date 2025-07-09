import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { AppointmentType } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"



interface StatusChartsProps {
  data: AppointmentType[];
  handleFilter: (key: keyof AppointmentType, value: string) => void;
}

export const StatusCharts = ({ data, handleFilter }: StatusChartsProps) => {


  const parseDateTime = (date: string, time: string) => new Date(`${date}T${time}`);

  // 1. Tasa de citas activas vs canceladas por día
  const activeStats: Record<string, { active: number; cancelled: number }> = {};
  data.forEach(({ Fecha, activa_sn }) => {
    if (!activeStats[Fecha]) activeStats[Fecha] = { active: 0, cancelled: 0 };
    if (activa_sn === 'S') activeStats[Fecha].active++;
    else activeStats[Fecha].cancelled++;
  });
  const dailyActiveData = Object.entries(activeStats)
    .map(([date, stats]) => ({ date, ...stats }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // 2. Tasa de asistencia confirmada por día
  const confirmStats: Record<string, { confirmed: number; notConfirmed: number }> = {};
  data.forEach(({ Fecha, asist_conf_sn }) => {
    if (!confirmStats[Fecha]) confirmStats[Fecha] = { confirmed: 0, notConfirmed: 0 };
    if (asist_conf_sn === 'S') confirmStats[Fecha].confirmed++;
    else confirmStats[Fecha].notConfirmed++;
  });
  const dailyConfirmData = Object.entries(confirmStats)
    .map(([date, stats]) => ({ date, ...stats }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // 3. Tiempo hasta confirmación (minutos)
  const delayStats: Record<string, { totalDelay: number; count: number }> = {};
  data.forEach(({ fecha_emision, hora_emision, hora_llamada }) => {
    if (!hora_llamada) return;
    const dateKey = fecha_emision;
    if (!delayStats[dateKey]) delayStats[dateKey] = { totalDelay: 0, count: 0 };
    const issued = parseDateTime(fecha_emision, hora_emision);
    const called = parseDateTime(fecha_emision, hora_llamada);
    delayStats[dateKey].totalDelay += (called.getTime() - issued.getTime()) / 60000;
    delayStats[dateKey].count++;
  });

  // 4. Número de solicitudes por día y por Servicio
  const requestsByDay: Record<string, number> = {};
  const requestsByService: Record<string, number> = {};
  data.forEach(({ Fecha, n_solic, Servicio }) => {
    requestsByDay[Fecha] = (requestsByDay[Fecha] || 0) + n_solic;
    requestsByService[Servicio] = (requestsByService[Servicio] || 0) + n_solic;
  });

  return (
    <div className='space-y-8'>
      <Card>
        <CardHeader>
          <CardTitle>Citas Activas vs Canceladas por Día</CardTitle>
          <CardDescription>
            Gráfico de citas activas vs canceladas por día. Muestra la cantidad de citas activas y canceladas para cada día.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex h-[400px] items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center gap-8 md:flex-row">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyActiveData} onClick={(e) => {
                handleFilter('activa_sn', e.activeLabel || '');
              }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" name="Activas" fill="#82ca9d" />
                <Bar dataKey="cancelled" name="Canceladas" fill="#ff7f7f" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Asistencia Confirmada vs No Confirmada por Día</CardTitle>
          <CardDescription>
            Gráfico de asistencia confirmada vs no confirmada por día. Muestra la cantidad de citas confirmadas y no confirmadas para cada día.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex h-[400px] items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center gap-8 md:flex-row">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyConfirmData} onClick={(e) => {
                handleFilter('asist_conf_sn', e.activeLabel || '');
              }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="confirmed" name="Confirmadas" fill="#0088FE" />
                <Bar dataKey="notConfirmed" name="No Confirmadas" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>




    </div>
  )
}
