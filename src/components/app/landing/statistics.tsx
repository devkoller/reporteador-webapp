"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Pacientes atendidos",
    value: 125000,
    description: "Atendidos en el último año en nuestros hospitales",
    prefix: "",
    suffix: "+",
  },
  {
    title: "Intervenciones quirúrgicas exitosas",
    value: 15000,
    description: "Realizadas en el último año",
    prefix: "",
    suffix: "+",
  },
  {
    title: "Profesionales de salud",
    value: 1200,
    description: "Dedicados a brindar atención de calidad",
    prefix: "",
    suffix: "",
  },
  {
    title: "Satisfacción del paciente",
    value: 96,
    description: "Basado en encuestas de satisfacción",
    prefix: "",
    suffix: "%",
  },
]

export function Statistics() {
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prevCounts) =>
        prevCounts.map((count, i) => {
          const target = stats[i].value
          const increment = Math.ceil(target / 50)
          return count + increment >= target ? target : count + increment
        }),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stat.prefix}
              {counts[i].toLocaleString()}
              {stat.suffix}
            </div>
            <CardDescription>{stat.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
