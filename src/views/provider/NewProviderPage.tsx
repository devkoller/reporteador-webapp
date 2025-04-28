import { Layout } from "@/components/auth"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormInput } from "@/components/Form"
import { usePost, useFetch } from "@/hooks"
import { useToast } from "@/hooks/use-toast"
import { Spinner } from "@/components/ui/spinner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

const formSchema = z.object({
  nombre: z
    .string({
      message: "El nombre es requerido",
    })
    .max(120, {
      message: "El nombre debe tener máximo 120 caracteres",
    }),
  rfc: z
    .string({
      message: "El RFC es requerido",
    })
    .max(14, {
      message: "El RFC debe tener máximo 14 caracteres",
    }),
  direccionCP: z
    .string()
    .max(5, {
      message: "El CP debe tener máximo 5 caracteres",
    })
    .optional(),
  direccionCalle: z
    .string()
    .max(60, {
      message: "La calle debe tener máximo 50 caracteres",
    })
    .optional(),
  direccionCiudad: z
    .string()
    .max(45, {
      message: "La ciudad debe tener máximo 45 caracteres",
    })
    .optional(),
  direccionPais: z
    .string()
    .max(45, {
      message: "El país debe tener máximo 45 caracteres",
    })
    .optional(),
  razonSocial: z
    .string()
    .max(45, {
      message: "La razón social debe tener máximo 45 caracteres",
    })
    .optional(),
  regimenFiscal: z
    .string()
    .max(3, {
      message: "El régimen fiscal debe tener máximo 3 caracteres",
    })
    .optional(),
  representanteLegal: z
    .string()
    .max(120, {
      message: "El representante legal debe tener máximo 120 caracteres",
    })
    .nullable()
    .optional(),
  telefono: z
    .string()
    .max(25, {
      message: "El teléfono debe tener máximo 25 caracteres",
    })
    .nullable()
    .optional(),
  email: z
    .string()
    .email("El correo electrónico no es válido")
    .max(50, {})
    .optional()
    .nullable(),
})


export const NewProviderPage = () => {
  const { id } = useParams()
  const { execute, loading } = usePost()
  const { toast } = useToast()
  const navigate = useNavigate()


  const { response: proveedorData, loading: fetchLoading } = useFetch({
    url: id ? `/provider/read/${id}` : "",
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      rfc: "",
      direccionCP: "",
      direccionCalle: "",
      direccionCiudad: "",
      direccionPais: "",
      razonSocial: "",
      regimenFiscal: "",
      representanteLegal: "",
      telefono: "",
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const url = id ? `/provider/update` : '/provider/create'

    let method = id ? "put" : "post"

    execute({
      url,
      method,
      body: {
        ...values,
        id: id,
      },
    }).then((res) => {
      if (res.status === 200) {
        res?.data?.id ? navigate(`/provider/${res.data.id}`) : navigate('/provider/' + id)
        toast({
          title: "Cliente guardado",
          description: "El cliente ha sido guardado correctamente",
        })
      } else {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        })
      }
    })
  }

  useEffect(() => {
    if (proveedorData) {
      form.reset({
        nombre: proveedorData.data.nombre,
        rfc: proveedorData.data.rfc,
        direccionCP: proveedorData.data.direccionCP,
        direccionCalle: proveedorData.data.direccionCalle,
        direccionCiudad: proveedorData.data.direccionCiudad,
        direccionPais: proveedorData.data.direccionPais,
        razonSocial: proveedorData.data.razonSocial,
        regimenFiscal: proveedorData.data.regimenFiscal,
        representanteLegal: proveedorData.data.representanteLegal,
        telefono: proveedorData.data.telefono,
        email: proveedorData.data.email,
      })
    }
  }, [proveedorData])

  if (fetchLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="">
        <div className="flex flex-col">
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                {id ? "Editar empresa" : "Agregar nueva empresa"}
              </h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" asChild>
                  <Link to={`/provider/${id ? id : ""}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Regresar
                  </Link>
                </Button>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>
                  Información del proveedor
                </CardTitle>
                <CardDescription>
                  Ingresa los detalles del proveedor.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormInput
                        label="Nombre del proveedor"
                        name="nombre"
                        control={form.control}
                        required
                      />
                      <FormInput
                        label="RFC"
                        name="rfc"
                        control={form.control}
                        required
                      />
                      <FormInput
                        label="Código postal"
                        name="direccionCP"
                        control={form.control}
                      />
                      <FormInput
                        label="Dirección"
                        name="direccionCalle"
                        control={form.control}
                      />
                      <FormInput
                        label="Cuidad"
                        name="direccionCiudad"
                        control={form.control}
                      />
                      <FormInput
                        label="País"
                        name="direccionPais"
                        control={form.control}
                      />
                      <FormInput
                        label="Razón social"
                        name="razonSocial"
                        control={form.control}
                      />
                      <FormInput
                        label="Regimen fiscal"
                        name="regimenFiscal"
                        control={form.control}
                      />
                      <FormInput
                        label="Representante legal"
                        name="representanteLegal"
                        control={form.control}
                      />
                      <FormInput
                        label="Correo"
                        name="email"
                        control={form.control}
                      />
                      <FormInput
                        label="Teléfono"
                        name="telefono"
                        control={form.control}
                      />
                    </div>
                    <div className="flex justify-end">

                      <Button type="submit" disabled={loading}>
                        Guardar
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
