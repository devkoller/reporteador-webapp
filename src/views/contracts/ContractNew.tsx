import { useState, useContext, useEffect } from "react"
import { Layout, } from '@/components/auth'
import { Link, useNavigate, useParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { UserConfigContext } from '@/context/UserConfigContext';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Save, Plus, FileText, Upload } from "lucide-react"
import { Spinner } from '@/components/ui/spinner';
import { Button } from "@/components/ui/button"
import { Form, } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { FormInput, FormSelect } from '@/components/Form'
import { useToast, usePost, useFetch } from '@/hooks'
import { Trash2 } from "lucide-react"

const contractTypes = [
  { value: 1, label: "Compra" },
  { value: 2, label: "Venta" },
  { value: 3, label: "Servicio" },
  { value: 4, label: "Alquiler" },
  { value: 5, label: "Asociación" },
]


const contractFormSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre del contrato es requerido.",
  }),
  clientID: z.string({
    required_error: "Selecciona un cliente.",
  }),
  startDate: z.string({
    required_error: "Selecciona una fecha de inicio.",
  }),
  endDate: z.string().optional(),
  typeContract: z.string({
    required_error: "Selecciona un tipo de contrato.",
  }),
  value: z.coerce
    .number({
      required_error: "Ingresa el valor del contrato.",
    })
    .min(0, {
      message: "El valor debe ser un numero positivo.",
    }),
  description: z.string().optional().nullable(),
  terms: z.string().optional().nullable(),
  contacts: z.array(
    z.object({
      name: z.string().min(1, {
        message: "El nombre es requerido.",
      }),
      position: z.string().optional(),
      email: z.string().email("Email no válido").optional(),
      phone: z.string().optional(),
      isPrimaryContact: z.boolean(),
    })
  ).min(1, {
    message: "Agrega al menos un contacto.",
  }),
})

type ContractFormValues = z.infer<typeof contractFormSchema>

export const ContractNew = () => {
  const { config } = useContext(UserConfigContext)
  const { toast } = useToast()
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const { execute, loading: isSubmitting } = usePost()
  const [clients, setClients] = useState([])


  const { response: clientsData, loading: loadingProducts } = useFetch({
    url: "/data/read/clients",
    qs: {
      enterpriseID: config?.enterprise?.id,
    },
  })

  const defaultValues: Partial<ContractFormValues> = {
    name: "",
    startDate: new Date().toISOString().split("T")[0],
    clientID: "",
    endDate: "",
    typeContract: "",
    value: 0,
    description: "",
    terms: "",
    contacts: [
      {
        name: "",
        position: "",
        email: "",
        phone: "",
        isPrimaryContact: true,
      },
    ],
  }

  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues,
  })

  function onSubmit(values: ContractFormValues) {
    const formData = new FormData()

    formData.append("name", values.name)
    formData.append("clientID", values.clientID)
    formData.append("startDate", values.startDate.toString())
    formData.append("endDate", values.endDate || "")
    formData.append("typeContract", values.typeContract)
    formData.append("value", values.value.toString())
    formData.append("description", values.description || "")
    formData.append("terms", values.terms || "")
    formData.append("contacts", JSON.stringify(values.contacts))
    formData.append("enterpriseID", config?.enterprise?.id?.toString() || "")
    formData.append("files", JSON.stringify(selectedFiles))

    selectedFiles.forEach((file) => {
      formData.append("documents", file)
    })

    execute({
      url: id ? `/contract/update/${id}` : "/contract/create",
      method: id ? "PUT" : "post",
      hasFiles: true,
      body: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: "Éxito",
            description: "El contrato ha sido creado exitosamente.",
          })
          navigate("/contract/" + res.data.id)
        } else {
          toast({
            title: "Error",
            description: res.message,
            variant: "destructive",
          })
        }
      })
      .catch((error) => {
        console.log("🚀 > ContractNew.tsx:95 > onSubmit > error:", error);
        toast({
          title: "Error",
          description: "Ocurrió un error al crear el contrato.",
          variant: "destructive",
        })
      })

  }

  const onError = (error: any) => {
    console.log("🚀 > ContractNew.tsx:98 > onError > error:", error);
    toast({
      title: "Error",
      description: "Ocurrió un error al crear el contrato.",
      variant: "destructive",
    })
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles])
    }
  }

  function removeFile(index: number) {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }


  useEffect(() => {
    if (clientsData) {
      setClients(clientsData.data)
    }
  }, [clientsData])

  if (loadingProducts) {
    return (
      <Layout>
        <div className="flex flex-col">
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Crear contrato</h2>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Clientes</CardTitle>
                <CardDescription>
                  Cargando clientes...
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
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              {id ? "Editar contrato" : "Crear nuevo contrato"}
            </h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link to="/contract">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Regresar
                </Link>
              </Button>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Información del contrato</CardTitle>
                    <CardDescription>
                      Ingresa los detalles básicos de este contrato.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">

                    <FormInput
                      control={form.control}
                      name="name"
                      label="Nombre del contrato"
                      placeholder="Ingresa el nombre del contrato"
                    />

                    <FormSelect
                      control={form.control}
                      name="clientID"
                      label="Cliente"
                      placeholder="Selecciona un cliente"
                      option={clients}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormInput
                        control={form.control}
                        name="startDate"
                        label="Fecha de inicio del contrato"
                        type="date"
                      />
                      <FormInput
                        control={form.control}
                        name="endDate"
                        label="Fecha de vencimiento"
                        type="date"
                      />
                    </div>

                    <FormSelect
                      control={form.control}
                      name="typeContract"
                      label="Tipo de contrato"
                      placeholder="Selecciona tipo de contrato"
                      option={contractTypes}
                    />


                    <FormInput
                      control={form.control}
                      name="value"
                      label="Valor del contrato"
                      placeholder="Ingresa el valor del contrato"
                    />

                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Términos y condiciones</CardTitle>
                    <CardDescription>
                      Especifica los términos y condiciones para este contrato.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormInput
                      control={form.control}
                      name="description"
                      label="Descripción del contrato"
                      placeholder="Ingresa una descripción del contrato"
                      type='textarea'
                    />
                    <FormInput
                      control={form.control}
                      name="terms"
                      label="Términos y condiciones"
                      placeholder="Ingresa los términos y condiciones"
                      type='textarea'
                    />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Documentos del contrato</CardTitle>
                  <CardDescription>Cargar documentos relacionados al contrato</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="documents">Carga documentos</Label>
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/30"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">Click para cargar documentos</span> o arrastra y suelta
                            </p>
                            <p className="text-xs text-muted-foreground">PDF, DOCX, XLSX (MAX. 10MB)</p>
                          </div>
                          <input id="dropzone-file" type="file" className="hidden" multiple onChange={handleFileChange} />
                        </label>
                      </div>
                    </div>

                    {selectedFiles.length > 0 && (
                      <div className="border rounded-md p-4">
                        <h4 className="text-sm font-medium mb-2">Selecciona los archivos</h4>
                        <ul className="space-y-2">
                          {selectedFiles.map((file, index) => (
                            <li key={index} className="flex items-center justify-between text-sm p-2 bg-muted/20 rounded">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{file.name}</span>
                                <span className="ml-2 text-xs text-muted-foreground">
                                  ({(file.size / 1024).toFixed(1)} KB)
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="h-8 w-8 p-0 text-red-500"
                              >
                                <span className="sr-only">Eliminar</span>
                                &times;
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contactos</CardTitle>
                  <CardDescription>
                    Agrega los contactos relacionados a este contrato.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      {form.watch("contacts").map((contact, index) => (
                        <div key={index} className="rounded-md border p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-medium">
                              {contact.isPrimaryContact ? "Contacto principal" : `Contacto ${index + 1}`}
                            </h4>
                            <div className="flex items-center gap-2">
                              {contact.isPrimaryContact ? (
                                <Badge variant="outline">Principal</Badge>
                              ) : (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const currentContacts = form.getValues("contacts")
                                    form.setValue(
                                      "contacts",
                                      currentContacts.map((c, i) => ({
                                        ...c,
                                        isPrimaryContact: i === index,
                                      }))
                                    )

                                  }}
                                >
                                  Hacer principal
                                </Button>
                              )}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-500"
                                onClick={() => {
                                  const currentContacts = form.getValues("contacts")
                                  if (currentContacts.length > 1) {
                                    form.setValue(
                                      "contacts",
                                      currentContacts.filter((_, i) => i !== index)
                                    )
                                  } else {
                                    toast({
                                      title: "No puedes eliminar todos los contactos.",
                                      description: "Debes tener al menos un contacto.",
                                      variant: "destructive",
                                    })
                                  }
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                              <FormInput
                                control={form.control}
                                name={`contacts.${index}.name`}
                                label="Nombre del contrato"
                                placeholder="Ingresa el nombre del contrato"
                              />
                              <FormInput
                                control={form.control}
                                name={`contacts.${index}.position`}
                                label="Posición"
                                placeholder="Ingresa la posición del contacto"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <FormInput
                                control={form.control}
                                name={`contacts.${index}.phone`}
                                label="Teléfono"
                                placeholder="Ingresa el teléfono del contacto"
                              />
                              <FormInput
                                control={form.control}
                                name={`contacts.${index}.email`}
                                label="Correo electrónico"
                                placeholder="Ingresa el correo del contacto"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button type="button" variant="outline" className="w-full" onClick={() => {
                      form.setValue("contacts", [
                        ...form.getValues("contacts"),
                        {
                          name: "",
                          position: "",
                          email: "",
                          phone: "",
                          isPrimaryContact: false,
                        },
                      ])
                    }}>
                      <Plus className="mr-2 h-4 w-4" />
                      Agregar otro contacto
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Creating Contract..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Crear contrato
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  )
}
