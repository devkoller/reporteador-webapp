import { PageLayout } from "@/components"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Clock, ArrowLeft, CalendarDays, Stethoscope, Heart } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import placeholder from "@/assets/images/placeholder.svg"

// Campus data
const campusData = {
  faa: {
    id: "north",
    name: "Fray Antonio Alcalde",
    tagline: "Excellence in Cardiac Care & Oncology",
    description:
      "Our flagship campus is a center of excellence for cardiac care and oncology, featuring state-of-the-art facilities and world-class specialists.",
    image: "/placeholder.svg?height=500&width=1200",
    address: "123 Medical Drive, North City, NC 12345",
    phone: "(555) 123-4567",
    hours: "24 hours, 7 days a week",
    emergencyServices: true,
    specialties: ["Cardiology", "Oncology", "Neurology", "Emergency Medicine", "Critical Care", "Radiology"],
    facilities: [
      "Cardiac Catheterization Lab",
      "Cancer Treatment Center",
      "Stroke Center",
      "Level I Trauma Center",
      "Advanced Imaging Center",
      "Inpatient Rehabilitation",
    ],
    doctors: [
      {
        name: "Dr. Michael Chen",
        title: "Campus Director, Cardiologist",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Dr. Rebecca Lee",
        title: "Chief of Oncology",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Dr. David Patel",
        title: "Neurologist",
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
  },
  jim: {
    id: "east",
    name: "Dr. Juan I. Menchaca",
    tagline: "Specialized in Women's Health & Pediatrics",
    description:
      "Our East Campus is dedicated to women's health, pediatrics, and family medicine, providing compassionate care for patients of all ages.",
    image: "/placeholder.svg?height=500&width=1200",
    address: "456 Health Avenue, East City, EC 23456",
    phone: "(555) 234-5678",
    hours: "24 hours, 7 days a week",
    emergencyServices: true,
    specialties: [
      "Obstetrics & Gynecology",
      "Pediatrics",
      "Family Medicine",
      "Neonatal Care",
      "Maternal-Fetal Medicine",
      "Reproductive Endocrinology",
    ],
    facilities: [
      "Birth Center",
      "Neonatal Intensive Care Unit",
      "Pediatric Emergency Department",
      "Women's Imaging Center",
      "Family Care Clinic",
      "Fertility Center",
    ],
    doctors: [
      {
        name: "Dr. Emily Rodriguez",
        title: "Campus Director, Pediatrician",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Dr. Sarah Thompson",
        title: "Chief of Obstetrics",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Dr. Lisa Wong",
        title: "Family Medicine Specialist",
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
  },
  hco: {
    id: "west",
    name: "Hospital Civil de Oriente",
    tagline: "Leaders in Orthopedics & Rehabilitation",
    description:
      "Our West Campus specializes in orthopedics, rehabilitation, and sports medicine, helping patients recover and return to their active lifestyles.",
    image: "/placeholder.svg?height=500&width=1200",
    address: "789 Wellness Blvd, West City, WC 34567",
    phone: "(555) 345-6789",
    hours: "Monday-Friday: 7am-9pm, Saturday-Sunday: 8am-5pm",
    emergencyServices: false,
    specialties: [
      "Orthopedic Surgery",
      "Sports Medicine",
      "Physical Therapy",
      "Occupational Therapy",
      "Pain Management",
      "Rheumatology",
    ],
    facilities: [
      "Orthopedic Surgery Center",
      "Sports Medicine Clinic",
      "Rehabilitation Center",
      "Aquatic Therapy Pool",
      "Motion Analysis Lab",
      "Prosthetics & Orthotics",
    ],
    doctors: [
      {
        name: "Dr. James Wilson",
        title: "Campus Director, Orthopedic Surgeon",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Dr. Robert Johnson",
        title: "Sports Medicine Specialist",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Dr. Maria Garcia",
        title: "Physical Medicine & Rehabilitation",
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
  },
}

export const campusId = () => {
  const location = useLocation()
  let url = location.pathname
  let campusId = url.split("/").pop()
  let campus = campusData[campusId as keyof typeof campusData]

  if (!campus) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold">El hospital no fue encontrado</h1>
          <p className="mt-4 text-lg">El hospital que buscas no existe.</p>
          <Link to="/">
            <Button variant="outline" className="mt-6">
              Regresar
            </Button>
          </Link>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[400px] w-full">
          <img src={placeholder} alt={campus.name} className="object-cover h-[400px] w-full" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="container px-4 md:px-6">
            <Button variant="outline" size="sm" className="mb-4 bg-white/20 backdrop-blur-sm" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Regresar a la página principal
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tighter text-white drop-shadow-md sm:text-4xl md:text-5xl">
              {campus.name}
            </h1>
            <p className="mt-2 max-w-[700px] text-xl text-white drop-shadow-md">{campus.tagline}</p>
          </div>
        </div>
      </section>

      {/* Campus Information */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Acerca de {campus.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{campus.description}</p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="flex items-start">
                    <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Dirección</h3>
                      <p className="text-sm text-muted-foreground">{campus.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Teléfono</h3>
                      <p className="text-sm text-muted-foreground">{campus.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Horario</h3>
                      <p className="text-sm text-muted-foreground">{campus.hours}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Stethoscope className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Servicio de emergencias</h3>
                      <p className="text-sm text-muted-foreground">
                        {campus.emergencyServices ? "Available 24/7" : "Not available at this campus"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acciones rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">Agendar una cita</Button>
                <Button variant="outline" className="w-full">
                  Buscar un médico
                </Button>
                <Button variant="outline" className="w-full">
                  Obtener direcciones
                </Button>
                <Button variant="outline" className="w-full">
                  Tour virtual
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs defaultValue="specialties">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specialties">Especialidades</TabsTrigger>
              <TabsTrigger value="facilities">
                Servicios
              </TabsTrigger>
              <TabsTrigger value="doctors">Nuestros doctores</TabsTrigger>
            </TabsList>
            <TabsContent value="specialties" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Especialidades medicas</CardTitle>
                  <CardDescription>{campus.name} ofrece las siguientes especialidades medicas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                    {campus.specialties.map((specialty, i) => (
                      <div key={i} className="flex items-center">
                        <div className="mr-2 h-2 w-2 rounded-full bg-primary" />
                        <span>{specialty}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="facilities" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Instalaciones y servicios
                  </CardTitle>
                  <CardDescription>
                    {campus.name} cuenta con las siguientes instalaciones y servicios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                    {campus.facilities.map((facility, i) => (
                      <div key={i} className="flex items-center">
                        <div className="mr-2 h-2 w-2 rounded-full bg-primary" />
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="doctors" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Nuestros doctores
                  </CardTitle>
                  <CardDescription>
                    {campus.name} cuenta con un equipo de medicos altamente capacitados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {campus.doctors.map((doctor, i) => (
                      <div key={i} className="flex flex-col items-center text-center">
                        <div className="relative h-32 w-32 overflow-hidden rounded-full">
                          <img
                            src={placeholder}
                            alt={doctor.name}
                            className="object-cover"
                          />
                        </div>
                        <h3 className="mt-4 font-medium">{doctor.name}</h3>
                        <p className="text-sm text-muted-foreground">{doctor.title}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Próximos eventos</h2>
              <p className="text-muted-foreground">Eventos y actividades en {campus.name}</p>
            </div>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <CalendarDays className="mr-2 h-4 w-4" />
              Ver todos los eventos
            </Button>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  Dia de Chequeo de Salud
                </CardTitle>
                <CardDescription>May 15, 2023 • 9:00 AM - 3:00 PM</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Free health screenings including blood pressure, cholesterol, and glucose tests.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  Grupo de apoyo para diabetes

                </CardTitle>
                <CardDescription>May 20, 2023 • 6:00 PM - 7:30 PM</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Monthly meeting for individuals living with diabetes and their families.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  Clase de preparación para el parto
                </CardTitle>
                <CardDescription>May 27-28, 2023 • 10:00 AM - 2:00 PM</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Two-day workshop for expectant parents to prepare for childbirth.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Button variant="outline">
              <CalendarDays className="mr-2 h-4 w-4" />
              Ver todos los eventos
            </Button>
          </div>
        </div>
      </section>

      {/* Blood Donation CTA */}
      <section className="bg-red-50 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Donar sangre puede salvar vidas</h2>
            <p className="mt-2 max-w-[600px] text-muted-foreground">
              Tu donación de sangre puede ayudar a salvar hasta tres vidas. Únete a nuestra misión para garantizar un suministro
              estable de sangre para los pacientes que lo necesiten.
            </p>
            <Button size="lg" className="mt-6 bg-red-600 hover:bg-red-700">
              <Heart className="mr-2 h-4 w-4" />
              Agenda una cita para donar sangre
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
