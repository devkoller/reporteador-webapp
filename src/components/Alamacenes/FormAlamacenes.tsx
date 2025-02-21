import { AlmacenType } from "./Columns"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormInput } from '@/components/Form'
import { usePost } from "@/hooks"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  nombre: z.string({
    message: "El nombre es requerido",
  }).max(200, {
    message: "El nombre debe tener máximo 120 caracteres",
  }),
  descrip: z.string().optional(),
})

type FormAlamacenesProps = {
  selectedAlmacen: AlmacenType | null
  update: () => void
  closeSheet: () => void
}


export const FormAlamacenes = ({ selectedAlmacen, update, closeSheet }: FormAlamacenesProps) => {
  const { execute, loading } = usePost()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...selectedAlmacen
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const url = selectedAlmacen ? `/api/catalogue/warehouse/${selectedAlmacen.id}` : '/api/catalogue/warehouse'

    let method = selectedAlmacen ? "put" : "post"

    execute({
      url,
      method,
      body: {
        ...values,
        id: selectedAlmacen?.id,
      },
    }).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Almacén guardado",
          description: "El almacén ha sido guardado correctamente",
        })
        update()
        closeSheet()
      }
    })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            label="Nombre del almacén"
            name="nombre"
            control={form.control}
            required
          />
          <FormInput
            label="Descripción"
            name="descrip"
            control={form.control}
          />
          <div className="flex justify-end">

            <Button type="submit" disabled={loading}>
              Guardar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
