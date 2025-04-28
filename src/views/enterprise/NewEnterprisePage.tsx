import { Layout } from '@/components/auth'
import { Link, useNavigate, useParams } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Save } from "lucide-react"
import { FormInput } from "@/components/Form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useEffect } from "react"
import { Spinner } from "@/components/ui/spinner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import { usePost, useToast, useFetch } from "@/hooks"

const formSchema = z.object({
  descripcion: z.string().min(1, {
    message: "La descripción es requerida",
  }),
  rfc: z.string().min(1, {
    message: "El RFC es requerido",
  }),
  domicilioCalle: z.string().optional().nullable(),
  domicilioColonia: z.string().optional().nullable(),
  domicilioCiudad: z.string().optional().nullable(),
  domicilioEstado: z.string().optional().nullable(),
  domicilioPais: z.string().optional().nullable(),
  domicilioCP: z.preprocess((val) => {
    const numberVal = Number(val);
    return isNaN(numberVal) ? undefined : numberVal;
  }, z.number({ message: "El código postal debe ser un número", })).optional().nullable(),
  razonSocial: z.string().optional().nullable(),
  regimenFiscal: z.preprocess((val) => {
    const numberVal = Number(val);
    return isNaN(numberVal) ? undefined : numberVal;
  }, z.number({ message: "El régimen fiscal debe ser un número", })).optional().nullable(),
})

export const NewEnterprisePage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { toast } = useToast()
  const { execute, loading } = usePost()

  const { response: enterpriseData, loading: fetchLoading } = useFetch({
    url: id ? `/enterprise/read/${id}` : "",
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descripcion: "",
      rfc: "",
      domicilioCalle: "",
      domicilioColonia: "",
      domicilioCiudad: "",
      domicilioEstado: "",
      domicilioPais: "",
      domicilioCP: 0,
      razonSocial: "",
      regimenFiscal: 0,
    },
  })


  function onSubmit(values: z.infer<typeof formSchema>) {

    let url = id ? `/enterprise/update` : `/enterprise/create`
    let method = id ? 'put' : 'post'

    execute({
      url,
      method,
      body: {
        ...values,
        id: id,
      },
    }).then((res) => {
      if (res.status === 200) {
        res.data?.id ? navigate(`/enterprise/${res.data.id}`) : navigate('/enterprise/' + id)
        toast({
          title: "Correcto!",
          description: "Los datos de la empresa han sido guardados correctamente",
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
    if (enterpriseData) {
      let enterprise = enterpriseData.data

      let data: any = {}
      for (const key in enterprise) {
        if (enterprise[key]) {

          data[key] = enterprise[key]
        }
      }

      form.reset(data)

    }
  }, [enterpriseData])

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
                  <Link to={`/enterprise/${id ? id : ""}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Regresar
                  </Link>
                </Button>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>
                  Información de la empresa
                </CardTitle>
                <CardDescription>
                  Ingresa los detalles de la empresa.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormInput
                        label="Nombre de la empresa"
                        name="descripcion"
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
                        label="Calle y numero"
                        name="domicilioCalle"
                        control={form.control}
                      />
                      <FormInput
                        label="Colonia"
                        name="domicilioColonia"
                        control={form.control}
                      />
                      <FormInput
                        label="Ciudad"
                        name="domicilioCiudad"
                        control={form.control}
                      />
                      <FormInput
                        label="Estado"
                        name="domicilioEstado"
                        control={form.control}
                      />
                      <FormInput
                        label="País"
                        name="domicilioPais"
                        control={form.control}
                      />
                      <FormInput
                        label="Código Postal"
                        name="domicilioCP"
                        type='number'
                        control={form.control}
                      />
                      <FormInput
                        label="Razón social"
                        name="razonSocial"
                        control={form.control}
                      />
                      <FormInput
                        label="Régimen fiscal"
                        name="regimenFiscal"
                        type='number'
                        control={form.control}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          "Guardando..."
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            {id ? "Actualizar empresa" : "Agregar empresa"}
                          </>
                        )}
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
