import { Layout, } from '@/components/auth'
import { useState, useEffect } from "react"
import { useFetch } from '@/hooks'
import { Link, useParams } from "react-router-dom"
import { ContractType } from '@/types'
import { format } from 'date-fns'
import { Spinner } from '@/components/ui/spinner'
import {
  ArrowLeft,
  Calendar,
  Edit,
  FileText,
  Banknote,
  Clock,
  ArrowUpCircle,
  ArrowDownCircle,
  // LinkIcon,
} from "lucide-react"
import { Documents, Contacts } from "@/components/contracts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

const contractData = {
  id: "C-2023-001",
  title: "Annual Supply Agreement",
  enterprise: {
    id: 1,
    name: "Global Enterprises Inc.",
    contactName: "John Smith",
    email: "john@globalsupplies.com",
    phone: "+1 (555) 123-4567",
  },
  startDate: "2023-01-15",
  endDate: "2024-01-14",
  status: "active",
  type: "purchase",
  value: 125000,
  description:
    "Annual agreement for the supply of electronic components and accessories. This contract outlines the terms, conditions, pricing, and delivery schedules for all purchases made under this agreement.",
  terms: "Net 30 payment terms. Deliveries to be made within 7 business days of order confirmation.",
  renewalOption: true,
  autoRenewal: false,
  documents: [
    { id: 1, name: "Contract Agreement.pdf", type: "pdf", size: "1.2 MB", date: "2023-01-10" },
    { id: 2, name: "Pricing Schedule.xlsx", type: "xlsx", size: "458 KB", date: "2023-01-10" },
    { id: 3, name: "Statement of Work.docx", type: "docx", size: "825 KB", date: "2023-01-12" },
  ],
  contacts: [
    {
      id: 1,
      name: "John Smith",
      position: "Purchasing Manager",
      email: "john@globalsupplies.com",
      phone: "+1 (555) 123-4567",
      primary: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Account Manager",
      email: "sarah@globalsupplies.com",
      phone: "+1 (555) 765-4321",
      primary: false,
    },
  ],
  purchaseOrders: [
    {
      id: "PO-2023-101",
      date: "2023-02-15",
      status: "received",
      items: 8,
      total: "$12,500.00",
    },
    {
      id: "PO-2023-108",
      date: "2023-03-22",
      status: "received",
      items: 5,
      total: "$8,750.00",
    },
    {
      id: "PO-2023-115",
      date: "2023-04-18",
      status: "shipped",
      items: 10,
      total: "$15,200.00",
    },
    {
      id: "PO-2023-124",
      date: "2023-05-10",
      status: "processing",
      items: 6,
      total: "$9,800.00",
    },
  ],
  salesOrders: [],
  timeline: [
    {
      date: "2022-12-05",
      event: "Negociaciones Iniciales",
      description: "Inician las discusiones de los términos.",
    },
    { date: "2022-12-20", event: "Borrador del contrato enviado", description: "Se envía el primer borrador del contrato" },
    { date: "2023-01-10", event: "Contrato finalizado", description: "Todos los términos fueron agregados." },
    { date: "2023-01-15", event: "Contrato firmado", description: "El contrato fue firmado por todas las partes" },
    { date: "2023-01-16", event: "Contrato activo", description: "El contrato ahora esta activo." },
  ],
}

interface StateTypeof {
  contract: ContractType | null
  daysRemaining: number | boolean
}

export const ContractDetails = () => {
  const params = useParams()
  const [Data, setData] = useState<StateTypeof>({
    contract: null,
    daysRemaining: 0,
  })

  const { response: contractD, loading: loadingContract } = useFetch({
    url: `/contract/read/${params.id}`,
  })

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Calculate days remaining
  const calculateDaysRemaining = (endDateFormat: string) => {

    if (endDateFormat === '0000-00-00') return false;

    const endDate = new Date(Data.contract?.endDate || "")
    const today = new Date()
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }


  useEffect(() => {
    if (contractD) {
      setData(prev => ({
        ...prev,
        contract: contractD.data,
        daysRemaining: calculateDaysRemaining(contractD.data?.endDate)
      }))
    }
  }, [contractD])

  if (loadingContract) {
    return (
      <Layout>
        <div className="flex flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Detalles del contrato</h2>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Detalles del contrato</CardTitle>
                <CardDescription>
                  Cargando...
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Spinner />
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" asChild>
                <Link to="/contract">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Regresar</span>
                </Link>
              </Button>
              <h2 className="text-3xl font-bold tracking-tight">{Data.contract?.name}</h2>
              <Badge
                variant={
                  Data.contract?.estatus === "active"
                    ? "default"
                    : Data.contract?.estatus === "completed"
                      ? "secondary"
                      : "destructive"
                }
                className="capitalize"
              >
                {
                  Data.contract?.estatus === "active"
                    ? "Activo"
                    : Data.contract?.estatus === "completed"
                      ? "Completado"
                      : "Cancelado"
                }
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" >
                <FileText className="mr-2 h-4 w-4" />
                Ver PDF
              </Button>
              <Button asChild>
                <Link to={`/contract/edit/${params.id}`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar contrato
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ID del contrato</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">C-{Data.contract?.createdAt ? format(Data.contract.createdAt, 'yyyy') : ''}-{Data.contract?.id}</div>
              </CardContent>
            </Card>


            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Valor</CardTitle>
                <Banknote className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(Data.contract?.value || 0)}</div>
                <p className="text-xs text-muted-foreground">Valor total del contrato</p>
              </CardContent>
            </Card>
            {Data.daysRemaining !== false ? (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tiempo restante</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Data.daysRemaining} Dias</div>
                  <p className="text-xs text-muted-foreground">Hasta el vencimiento</p>
                </CardContent>
              </Card>

            ) : (<Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contrato</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Abierto</div>
              </CardContent>
            </Card>)}
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="orders">Ordenes asociadas</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
              <TabsTrigger value="contacts">Contactos</TabsTrigger>
              <TabsTrigger value="timeline">Linea del tiempo</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Detalles del contrato</CardTitle>
                  <CardDescription>
                    Resumen de los términos y condiciones del contrato
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Periodo del contrato</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Fecha de inicio</div>
                          <div>{Data.contract?.startDate}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Fecha de vencimiento</div>
                          <div>{Data.daysRemaining !== false ? Data.contract?.endDate : 'Abierto'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Descripción del contrato</h4>
                    <p className="text-sm">{Data.contract?.description}</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Términos y condiciones</h4>
                    <p className="text-sm">{Data.contract?.terms}</p>
                  </div>
                  <Separator />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle>Ordenes asociadas</CardTitle>
                    <CardDescription>
                      Todas las ordenes asociadas a este contrato
                    </CardDescription>
                  </div>
                  {/* <Button variant="outline" asChild>
                    <Link to={`/contract/${params.id}/orders`}>
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Administrar ordenes asociadas
                    </Link>
                  </Button> */}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="mb-2 text-md font-medium flex items-center">
                      <ArrowDownCircle className="mr-2 h-4 w-4" /> Ordenes de compra
                    </h4>
                    <p className="text-sm text-muted-foreground">No hay ordenes de compra en el contrato</p>
                  </div>

                  <div>
                    <h4 className="mb-2 text-md font-medium flex items-center">
                      <ArrowUpCircle className="mr-2 h-4 w-4" /> Ordenes de venta
                    </h4>
                    <p className="text-sm text-muted-foreground">No hay ordenes de venta en el contrato</p>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" asChild>
                      <Link to="/order/purchase/new">
                        <ArrowDownCircle className="mr-2 h-4 w-4" />
                        Crear orden de compra
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link to="/order/selling/new">
                        <ArrowUpCircle className="mr-2 h-4 w-4" />
                        Crear orden de venta
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>


            <Documents contractID={params.id} />
            <Contacts contractID={params.id} />


            <TabsContent value="timeline" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Linea del tiempo del contrato</CardTitle>
                  <CardDescription>
                    Eventos importantes en la vida del contrato
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative space-y-4">
                    {contractData.timeline.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="relative flex h-full w-6 items-center justify-center">
                          <div className="absolute h-full w-px bg-muted" />
                          <div
                            className={`relative z-10 h-2 w-2 rounded-full ${index === 0 ? "bg-primary" : "bg-muted-foreground"
                              }`}
                          />
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="text-sm font-medium">{event.event}</div>
                          <div className="text-xs text-muted-foreground">{event.date}</div>
                          <div className="mt-1 text-sm">{event.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  )
}
