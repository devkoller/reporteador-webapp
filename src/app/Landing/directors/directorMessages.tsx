import { PageLayout } from "@/components"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import placeholder from "@/assets/images/placeholder.svg"

export const directorMessages = () => {
  return (
    <PageLayout>
      <section className="bg-slate-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Button variant="outline" size="sm" className="mb-8" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Regresar a la página principal
            </Link>
          </Button>

          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Mensaje de la directora</h1>
                <p className="text-muted-foreground">Mensaje de bienvenida de la directora</p>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Welcome to Panacea Healthcare System, where our commitment to excellence in healthcare is matched
                  only by our dedication to the communities we serve.
                </p>
                <p>
                  For over 25 years, I have had the privilege of working alongside some of the most talented and
                  compassionate healthcare professionals in the field. Together, we have built a healthcare system
                  that not only provides cutting-edge medical care but also fosters a healing environment where
                  patients and their families feel supported and respected.
                </p>
                <p>
                  Our three campuses—North, East, and West—each offer specialized services while maintaining our core
                  values of compassion, integrity, excellence, and innovation. Whether you're visiting us for routine
                  care, specialized treatment, or emergency services, you can expect the same level of dedication and
                  expertise from our entire team.
                </p>
                <p>
                  As we look to the future, we remain committed to advancing healthcare through research, education,
                  and community outreach. We are constantly exploring new technologies and approaches to improve
                  patient outcomes and enhance the healthcare experience.
                </p>
                <p>
                  Thank you for entrusting us with your health and the health of your loved ones. It is a
                  responsibility we take very seriously, and we are honored to be your healthcare provider of choice.
                </p>
                <p className="font-medium">
                  Deseando lo mejor para su salud y bienestar,
                  <br />
                  Dra. María Elena González González
                  <br />
                  Directora general de Hospital Civil de Guadalajara
                </p>
              </div>
              <div className="flex space-x-4">
                <Button asChild>
                  <Link to="/directors/elena-golzalez">Ver perfil completo</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[400px] w-[400px] overflow-hidden rounded-full">
                <img
                  src={placeholder}
                  alt="Dra. María Elena González González"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
