import { PageLayout } from "@/components"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, User } from "lucide-react"
// import { notFound } from "next/navigation"
import { Link, useParams } from "react-router-dom"
import placeholder from "@/assets/images/placeholder.svg"

// Sample news data (same as in the news listing page)
const newsArticles = [
  {
    id: 1,
    title: "Nuevo Avance en Investigación del Cáncer",
    excerpt:
      "Our oncology team has made significant progress in developing a new treatment approach for certain types of cancer.",
    content:
      'Researchers at Panacea Healthcare System\'s North Campus have developed a promising new approach to treating certain types of cancer. The team, led by Dr. Rebecca Lee, Chief of Oncology, has been working on this innovative treatment for the past three years. Initial clinical trials have shown remarkable results, with a significant reduction in tumor size in 75% of participants. The treatment combines targeted immunotherapy with a novel drug delivery system that minimizes side effects while maximizing effectiveness.\n\nThe research, which began as a collaboration between our oncology and pharmacology departments, has attracted attention from medical institutions across the country. The approach targets cancer cells with unprecedented precision, leaving healthy cells largely unaffected. This significantly reduces the side effects commonly associated with traditional cancer treatments.\n\n"What makes this approach unique is the way we\'ve combined existing immunotherapy techniques with our new drug delivery system," explains Dr. Lee. "The delivery system allows us to direct the treatment specifically to cancer cells, which means we can use lower doses of medication while achieving better results."\n\nThe clinical trial, which included 120 patients with various types of cancer, is now entering its final phase. If the results continue to be positive, the team hopes to make the treatment widely available within the next two years, pending regulatory approval.\n\nThis breakthrough represents a significant step forward in cancer treatment and highlights Panacea Healthcare System\'s commitment to advancing medical research and improving patient outcomes.',
    date: "May 1, 2023",
    author: "Dr. Rebecca Lee",
    category: "Investigación",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "new-research-breakthrough-cancer-treatment",
    gallery: [
      {
        title: "Research Team Meeting",
        description: "Dr. Lee and her team discussing research findings",
        image: "/placeholder.svg?key=y4kuc",
      },
      {
        title: "Laboratory Analysis",
        description: "Advanced equipment used in the cancer treatment research",
        image: "/placeholder.svg?key=a5kf4",
      },
      {
        title: "Patient Consultation",
        description: "Dr. Lee consulting with a clinical trial participant",
        image: "/placeholder.svg?key=vcucq",
      },
      {
        title: "Research Presentation",
        description: "Presenting initial findings at the medical conference",
        image: "/placeholder.svg?key=k6bbw",
      },
    ],
  },
  {
    id: 2,
    title: "Hospital Receives Excellence in Patient Care Award",
    excerpt: "Panacea Healthcare System has been recognized nationally for outstanding patient care and satisfaction.",
    content:
      'Panacea Healthcare System has been awarded the prestigious National Excellence in Patient Care Award for 2023. This recognition comes after a comprehensive evaluation of patient satisfaction scores, quality metrics, and healthcare outcomes across all three campuses. The award particularly highlighted our innovative patient experience initiatives, including the new digital patient portal, expanded visiting hours, and the patient advocate program. Dr. Sarah Johnson, General Director, accepted the award at the National Healthcare Conference last week, attributing the success to the dedication and compassion of the entire Panacea team.\n\n"This award belongs to every member of our staff, from our physicians and nurses to our administrative and support teams," said Dr. Johnson during her acceptance speech. "Their unwavering commitment to providing exceptional care with compassion and dignity is what makes Panacea Healthcare System special."\n\nThe National Excellence in Patient Care Award is given annually to healthcare institutions that demonstrate outstanding achievement in patient satisfaction, quality of care, and innovative approaches to healthcare delivery. The selection committee specifically noted Panacea\'s holistic approach to patient care, which addresses not only physical health but also emotional and social well-being.\n\nOver the past year, Panacea has implemented several initiatives to enhance the patient experience, including a redesigned patient portal that provides easier access to medical records and appointment scheduling, extended visiting hours that accommodate diverse family schedules, and a robust patient advocate program that ensures patient voices are heard and addressed.\n\nThe award also recognized Panacea\'s commitment to continuous improvement, with regular feedback mechanisms that allow patients to share their experiences and suggestions. This feedback has led to numerous enhancements in service delivery across all departments.\n\nAs Panacea continues to grow and evolve, this recognition serves as both a validation of current practices and an inspiration for future innovations in patient care.',
    date: "April 15, 2023",
    author: "Communications Department",
    category: "Awards",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "hospital-receives-excellence-patient-care-award",
    gallery: [
      {
        title: "Award Ceremony",
        description: "Dr. Johnson accepting the Excellence in Patient Care Award",
        image: "/placeholder.svg?key=evgsr",
      },
      {
        title: "Staff Celebration",
        description: "Hospital staff celebrating the achievement",
        image: "/placeholder.svg?height=600&width=800&query=hospital+staff+celebration",
      },
      {
        title: "Patient Portal Demo",
        description: "Demonstration of the new patient portal system",
        image: "/placeholder.svg?height=600&width=800&query=digital+healthcare+portal",
      },
      {
        title: "Patient Advocate Team",
        description: "The dedicated patient advocate team at Panacea",
        image: "/placeholder.svg?height=600&width=800&query=healthcare+patient+advocates",
      },
    ],
  },
  {
    id: 3,
    title: "Community Health Initiative Launches Next Month",
    excerpt:
      "Our new program aims to address healthcare disparities in underserved communities through education and free screenings.",
    content:
      'Panacea Healthcare System is proud to announce the launch of our new Community Health Initiative, set to begin next month. This comprehensive program aims to address healthcare disparities in underserved areas of our community through education, preventive care, and free health screenings. Mobile health units will visit neighborhoods with limited healthcare access, offering services such as blood pressure checks, diabetes screenings, and basic health consultations. The initiative also includes health education workshops at community centers and schools, focusing on nutrition, exercise, and preventive care. This program represents a significant investment in community health and aligns with our mission to improve health outcomes for all members of our community.\n\nThe Community Health Initiative was developed in response to data showing significant healthcare disparities in certain neighborhoods within our service area. Analysis revealed that residents in these areas have higher rates of chronic diseases such as diabetes and hypertension, yet lower rates of preventive care and regular health screenings.\n\n"Access to healthcare shouldn\'t depend on your zip code," says Maria Rodriguez, Director of Community Outreach at Panacea. "With this initiative, we\'re bringing essential health services directly to the people who need them most."\n\nThe program will deploy two fully equipped mobile health units that will rotate through underserved neighborhoods on a regular schedule. Each unit will be staffed by healthcare professionals who can provide basic health assessments, screenings, and referrals to appropriate follow-up care when needed. Services will be provided free of charge, with no insurance required.\n\nIn addition to the mobile units, the initiative includes a series of health education workshops designed to empower community members with knowledge about managing their health. Topics will include nutrition, physical activity, chronic disease management, and navigating the healthcare system.\n\nPanacea has partnered with several community organizations, including local churches, schools, and community centers, to ensure the program reaches those who would benefit most. The initiative is funded through a combination of hospital resources and a generous grant from the Regional Health Foundation.\n\nThe Community Health Initiative represents Panacea\'s commitment to addressing the social determinants of health and ensuring that quality healthcare is accessible to all members of our community.',
    date: "April 3, 2023",
    author: "Community Outreach Team",
    category: "Community",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "community-health-initiative-launches-next-month",
    gallery: [
      {
        title: "Mobile Health Unit",
        description: "One of our new mobile health units that will serve the community",
        image: "/placeholder.svg?height=600&width=800&query=mobile+health+unit",
      },
      {
        title: "Community Meeting",
        description: "Planning session with community partners",
        image: "/placeholder.svg?height=600&width=800&query=community+health+meeting",
      },
      {
        title: "Health Education Workshop",
        description: "Sample health education materials for the initiative",
        image: "/placeholder.svg?height=600&width=800&query=health+education+materials",
      },
      {
        title: "Screening Equipment",
        description: "Medical equipment that will be used for community screenings",
        image: "/placeholder.svg?height=600&width=800&query=medical+screening+equipment",
      },
    ],
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
    image: "/placeholder.svg?height=600&width=1200",
    slug: "new-state-of-the-art-mri-machine-installed",
    gallery: [
      {
        title: "New MRI Machine",
        description: "The newly installed state-of-the-art MRI machine",
        image: "/placeholder.svg?height=600&width=800&query=modern+mri+machine",
      },
      {
        title: "Installation Process",
        description: "Technical team installing the new equipment",
        image: "/placeholder.svg?height=600&width=800&query=medical+equipment+installation",
      },
      {
        title: "Control Room",
        description: "The advanced control room for the new MRI system",
        image: "/placeholder.svg?height=600&width=800&query=mri+control+room",
      },
      {
        title: "First Patient Scan",
        description: "Preparing for the first patient scan with the new equipment",
        image: "/placeholder.svg?height=600&width=800&query=patient+mri+preparation",
      },
    ],
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
    image: "/placeholder.svg?height=600&width=1200",
    slug: "panacea-healthcare-system-expands-telemedicine-services",
    gallery: [
      {
        title: "Telemedicine Platform",
        description: "Screenshot of our upgraded telemedicine platform",
        image: "/placeholder.svg?height=600&width=800&query=telemedicine+platform",
      },
      {
        title: "Virtual Consultation",
        description: "Doctor conducting a virtual consultation with a patient",
        image: "/placeholder.svg?height=600&width=800&query=virtual+doctor+consultation",
      },
      {
        title: "Training Session",
        description: "Staff training on the new telemedicine features",
        image: "/placeholder.svg?height=600&width=800&query=medical+staff+training",
      },
      {
        title: "Patient Using Telemedicine",
        description: "Patient accessing healthcare services from home",
        image: "/placeholder.svg?height=600&width=800&query=patient+using+telemedicine",
      },
    ],
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
    image: "/placeholder.svg?height=600&width=1200",
    slug: "west-campus-rehabilitation-center-celebrates-5000th-patient",
    gallery: [
      {
        title: "Celebration Event",
        description: "Staff and patients celebrating the 5,000th patient milestone",
        image: "/placeholder.svg?height=600&width=800&query=hospital+celebration+event",
      },
      {
        title: "Rehabilitation Facility",
        description: "The state-of-the-art rehabilitation center at West Campus",
        image: "/placeholder.svg?height=600&width=800&query=modern+rehabilitation+center",
      },
      {
        title: "Physical Therapy Session",
        description: "A physical therapist working with a patient",
        image: "/placeholder.svg?height=600&width=800&query=physical+therapy+session",
      },
      {
        title: "Patient Success Story",
        description: "A former patient sharing their recovery journey",
        image: "/placeholder.svg?height=600&width=800&query=patient+testimonial",
      },
    ],
  },
]

export const newsId = () => {
  const params = useParams()
  const article = newsArticles.find((article) => article.id === parseInt(params.id || '1'))

  if (!article) {
    // notFound()
    return <PageLayout>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Noticia no encontrada</h1>
        <p className="mt-4 text-lg">
          Lo sentimos, no hemos podido encontrar la noticia que estás buscando.
        </p>
        <Button variant="outline" size="sm" className="mt-8" asChild>
          <Link to="/noticias">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Regresar a la lista de noticias
          </Link>
        </Button>
      </div>
    </PageLayout>
  }

  const relatedArticles = newsArticles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3)

  return (
    <PageLayout>
      <article>
        {/* Hero Section */}
        <div className="relative h-[400px] w-full">
          <img
            src={placeholder}
            alt={article.title}
            className="object-cover w-full h-[400px]"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-end">
            <div className="container px-4 pb-12 md:px-6 md:pb-16">
              <Button variant="outline" size="sm" className="mb-4 bg-white/20 backdrop-blur-sm" asChild>
                <Link to="/noticias">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Regresar a la lista de noticias
                </Link>
              </Button>
              <h1 className="max-w-4xl text-3xl font-bold tracking-tighter text-white drop-shadow-md sm:text-4xl md:text-5xl">
                {article.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">{article.category}</span>
              </div>

              <div className="prose prose-slate max-w-none">
                {article.content.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Image Gallery */}
              {article.gallery && article.gallery.length > 0 && (
                <div className="mt-12">
                  <h2 className="mb-6 text-2xl font-bold">Image Gallery</h2>
                  {/* <ImageGallery images={article.gallery} /> */}
                </div>
              )}

              <div className="mt-12 flex items-center justify-between">
                <Button variant="outline" asChild>
                  <Link to="/noticias">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Regresar a la lista de noticias
                  </Link>
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    <span className="sr-only">Share on Facebook</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                    <span className="sr-only">Share on Twitter</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    <span className="sr-only">Copy Link</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-slate-50 py-12 md:py-16">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-6xl">
                <h2 className="mb-8 text-2xl font-bold tracking-tight">Related Articles</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedArticles.map((relatedArticle) => (
                    <Card key={relatedArticle.id} className="flex h-full flex-col">
                      <div className="relative h-48 w-full">
                        {/* <img
                          src={placeholder}
                          alt={relatedArticle.title}
                          className="object-cover"
                        /> */}
                      </div>
                      <CardHeader>
                        <CardTitle className="line-clamp-2">
                          <Link to={`/noticias/${relatedArticle.slug}`} className="hover:underline">
                            {relatedArticle.title}
                          </Link>
                        </CardTitle>
                        <CardDescription>{relatedArticle.date}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <p className="line-clamp-3 text-muted-foreground">{relatedArticle.excerpt}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </article>
    </PageLayout>
  )
}
