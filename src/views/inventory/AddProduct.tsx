import { Layout } from "@/components/auth";

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
  nombre: z.string().min(1, {
    message: "El nombre del servicio es requerido.",
  }),
  descrip: z.string().optional().nullable(),
  marca: z.string().optional().nullable(),
  categoryID: z.string(),
})

// Define the form values type
type ServiceFormValues = z.infer<typeof serviceFormSchema>

// Default values for the form
const defaultValues: Partial<ServiceFormValues> = {
  nombre: "",
  descrip: "",
  categoryID: '',
  marca: '',
}

// Product categories of medical supplies
const productCategories = [
  { value: 1, label: 'Medicamento' },
  { value: 2, label: 'Material' },
  { value: 3, label: 'Equipo' },
  { value: 4, label: 'Instrumento' },
  { value: 5, label: 'Otros' },
]

export const AddProduct = () => {
  const { toast } = useToast()
  const { id } = useParams()
  const { execute, loading: loadingExecute } = usePost()
  const { config, loading: loadingUserConfig } = useContext(UserConfigContext)
  const navigate = useNavigate()

  const { response: product, loading: loadingFetch } = useFetch({
    url: "/product/read/product/" + id,
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
      id: id,
    }

    let url = id ? "/product/update/product" : "/product/create/product"
    let method = id ? "put" : "post"

    try {
      const response = await execute({
        url,
        method,
        body,
      })

      if (response.status === 200) {
        toast({
          title: "Producto creado",
          description: "El producto ha sido creado exitosamente.",
        })
        navigate("/inventory")
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al guardar el producto.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    if (product) {
      form.reset({
        nombre: product?.data?.nombre || "",
        descrip: product?.data?.descrip || "",
        categoryID: product?.data?.categoryID || "",
        marca: product?.data?.marca || "",
      })
    }
  }, [product])

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
            <Link to="/inventory">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Regresar</span>
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Agrega o edita un producto</h2>
            <p className="text-muted-foreground">
              Completa el formulario para crear o editar un nuevo producto en la empresa
            </p>
          </div>
        </div>
        <div className="">
          <Card>
            <CardHeader>
              <CardTitle>Información del producto</CardTitle>
              <CardDescription>
                Ingresa la información necesaria para crear o editar un nuevo producto.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <FormInput
                    control={form.control}
                    name='nombre'
                    label='Nombre del producto'
                    placeholder="Ingresa el nombre del producto"
                    description="El nombre del producto que estas ofreciendo o comprando"
                  />
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormSelect
                      control={form.control}
                      name='categoryID'
                      label='Categoría'
                      option={productCategories}
                      description="Categoría a la que pertenece este producto"
                    />


                    <FormInput
                      control={form.control}
                      name='marca'
                      label='Marca'
                      placeholder="Ingresa la marca del producto"
                    />
                  </div>


                  <FormInput
                    control={form.control}
                    name='descrip'
                    label='Descripción'
                    type='textarea'
                    description="Descripción detallada de lo que incluye el producto"
                  />


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
