import { PageLayout } from "@/components"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Link, Outlet } from "react-router-dom"
import placeholder from "@/assets/images/placeholder.svg"

const newsArticles = [
  {
    id: 1,
    title: "Nuevo Avance en Investigación sobre Tratamiento del Cáncer",
    excerpt:
      "Investigadores del Sistema de Salud han desarrollado un nuevo enfoque prometedor para tratar ciertos tipos de cáncer.",
    content:
      "Researchers at Panacea Healthcare System's North Campus have developed a promising new approach to treating certain types of cancer. The team, led by Dr. Rebecca Lee, Chief of Oncology, has been working on this innovative treatment for the past three years. Initial clinical trials have shown remarkable results, with a significant reduction in tumor size in 75% of participants. The treatment combines targeted immunotherapy with a novel drug delivery system that minimizes side effects while maximizing effectiveness.",
    date: "May 1, 2023",
    author: "Dr. Rebecca Lee",
    category: "Investigación",
    image: "/placeholder.svg?height=400&width=600",
    slug: "new-research-breakthrough-cancer-treatment",
  },
  {
    id: 2,
    title: "El Hospital recibe reconocimiento nacional por excelencia en atención al paciente",
    excerpt: "El hospital ha sido galardonado con el prestigioso Premio Nacional a la Excelencia en Atención al Paciente 2023.",
    content:
      "Panacea Healthcare System has been awarded the prestigious National Excellence in Patient Care Award for 2023. This recognition comes after a comprehensive evaluation of patient satisfaction scores, quality metrics, and healthcare outcomes across all three campuses. The award particularly highlighted our innovative patient experience initiatives, including the new digital patient portal, expanded visiting hours, and the patient advocate program. Dr. Sarah Johnson, General Director, accepted the award at the National Healthcare Conference last week, attributing the success to the dedication and compassion of the entire Panacea team.",
    date: "April 15, 2023",
    author: "Communications Department",
    category: "Awards",
    image: "/placeholder.svg?height=400&width=600",
    slug: "hospital-receives-excellence-patient-care-award",
  },
  {
    id: 3,
    title: "Community Health Initiative Launches Next Month",
    excerpt:
      "Our new program aims to address healthcare disparities in underserved communities through education and free screenings.",
    content:
      "Panacea Healthcare System is proud to announce the launch of our new Community Health Initiative, set to begin next month. This comprehensive program aims to address healthcare disparities in underserved areas of our community through education, preventive care, and free health screenings. Mobile health units will visit neighborhoods with limited healthcare access, offering services such as blood pressure checks, diabetes screenings, and basic health consultations. The initiative also includes health education workshops at community centers and schools, focusing on nutrition, exercise, and preventive care. This program represents a significant investment in community health and aligns with our mission to improve health outcomes for all members of our community.",
    date: "April 3, 2023",
    author: "Community Outreach Team",
    category: "Community",
    image: "/placeholder.svg?height=400&width=600",
    slug: "community-health-initiative-launches-next-month",
  },
  {
    id: 4,
    title: "New State-of-the-Art MRI Machine Installed at East Campus",
    excerpt:
      "The latest addition to our diagnostic imaging department will provide faster, more detailed scans with enhanced patient comfort.",
    content:
      "Panacea Healthcare System's East Campus has installed a new state-of-the-art MRI machine that represents the latest in diagnostic imaging technology. The new equipment provides higher resolution images in less time, reducing scan duration by up to 40% compared to conventional MRI machines. It also features a wider bore design that enhances patient comfort and reduces feelings of claustrophobia. The machine's advanced software allows for specialized imaging protocols that can detect subtle abnormalities that might be missed with standard equipment. This investment in cutting-edge technology reflects our commitment to providing the most accurate diagnoses and best possible care for our patients.",
    date: "March 20, 2023",
    author: "Dr. Jennifer Adams",
    category: "Technology",
    image: "/placeholder.svg?height=400&width=600",
    slug: "new-state-of-the-art-mri-machine-installed",
  },
  {
    id: 5,
    title: "Panacea Healthcare System Expands Telemedicine Services",
    excerpt:
      "In response to growing demand, we are expanding our virtual care options to include more specialties and services.",
    content:
      "Building on the success of our initial telemedicine program, Panacea Healthcare System is significantly expanding our virtual care services. The expanded program will now include consultations with specialists in cardiology, dermatology, endocrinology, and mental health, in addition to the primary care services already offered. Patients can now schedule virtual follow-up appointments, receive certain test results, and consult with their healthcare providers from the comfort of their homes. This expansion reflects our commitment to making healthcare more accessible and convenient for our patients, particularly those with mobility challenges or those living in remote areas. The telemedicine platform has been upgraded to ensure secure, high-quality video connections and seamless integration with our electronic health record system.",
    date: "March 5, 2023",
    author: "Digital Health Department",
    category: "Services",
    image: "/placeholder.svg?height=400&width=600",
    slug: "panacea-healthcare-system-expands-telemedicine-services",
  },
  {
    id: 6,
    title: "West Campus Rehabilitation Center Celebrates 5,000th Patient",
    excerpt:
      "Our specialized rehabilitation facility reaches a significant milestone in helping patients recover from injuries and surgeries.",
    content:
      "The Rehabilitation Center at Panacea's West Campus recently celebrated a significant milestone: providing care to its 5,000th patient since opening in 2018. The center specializes in physical therapy, occupational therapy, and sports medicine, helping patients recover from injuries, surgeries, and chronic conditions. To mark this achievement, the center hosted a celebration attended by current and former patients, staff, and community members. During the event, several patients shared inspiring stories of their recovery journeys. The Rehabilitation Center has consistently received high satisfaction ratings, with 95% of patients reporting significant improvement in function and quality of life following their treatment programs.",
    date: "February 15, 2023",
    author: "Rehabilitation Department",
    category: "Milestones",
    image: "/placeholder.svg?height=400&width=600",
    slug: "west-campus-rehabilitation-center-celebrates-5000th-patient",
  },
]

export const news = () => {
  return (
    <>
      <PageLayout>

        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <Button variant="outline" size="sm" className="mb-8" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Regresar a la página principal
              </Link>
            </Button>

            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ultimas noticias</h1>
                <p className="text-muted-foreground">
                  Mantente informado sobre los últimos avances, eventos y noticias del Hospital Civil de Guadalajara.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {newsArticles.map((article, index) => (
                  <Card key={index} className="flex h-full flex-col">
                    <div className="relative h-48 w-full">
                      <img
                        src={placeholder}
                        alt={article.title}
                        className="object-cover h-48 w-full"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{article.date}</span>
                      </div>
                      <CardTitle className="line-clamp-2">
                        <Link to={`/noticias/${index}`} className="hover:underline">
                          {article.title}
                        </Link>
                      </CardTitle>
                      <CardDescription>{article.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="line-clamp-3 text-muted-foreground">{article.excerpt}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild className="w-full">
                        <Link to={`/noticias/${index + 1}`}>Leer el articulo completo</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="flex items-center justify-center space-x-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous page</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  3
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next page</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
      <Outlet />

    </>
  )
}
