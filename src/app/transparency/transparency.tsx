import { PageLayout } from "@/components"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Download, FileText } from "lucide-react"
import { Link } from "react-router-dom"

export const transparency = () => {
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

          <div className="mx-auto max-w-4xl space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Transparencia</h1>
              <p className="text-muted-foreground">
                Acceso a información pública sobre la gestión y operaciones del Hospital Civil de Guadalajara
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Reports</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span>Annual Financial Report 2023</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span>Annual Financial Report 2022</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span>Annual Financial Report 2021</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quality Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span>Patient Satisfaction Report</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span>Clinical Outcomes Report</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span>Safety Measures Report</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Service Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>North Campus</TableHead>
                      <TableHead>East Campus</TableHead>
                      <TableHead>West Campus</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Standard Office Visit</TableCell>
                      <TableCell>$150-$250</TableCell>
                      <TableCell>$150-$250</TableCell>
                      <TableCell>$150-$250</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Emergency Room Visit</TableCell>
                      <TableCell>$500-$3,000</TableCell>
                      <TableCell>$500-$3,000</TableCell>
                      <TableCell>N/A</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">MRI Scan</TableCell>
                      <TableCell>$1,200-$2,500</TableCell>
                      <TableCell>$1,200-$2,500</TableCell>
                      <TableCell>$1,200-$2,500</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">CT Scan</TableCell>
                      <TableCell>$800-$1,800</TableCell>
                      <TableCell>$800-$1,800</TableCell>
                      <TableCell>$800-$1,800</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Laboratory Tests</TableCell>
                      <TableCell>$50-$500</TableCell>
                      <TableCell>$50-$500</TableCell>
                      <TableCell>$50-$500</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <p className="mt-4 text-sm text-muted-foreground">
                  * Prices are estimates and may vary based on individual circumstances, insurance coverage, and
                  specific procedures. Please contact our billing department for more detailed information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Board of Directors</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Term</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Dr. Sarah Johnson</TableCell>
                      <TableCell>General Director, Board Chair</TableCell>
                      <TableCell>2020-Present</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Dr. Michael Chen</TableCell>
                      <TableCell>North Campus Director, Board Member</TableCell>
                      <TableCell>2018-Present</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Dr. Emily Rodriguez</TableCell>
                      <TableCell>East Campus Director, Board Member</TableCell>
                      <TableCell>2019-Present</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Dr. James Wilson</TableCell>
                      <TableCell>West Campus Director, Board Member</TableCell>
                      <TableCell>2020-Present</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Jennifer Thompson</TableCell>
                      <TableCell>Community Representative</TableCell>
                      <TableCell>2021-Present</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Robert Davis</TableCell>
                      <TableCell>Financial Officer</TableCell>
                      <TableCell>2019-Present</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

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
