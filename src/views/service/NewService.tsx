import { Layout } from "@/components/auth"

import { useEffect, useContext, } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useFetch, usePost } from "@/hooks"
import { UserConfigContext } from "@/context/UserConfigContext"
import { Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Loader2 } from "lucide-react"
import { FormInput, FormSelect } from "@/components/Form"

import { Button } from "@/components/ui/button"
import { Form, } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

// Define the form schema
const serviceFormSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre del servicio es requerido.",
  }),
  description: z.string().optional().nullable(),
  categoryID: z.string(),
  typeService: z.enum(["buying", "selling"], {
    required_error: "Please select a service type.",
  }),
})

// Define the form values type
type ServiceFormValues = z.infer<typeof serviceFormSchema>

// Default values for the form
const defaultValues: Partial<ServiceFormValues> = {
  name: "",
  description: "",
  categoryID: '',
  typeService: "selling",
}

// Service categories
const serviceCategories = [
  { value: 1, label: 'Consultoría' },
  { value: 2, label: 'Préstamo' },
  { value: 3, label: 'De personal' },
  { value: 4, label: 'Traslado' },
  { value: 5, label: 'De servicio' },
]

export const NewService = () => {
  const { toast } = useToast()
  const { id } = useParams()
  const { execute, loading: loadingExecute } = usePost()
  const { config, loading: loadingUserConfig } = useContext(UserConfigContext)
  const navigate = useNavigate()

  const { response: services, loading: loadingFetch } = useFetch({
    url: "/product/read/service/" + id,
    qs: {}
  })

  // Initialize the form
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues,
  })

  // Handle form submission
  async function onSubmit(data: ServiceFormValues) {

    let body = {
      ...data,
      enterpriseID: config?.enterprise?.id,
    }

    try {
      const response = await execute({
        url: "/product/create/service",
        body,
      })

      if (response) {
        toast({
          title: "Servicio creado",
          description: "El servicio ha sido creado exitosamente.",
        })
        navigate("/product/services")
      }

    } catch (error) {
      console.error("Error creating service:", error)
      toast({
        title: "Error",
        description: "Ha ocurrido un error al guardar el servicio.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    if (services) {
      form.reset({
        name: services?.data?.name || "",
        description: services?.data?.description || "",
        categoryID: services?.data?.categoryID || "",
        typeService: services?.data?.typeService || "selling",
      })
    }
  }, [services])

  if (loadingUserConfig || loadingFetch) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-4 mb-5">
          <Button variant="outline" size="icon" asChild>
            <Link to="/product/services">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Regresar</span>
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Agrega un nuevo servicio</h2>
            <p className="text-muted-foreground">
              Completa el formulario para crear un nuevo servicio en la empresa
            </p>
          </div>
        </div>
        <div className="">
          <Card>
            <CardHeader>
              <CardTitle>Información del servicio</CardTitle>
              <CardDescription>
                Ingresa la información necesaria para crear un nuevo servicio.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <FormInput
                    control={form.control}
                    name='name'
                    label='Nombre del servicio'
                    placeholder="Ingresa el nombre del servicio"
                    description="El nombre del servicio que estas ofreciendo o comprando"
                  />

                  <FormInput
                    control={form.control}
                    name='description'
                    label='Descripción'
                    type='textarea'
                    description="Descripción detallada de lo que incluye el servicio"
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormSelect
                      control={form.control}
                      name='categoryID'
                      label='Categoría'
                      option={serviceCategories}
                      description="Categoría a la que pertenece este servicio"
                    />

                    <FormSelect
                      control={form.control}
                      name='typeService'
                      label='Tipo del servicio'
                      option={[
                        { value: 'selling', label: 'Venta' },
                        { value: 'purchase', label: 'Compra' }
                      ]}
                      description="Selecciona si este es un servicio que compras o vendes"
                    />

                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link to="/product/services">Cancelar</Link>
                  </Button>
                  <Button type="submit" disabled={loadingExecute}>
                    {loadingExecute && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Guardar
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
