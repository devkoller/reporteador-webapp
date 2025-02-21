import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormInput } from "@/components/Form"
import { ProveedorType } from "./Column"
import { usePost } from "@/hooks"
import { useToast } from "@/hooks/use-toast"

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
})

type FormProveedorProps = {
  selectedProveedor: ProveedorType | null
  update: () => void
  closeSheet: () => void
}

export const FormProveedores = ({ selectedProveedor, update, closeSheet }: FormProveedorProps) => {
  const { execute, loading } = usePost()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...selectedProveedor
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const url = selectedProveedor ? `/api/catalogue/provider/${selectedProveedor.id}` : '/api/catalogue/provider'

    let method = selectedProveedor ? "put" : "post"

    execute({
      url,
      method,
      body: {
        ...values,
        id: selectedProveedor?.id,
      },
    }).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Cliente guardado",
          description: "El cliente ha sido guardado correctamente",
        })
        update()
        closeSheet()
      }
    })
  }
  return <div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          label="Representante legal"
          name="representanteLegal"
          control={form.control}
        />
        <FormInput
          label="Regimen fiscal"
          name="regimenFiscal"
          control={form.control}
        />
        <FormInput
          label="Teléfono"
          name="telefono"
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
}
