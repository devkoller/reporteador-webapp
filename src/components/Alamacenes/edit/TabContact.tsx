import { WarehouseContactType } from "@/types"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormInput } from '@/components/Form'
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
  manager: z.string().min(1, {
    message: "El nombre del contacto es requerido",
  }),
  number_contact: z.string().min(1, {
    message: "El número de contacto es requerido",
  }).optional().nullable(),
  email_contact: z.string().email({
    message: "El correo electrónico no es válido",
  }).optional().nullable(),
  operation_hours: z.string().optional().nullable(),
})

type TabContactProps = {
  warehouseContact?: WarehouseContactType | null
  id_warehouse?: number
}

export const TabContact = ({ warehouseContact, id_warehouse }: TabContactProps) => {

  const { execute, loading } = usePost()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      manager: warehouseContact?.manager || "",
      number_contact: warehouseContact?.number_contact || "",
      email_contact: warehouseContact?.email_contact || "",
      operation_hours: warehouseContact?.operation_hours || "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    let url = warehouseContact ? `/api/catalogue/warehouse/details/update` : `/api/catalogue/warehouse/details/save`
    let method = warehouseContact ? 'put' : 'post'

    execute({
      url,
      method,
      body: {
        ...values,
        id_warehouse,
        id: warehouseContact?.id || null,
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
          Información de contacto
        </CardTitle>
        <CardDescription>
          Detalles del contacto del almacén
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Nombre del administrador"
                name="manager"
                control={form.control}
                required
              />
              <FormInput
                label="Teléfono del administrador"
                name="number_contact"
                control={form.control}
                required
              />
            </div>

            <FormInput
              label="Correo electrónico del administrador"
              name="email_contact"
              control={form.control}
              required
            />

            <FormInput
              label="Horario de operación"
              name="operation_hours"
              type="textarea"
              control={form.control}
              description="Escribe cada dia en una linea, ejemplo: Lunes a Viernes de 9:00 am a 5:00 pm"
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
