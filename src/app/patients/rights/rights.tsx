import { PageLayout } from "@/components"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export const rights = () => {
  return (
    <PageLayout>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Button variant="outline" size="sm" className="mb-8" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Regresa a la página principal
            </Link>
          </Button>

          <div className="mx-auto max-w-4xl space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Derechos y Responsabilidades del Paciente
              </h1>
              <p className="text-muted-foreground">
                Comprendiendo sus derechos y responsabilidades como paciente en el Hospital Civil de Guadalajara
              </p>
            </div>

            <Tabs defaultValue="rights" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="rights">
                  Derechos del Paciente
                </TabsTrigger>
                <TabsTrigger value="responsibilities">
                  Responsabilidades del Paciente
                </TabsTrigger>
              </TabsList>
              <TabsContent value="rights" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Tus Derechos como Paciente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium">Right to Respectful Care</h3>
                      <p className="text-muted-foreground">
                        You have the right to considerate, respectful care at all times and under all circumstances,
                        with recognition of your personal dignity and cultural, spiritual, and personal values.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">Right to Information</h3>
                      <p className="text-muted-foreground">
                        You have the right to receive complete, current information concerning your diagnosis,
                        treatment, and prognosis in terms you can reasonably be expected to understand.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">Right to Make Decisions</h3>
                      <p className="text-muted-foreground">
                        You have the right to participate in decisions regarding your healthcare and to make informed
                        decisions about your care, including the right to refuse treatment to the extent permitted by
                        law.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">Right to Privacy and Confidentiality</h3>
                      <p className="text-muted-foreground">
                        You have the right to privacy concerning your medical care. Case discussion, consultation,
                        examination, and treatment are confidential and should be conducted discreetly.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">Right to Access Your Medical Records</h3>
                      <p className="text-muted-foreground">
                        You have the right to review your medical records and to have the information explained or
                        interpreted as necessary, except when restricted by law.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">Right to Know Hospital Rules</h3>
                      <p className="text-muted-foreground">
                        You have the right to be informed of hospital rules and regulations applicable to your conduct
                        as a patient.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">Right to Express Grievances</h3>
                      <p className="text-muted-foreground">
                        You have the right to express grievances regarding any violation of your rights, through the
                        grievance procedure of the healthcare facility.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="responsibilities" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Responsabilidades del Paciente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium">Provide Information</h3>
                      <p className="text-muted-foreground">
                        You are responsible for providing, to the best of your knowledge, accurate and complete
                        information about your health, medications, and insurance.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">Follow Treatment Plan</h3>
                      <p className="text-muted-foreground">
                        You are responsible for following the treatment plan recommended by your healthcare provider
                        and for asking questions when you do not understand.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">Respect and Consideration</h3>
                      <p className="text-muted-foreground">
                        You are responsible for being considerate of the rights of other patients and hospital
                        personnel, and for assisting in the control of noise and the number of visitors.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">Financial Obligations</h3>
                      <p className="text-muted-foreground">
                        You are responsible for providing information necessary for insurance processing and for
                        working with the hospital to make payment arrangements when necessary.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">Hospital Rules and Regulations</h3>
                      <p className="text-muted-foreground">
                        You are responsible for following hospital rules and regulations affecting patient care and
                        conduct.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">Keep Appointments</h3>
                      <p className="text-muted-foreground">
                        You are responsible for keeping appointments and for notifying the hospital or clinic when you
                        are unable to do so.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

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
