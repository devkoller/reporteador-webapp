import { AppointmentType } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Clock, AlertCircle } from "lucide-react"

interface NumbersProps {
  data: AppointmentType[];
  DataInfo: {
    appointmentDontFinalized: number;
    promedioMs: string;
  };
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]


export const Numbers = ({ data, DataInfo }: NumbersProps) => {


  const status = data.reduce<Record<string, number>>((acc, { EstadoCita }) => {
    acc[EstadoCita] = (acc[EstadoCita] || 0) + 1;
    return acc;
  }, {});
  const sortedStatus = Object.entries(status).sort(([, a], [, b]) => b - a);


  const serviceCounts = data.reduce<Record<string, number>>((acc, { Servicio }) => {
    acc[Servicio] = (acc[Servicio] || 0) + 1;
    return acc;
  }, {});

  const sortedServiceCounts = Object.entries(serviceCounts).sort(([, a], [, b]) => b - a);



  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citas totales</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.length}</div>
            <p className="text-sm text-muted-foreground">
              {status['CITADO']} citas pendientes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citas completadas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{status['VISITADO'] || 0}</div>
            <p className="text-sm text-muted-foreground">
              {status['NO PRESENTADO']} citas que no asistieron
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo promedio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DataInfo.promedioMs}</div>
            <p className="text-sm text-muted-foreground">
              de atención de entrada a salida
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citas no finalizadas</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DataInfo.appointmentDontFinalized}</div>
            <p className="text-sm text-muted-foreground">
              Citas que no han sido finalizadas
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              Estatus de citas
            </CardTitle>
            <CardDescription>
              Detalle de números por estatus de cita
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(sortedStatus).map(([, [key, value]], index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor:
                          COLORS[index % COLORS.length],
                      }}
                    />
                    <span>{key === 'null' ? 'No especificada' : key}</span>
                  </div>
                  <div className="font-medium">{value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Servicios {Object.entries(sortedServiceCounts).length} </CardTitle>
            <CardDescription>
              Detalle de citas por servicio (Mostrando los 20 más concurridos)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(sortedServiceCounts).map(([, [key, value]], index) => {
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor:
                            COLORS[
                            index % COLORS.length
                            ],
                        }}
                      />
                      <span>{key === 'null' ? 'No especificada' : key}</span>
                    </div>

                    <div className="font-medium">{value} - {((value / data.length) * 100).toFixed(2)}%</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
