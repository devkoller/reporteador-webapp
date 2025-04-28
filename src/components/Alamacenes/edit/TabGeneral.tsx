import { AlmacenType } from "@/types"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormInput, FormCombobox } from '@/components/Form'
import { usePost } from "@/hooks"
import { useToast } from "@/hooks/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Save } from "lucide-react"


const formSchema = z.object({
  nombre: z.string().min(1, {

    message: "El nombre es requerido",
  }).max(200, {
    message: "El nombre debe tener máximo 200 caracteres",
  }),
  descrip: z.string().optional(),
  status: z.number(),
  location: z.string().optional(),
  address: z.string().optional(),
})

type TabGeneralProps = {
  warehouse: AlmacenType
}

export const TabGeneral = ({ warehouse }: TabGeneralProps) => {
  const { execute, loading } = usePost()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: warehouse.nombre || "",
      descrip: warehouse.descrip || "",
      status: warehouse.status || 0,
      location: warehouse.location || "",
      address: warehouse.address || "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {

    execute({
      url: `/api/catalogue/warehouse/${warehouse.id}`,
      method: 'put',
      body: {
        ...values,
        id: warehouse.id,
      },
    }).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Almacén guardado",
          description: "El almacén ha sido guardado correctamente",
        })
      }
    })
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Información del almacén
        </CardTitle>
        <CardDescription>
          Información basica sobre esta instalación de almacén
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Nombre del almacén"
                name="nombre"
                control={form.control}
                required
              />
              <FormInput
                label="Ubicación (Ciudad, Estado)"
                name="location"
                control={form.control}
                required
              />

            </div>

            <FormInput
              label="Dirección completa"
              name="address"
              control={form.control}
              required
            />

            <FormInput
              label="Descripción"
              name="descrip"
              type="textarea"
              control={form.control}
            />

            <FormCombobox
              label="Estado"
              name="status"
              control={form.control}
              required
              option={[
                { value: 1, label: "Activo" },
                { value: 2, label: "Inactivo" },
                { value: 3, label: "En mantenimiento" },
              ]}
              setValue={form.setValue}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                Guardar
                <Save className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>



      </CardContent>
    </Card>
  )
}
