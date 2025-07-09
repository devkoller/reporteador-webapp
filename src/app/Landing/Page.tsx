import {
  Carousel,
  CampusShowcase,
  Statistics,
  Leadership,
  NewsSection,
  EventsCalendar,
  PageLayout
} from "@/components/app"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export const Landing = () => {
  return (
    <PageLayout>

      {/* Hero Section with Announcement Carousel */}
      <section className="relative">
        <Carousel />
        {/* <div className="absolute inset-0 flex items-center justify-center">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <h1 className="text-3xl font-bold tracking-tighter text-white drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl">
                  Panacea Healthcare System
                </h1>
                <p className="max-w-[700px] text-white text-xl drop-shadow-md">
                  Providing exceptional healthcare across three campuses
                </p>
              </div>
            </div>
          </div> */}
      </section>

      {/* Blood Donation CTA */}
      <section className="bg-red-50 py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center sm:flex-row sm:space-x-4 sm:space-y-0">
            <p className="text-lg font-medium">Tu donación puede salvar vidas</p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              <Heart className="mr-2 h-4 w-4" />
              Dona sangre!
            </Button>
          </div>
        </div>
      </section>

      {/* Campus Showcase */}
      <section className="py-12 md:py-16 lg:py-20" id="campuses">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">Nuestros hospitales</h2>
          <CampusShowcase />
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-slate-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Haciendo la diferencia en la salud
          </h2>
          <Statistics />
        </div>
      </section>

      {/* Leadership */}
      <section className="py-12 md:py-16 lg:py-20" id="leadership">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">Nuestros directores</h2>
          <Leadership />
        </div>
      </section>

      {/* News Section */}
      <section className="bg-slate-50 py-12 md:py-16 lg:py-20" id="news">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">Ultimas noticias</h2>
          <NewsSection />
        </div>
      </section>

      {/* Events Calendar */}
      <section className="py-12 md:py-16 lg:py-20" id="events">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">Próximos eventos</h2>
          <EventsCalendar />
        </div>
      </section>

    </PageLayout>
  )
}
