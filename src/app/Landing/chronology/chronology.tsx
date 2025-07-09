import { PageLayout } from '@/components'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export const chronology = () => {
  return (
    <PageLayout>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Button variant="outline" size="sm" className="mb-8" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Regresar a la página principal
            </Link>
          </Button>

          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nuestra historia</h1>
              <p className="text-muted-foreground">
                La cronología del Hospital Civil de Guadalajara es un testimonio de nuestro compromiso con la atención médica
              </p>
            </div>

            <div className="relative space-y-8 before:absolute before:inset-0 before:left-1/2 before:ml-[-1px] before:border-l before:border-border">
              <TimelineItem year="1975" title="The Beginning">
                <p>
                  Panacea Healthcare was founded with the opening of our first clinic, which would later become the
                  North Campus. Dr. Robert Williams, our founding director, established the clinic with a vision of
                  providing accessible, high-quality healthcare to the community.
                </p>
              </TimelineItem>

              <TimelineItem year="1985" title="Expansion to East Campus">
                <p>
                  With growing demand for specialized care, Panacea expanded by opening the East Campus, dedicated to
                  women's health and pediatrics. This marked the beginning of our multi-campus healthcare system.
                </p>
              </TimelineItem>

              <TimelineItem year="1992" title="West Campus Opens">
                <p>
                  The West Campus was established, focusing on orthopedics and rehabilitation services. With three
                  specialized campuses, Panacea Healthcare System was now able to offer comprehensive care across
                  multiple disciplines.
                </p>
              </TimelineItem>

              <TimelineItem year="1998" title="Research Center Established">
                <p>
                  The Panacea Research Center was founded at the North Campus, dedicated to advancing medical
                  knowledge and developing innovative treatments. This marked our commitment to not only providing
                  care but also contributing to the future of medicine.
                </p>
              </TimelineItem>

              <TimelineItem year="2005" title="Major Renovation and Modernization">
                <p>
                  All three campuses underwent significant renovations and technological upgrades, ensuring that our
                  facilities remained at the cutting edge of healthcare delivery.
                </p>
              </TimelineItem>

              <TimelineItem year="2010" title="Leadership Transition">
                <p>
                  Dr. Sarah Johnson was appointed as General Director, bringing a new vision for integrated care and
                  patient experience across all campuses.
                </p>
              </TimelineItem>

              <TimelineItem year="2015" title="Digital Transformation">
                <p>
                  Panacea implemented a comprehensive electronic health record system, connecting all three campuses
                  and enabling seamless coordination of care for patients across our healthcare system.
                </p>
              </TimelineItem>

              <TimelineItem year="2020" title="Pandemic Response">
                <p>
                  During the global health crisis, Panacea Healthcare System played a crucial role in the community
                  response, adapting quickly to provide testing, treatment, and later, vaccination services.
                </p>
              </TimelineItem>

              <TimelineItem year="2023" title="Looking to the Future">
                <p>
                  Today, Panacea Healthcare System continues to grow and evolve, with plans for a new specialized
                  cancer treatment center and expanded telemedicine services to reach more patients in need.
                </p>
              </TimelineItem>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

function TimelineItem({
  year,
  title,
  children,
}: {
  year: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="relative pl-8 md:pl-12">
      <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground md:left-[-16px]">
        {year.substring(2)}
      </div>
      <Card>
        <CardHeader className="pb-2">
          <div className="text-sm font-medium text-muted-foreground">{year}</div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  )
}
