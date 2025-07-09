import { PageLayout } from "@/components"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react"
import { Link } from "react-router-dom"

export const donateBlood = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative bg-red-600 text-white">
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:px-6 md:py-24">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Donar sangre puede salvar vidas</h1>
          <p className="mt-4 max-w-[700px] text-lg text-red-100">
            Cada donación puede salvar hasta tres vidas. Únete a nuestra misión de garantizar un suministro estable de sangre
            para los pacientes que lo necesiten.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-6 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
            asChild
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Regresar a la página principal
            </Link>
          </Button>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Programa tu cita para donar sangre
              </h2>
              <p className="mt-2 text-muted-foreground">
                Completa el formulario a continuación para programar tu cita para donar sangre en uno de nuestros hospitales.
              </p>

              <form className="mt-8 space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Nombres</Label>
                      <Input id="first-name" placeholder="Enter your first name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Apellidos</Label>
                      <Input id="last-name" placeholder="Enter your last name" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo</Label>
                    <Input id="email" type="email" placeholder="Enter your email" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="campus">Hospital</Label>
                    <Select>
                      <SelectTrigger id="campus">
                        <SelectValue placeholder="Selecciona un hospital" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="north">Fray Antonio Alcalde</SelectItem>
                        <SelectItem value="east">Dr. Juan I. Menchaca</SelectItem>
                        <SelectItem value="west">Hospital Civil de Oriente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha</Label>
                    <Input id="date" type="date" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Horario</Label>
                    <Select>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Selecciona un horario" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Mañana (8:00 AM - 12:00 PM)</SelectItem>
                        <SelectItem value="afternoon">Medio día (12:00 PM - 4:00 PM)</SelectItem>
                        <SelectItem value="evening">Tarde (4:00 PM - 8:00 PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Haz donado sangre antes</Label>
                    <RadioGroup defaultValue="no">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes">Sí</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notas adicionales</Label>
                    <Textarea id="notes" placeholder="Any additional information we should know" />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  <Calendar className="mr-2 h-4 w-4" />
                  Programar cita
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>
                    ¿Eres elegible para donar sangre?
                  </CardTitle>
                  <CardDescription>
                    Criterios básicos de elegibilidad para donantes de sangre
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-red-600" />
                    <p>
                      Tener al menos 17 años (16 con consentimiento parental en algunos estados)
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-red-600" />
                    <p>
                      Pesar al menos 50 KG
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-red-600" />
                    <p>
                      Tener buena salud general y sentirse bien
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-red-600" />
                    <p>
                      No haber donado sangre total en los últimos 56 días
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-red-600" />
                    <p>
                      No estar tomando ciertos medicamentos
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    Que esperar al donar sangre
                  </CardTitle>
                  <CardDescription>
                    Proceso de donación de sangre
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">
                        Registrarse
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Registrarse y leer información sobre la donación de sangre
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">
                        Historial de salud y mini-físico
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Contestar preguntas sobre su historial de salud y recibir un chequeo rápido de temperatura, pulso, presión
                        arterial y hemoglobina
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium">Donación</h3>
                      <p className="text-sm text-muted-foreground">
                        La donación real toma alrededor de 8-10 minutos
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium">
                        Refrigerios
                      </h3>
                      <p className="text-sm text-muted-foreground">

                        Disfruta de refrigerios mientras descansas 15 minutos antes de salir
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="rounded-lg bg-red-50 p-6">
                <h3 className="text-lg font-medium">Horarios de donación</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-start">
                    <Clock className="mr-2 h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">Fray Antonio Alcalde </p>
                      <p className="text-sm text-muted-foreground">Monday-Friday: 8am-8pm, Saturday: 8am-4pm</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="mr-2 h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">
                        Dr. Juan I. Menchaca
                      </p>
                      <p className="text-sm text-muted-foreground">Monday-Friday: 8am-8pm, Saturday: 8am-4pm</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="mr-2 h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">
                        Hospital Civil de Oriente
                      </p>
                      <p className="text-sm text-muted-foreground">Monday-Friday: 9am-5pm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-slate-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Tu donación puede marcar la diferencia
            </h2>
            <p className="mx-auto mt-2 max-w-[700px] text-muted-foreground">
              Cada dia los donantes de sangre ayudan a pacientes de todas las edades: victimas de accidentes y quemaduras, pacientes
              de cirugías cardíacas y trasplantes de órganos, y aquellos que luchan contra el cáncer.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <Calendar className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="mt-4">
                  Cada 2 segundos
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Cada 2 segundos, alguien en Mexico necesita sangre. Tu donación puede ayudar a salvar vidas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <MapPin className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="mt-4">
                  Impacto local
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Tu donación se queda en tu comunidad, ayudando a pacientes locales.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="mt-4">
                  Salva hasta 3 vidas
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Una donación de sangre puede ayudar a hasta tres personas diferentes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
