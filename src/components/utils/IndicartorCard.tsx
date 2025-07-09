import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export interface IndicatorCardProps<T> {
  title: string
  description: string
  data: T[]
  /**
   * Compute the value to display based on the provided data array.
   * Can return a number, string, or React node for more complex outputs.
   */
  computeValue: (data: T[]) => React.ReactNode
}

/**
 * A generic, reusable card component for displaying numeric or textual indicators.
 */
export function IndicatorCard<T>({
  title,
  description,
  data,
  computeValue,
}: IndicatorCardProps<T>) {
  const value = computeValue(data)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

// Usage examples:
//
// <IndicatorCard
//   title="Pacientes"
//   description="Egresados"
//   data={filteredData}
//   computeValue={data => data.filter(item => item.fechaegr != null).length}
// />
//
// <IndicatorCard
//   title="Estancia Promedio"
//   description="Días de estancia"
//   data={filteredData}
//   computeValue={data => {
//     const sum = data.reduce((acc, item) => acc + item.numdias, 0)
//     return (data.length > 0 ? (sum / data.length).toFixed(2) : '0')
//   }}
// />
//
// <IndicatorCard
//   title="Estancia por Servicio"
//   description="Promedio días agrupado"
//   data={filteredData}
//   computeValue={data => {
//     const groups = data.reduce<Record<string, { sum: number; count: number }>>((acc, item) => {
//       const key = item.servicio || 'Desconocido'
//       if (!acc[key]) acc[key] = { sum: 0, count: 0 }
//       acc[key].sum += item.numdias
//       acc[key].count += 1
//       return acc
//     }, {})
//     return (
//       <div className="space-y-1">
//         {Object.entries(groups).map(([serv, { sum, count }]) => (
//           <div key={serv} className="flex justify-between">
//             <span>{serv}</span>
//             <span>{(sum / count).toFixed(1)}</span>
//           </div>
//         ))}
//       </div>
//     )
//   }}
// />
