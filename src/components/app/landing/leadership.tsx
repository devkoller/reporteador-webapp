import Image from "@/assets/images/placeholder.svg"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const leaders = [
  {
    name: "Dra. María Elena González González",
    title: "Directora general",
    bio: "Dr. Johnson has over 25 years of experience in healthcare management and is board certified in Internal Medicine.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Dr. Hector Montes",
    title: "Director de Fray Antonio Alcalde",
    bio: "Dr. Chen specializes in Cardiology and has led numerous initiatives to improve patient care and outcomes.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Dr. Rafael Santana Ortíz",
    title: "Director de Juan I. Menchaca",
    bio: "Dr. Rodriguez is a respected Pediatrician who has transformed our East Campus into a center of excellence for family care.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Dr. James Wilson",
    title: "Director de Hospital Civil de Oriente",
    bio: "Dr. Wilson brings his expertise in Orthopedic Surgery to lead our specialized West Campus facilities.",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export function Leadership() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {leaders.map((leader, i) => (
        <Card key={i} className="overflow-hidden py-5">
          <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full">
            <img src={Image || "/placeholder.svg"} alt={leader.name} className="object-cover" />
          </div>
          <CardHeader className="text-center">
            <CardTitle>{leader.name}</CardTitle>
            <CardDescription className="text-lg font-medium">{leader.title}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">{leader.bio}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
