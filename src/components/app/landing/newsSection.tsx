import Image from "@/assets/images/placeholder.svg"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const newsArticles = [
  {
    title: "Nuevo Tratamiento para el Cáncer en Desarrollo",
    excerpt:
      "Nuestros investigadores están trabajando en un nuevo tratamiento innovador que promete mejorar la tasa de supervivencia en pacientes con cáncer.",
    date: "May 1, 2023",
    image: "/placeholder.svg?height=200&width=400",
    link: '/noticias/',
  },
  {
    title: "El Hospital recibe reconocimiento nacional",
    excerpt: "El Hospital ha sido reconocido como uno de los mejores hospitales del país por su excelencia en atención médica y servicios.",
    date: "April 15, 2023",
    image: "/placeholder.svg?height=200&width=400",
    link: '/noticias/',
  },
  {
    title: "Nuevo programa de salud comunitaria",
    excerpt:
      "El Hospital lanza un nuevo programa de salud comunitaria para mejorar el acceso a la atención médica en áreas desatendidas.",
    date: "April 3, 2023",
    image: "/placeholder.svg?height=200&width=400",
    link: '/noticias/',
  },
]

export function NewsSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {newsArticles.map((article, i) => (
        <Card key={i} className="flex h-full flex-col">
          <div className="relative h-48 w-full">
            <img src={Image || "/placeholder.svg"} alt={article.title} className="object-cover h-48 w-full" />
          </div>
          <CardHeader>
            <CardDescription>{article.date}</CardDescription>
            <CardTitle className="line-clamp-2">{article.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="line-clamp-3 text-muted-foreground">{article.excerpt}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to={article.link + i}>Leer articulo completo</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
