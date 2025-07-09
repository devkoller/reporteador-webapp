import Image from "@/assets/images/placeholder.svg"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone } from "lucide-react"

const campuses = [
  {
    id: "faa",
    name: "Fray Antonio Alcalde",
    description: "Nuestro primer hospital Civil, fundado en 1790",
    image: "/placeholder.svg?height=300&width=500",
    address: "123 Medical Drive, North City, NC 12345",
    phone: "(555) 123-4567",
    directions: "https://maps.google.com",
  },
  {
    id: "jim",
    name: "Dr. Juan I. Menchaca",
    description: "Nuestro segundo hospital Civil, inaugurado en 1970",
    image: "/placeholder.svg?height=300&width=500",
    address: "456 Health Avenue, East City, EC 23456",
    phone: "(555) 234-5678",
    directions: "https://maps.google.com",
  },
  {
    id: "hco",
    name: "Hospital Civil de Oriente",
    description: "Nuestro tercer hospital Civil, abierto desde 1990",
    image: "/placeholder.svg?height=300&width=500",
    address: "789 Wellness Blvd, West City, WC 34567",
    phone: "(555) 345-6789",
    directions: "https://maps.google.com",
  },
]

export function CampusShowcase() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {campuses.map((campus) => (
        <Card key={campus.id} className="overflow-hidden">
          <div className="relative h-48 w-full">
            <img src={Image || "/placeholder.svg"} alt={campus.name} className="object-cover h-48 w-full " />
          </div>
          <CardHeader>
            <CardTitle>{campus.name}</CardTitle>
            <CardDescription>{campus.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>{campus.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>{campus.phone}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link to={campus.directions} target="_blank" rel="noopener noreferrer">
                Obtener Direcciones
              </Link>
            </Button>
            <Button asChild>
              <Link to={`/hospitales/${campus.id}`}>
                Ver Más
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
