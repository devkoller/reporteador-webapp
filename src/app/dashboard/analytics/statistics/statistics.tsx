import { Layout } from "@/components/auth"

import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useSession } from "@/hooks"
import {
  // BarChart3,
  CalendarDays,
  Activity,
  Users,
  HeartPulse,
  Stethoscope,
  // Building2,
  DollarSign,
  ArrowRight,
} from "lucide-react"

interface StatisticsCategoryProps {
  icon: React.ReactNode
  title: string
  description: string
  path: string
  color: string
  permission: number // Optional permission ID for access control
}

export const statistics = () => {
  const { user } = useSession()
  const statisticsCategories: StatisticsCategoryProps[] = [
    {
      icon: <CalendarDays className="h-10 w-10" />,
      title: "Citas y Programación",
      description: "Monitorear citas programadas, canceladas y asistidas",
      path: "/analitica/estadisticas/citados",
      color: "bg-blue-100 dark:bg-blue-900/20",
      permission: 4,
    },
    {
      icon: <HeartPulse className="h-10 w-10" />,
      title: "Ingresos y Egresos",
      description: "Monitor de ingresos y egresos hospitalarios",
      path: "/analitica/estadisticas/ingresos",
      color: "bg-red-100 dark:bg-red-900/20",
      permission: 5,
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Urgencias",
      description: "Monitor de urgencias y emergencias hospitalarias",
      path: "/analitica/estadisticas/urgencias",
      color: "bg-green-100 dark:bg-green-900/20",
      permission: 6,
    },
    {
      icon: <Activity className="h-10 w-10" />,
      title: "Cirugías y Procedimientos",
      description: "Monitor de cirugías y procedimientos realizados",
      path: "/analitica/estadisticas/cirugias",
      color: "bg-purple-100 dark:bg-purple-900/20",
      permission: 7,
    },
    {
      icon: <Stethoscope className="h-10 w-10" />,
      title: "Productividad y Eficiencia",
      description: "Monitor de productividad y eficiencia hospitalaria",
      path: "/analitica/estadisticas/productividad",
      color: "bg-amber-100 dark:bg-amber-900/20",
      permission: 8,
    },
    {
      icon: <DollarSign className="h-10 w-10" />,
      title: "Penalizaciones y Cumplimiento",
      description: "Monitor de penalizaciones y cumplimiento normativo",
      path: "/analitica/estadisticas/penalties",
      color: "bg-teal-100 dark:bg-teal-900/20",
      permission: 9,
    },
    {
      icon: <DollarSign className="h-10 w-10" />,
      title: "Incumplimientos",
      description: "Monitor de incumplimientos y acciones correctivas",
      path: "/analitica/estadisticas/incumplimientos",
      color: "bg-cyan-100 dark:bg-cyan-900/20",
      permission: 10,
    },
    // {
    //   icon: <BarChart3 className="h-10 w-10" />,
    //   title: "Reportes Personalizados",
    //   description: "Create and view custom statistical reports",
    //   path: "/estadisticas/citados",
    //   color: "bg-gray-100 dark:bg-gray-800",
    // },
  ]

  return (
    <Layout>
      <div className="flex flex-1 flex-col space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analítica y estadísticas</h1>
          <p className="text-muted-foreground">Selecciona la categoría para ver los el reporte estadístico detallado</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {statisticsCategories.map((category) => {
            if (!user.permissions.includes(category.permission)) return null;
            return (
              <Card key={category.title} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className={`${category.color} p-4`}>
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <CardTitle>{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardDescription className="text-sm text-foreground/80">{category.description}</CardDescription>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 p-2">
                  <Link to={category.path} className="ml-auto flex items-center gap-1">
                    <Button
                      variant="ghost"
                    >
                      <span className="text-sm font-medium">Ver reporte</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}
