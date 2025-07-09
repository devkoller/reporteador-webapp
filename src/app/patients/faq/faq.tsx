import { PageLayout } from "@/components"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export const faq = () => {
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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Preguntas Frecuentes
              </h1>
              <p className="text-muted-foreground">
                Aquí encontrarás respuestas a las preguntas más comunes que recibimos de nuestros pacientes y sus
                familias.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I schedule an appointment?</AccordionTrigger>
                <AccordionContent>
                  <p>You can schedule an appointment in several ways:</p>
                  <ul className="ml-6 mt-2 list-disc space-y-1">
                    <li>Call our central appointment line at (555) 123-4567</li>
                    <li>Use our online patient portal</li>
                    <li>Visit any of our campus reception desks in person</li>
                  </ul>
                  <p className="mt-2">
                    For specialist appointments, you may need a referral from your primary care physician.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What insurance plans do you accept?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Panacea Healthcare System accepts most major insurance plans, including Medicare and Medicaid. For
                    a complete list of accepted insurance providers, please contact our billing department at (555)
                    234-5678 or visit the insurance information section on our website.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What should I bring to my appointment?</AccordionTrigger>
                <AccordionContent>
                  <p>Please bring the following items to your appointment:</p>
                  <ul className="ml-6 mt-2 list-disc space-y-1">
                    <li>Photo ID</li>
                    <li>Insurance card</li>
                    <li>List of current medications</li>
                    <li>Medical records or test results (if applicable)</li>
                    <li>Referral form (if required)</li>
                    <li>Payment method for copays or deductibles</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>What are your visiting hours?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    General visiting hours at all campuses are from 9:00 AM to 8:00 PM daily. Specialized units such
                    as ICU, NICU, and Maternity may have different visiting policies. Please check with the specific
                    department or call ahead to confirm visiting hours for these areas.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>How can I access my medical records?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    You can access your medical records through our secure patient portal. If you need assistance or
                    prefer a physical copy, you can submit a request to our Medical Records Department. Please note
                    that there may be a processing fee for printed records. For more information, contact Medical
                    Records at (555) 345-6789.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>Do you offer telehealth services?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Yes, Panacea Healthcare System offers telehealth services for many types of appointments. Virtual
                    visits are available for primary care, follow-up appointments, and certain specialist
                    consultations. To schedule a telehealth appointment, please call our appointment line or request
                    one through the patient portal.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>What emergency services are available?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Our North and East Campuses provide 24/7 emergency services with fully equipped emergency
                    departments. The North Campus houses a Level I Trauma Center capable of handling the most critical
                    emergencies. The West Campus does not have an emergency department but offers urgent care services
                    during regular business hours.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>How do I pay my bill?</AccordionTrigger>
                <AccordionContent>
                  <p>You can pay your bill in several ways:</p>
                  <ul className="ml-6 mt-2 list-disc space-y-1">
                    <li>Online through our patient portal</li>
                    <li>By phone at (555) 456-7890</li>
                    <li>By mail to our billing address</li>
                    <li>In person at any campus cashier's office</li>
                  </ul>
                  <p className="mt-2">
                    If you're experiencing financial hardship, please contact our financial counselors to discuss
                    payment plans or financial assistance options.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
              <h2 className="text-xl font-semibold">Necesitas mas información</h2>
              <p className="mt-2 text-muted-foreground">
                Nuestro equipo de servicios al paciente está disponible para ayudarlo con cualquier pregunta o inquietud.
              </p>
              <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button>
                  Contactar
                </Button>
                <Button variant="outline">
                  Ver la guía del paciente
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
