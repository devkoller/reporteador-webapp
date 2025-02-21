import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormInput, FormCombobox } from '@/components/Form'
import { usePost, useFetch } from "@/hooks"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"

const formSchema = z.object({
  nombre: z.string({
    message: "El nombre es requerido",
  }).max(45, {
    message: "El nombre debe tener menos de 45 caracteres",
  }),
  clienteId: z.number({
    message: "El cliente es requerido",
  }),
})

type FormContratosProps = {
  update: () => void
  closeSheet: () => void
}

export const FormContratos = ({ update, closeSheet }: FormContratosProps) => {
  const { execute, loading } = usePost()
  const [Data, setData] = useState({
    clientes: [],
  })
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: undefined,
      clienteId: undefined,
    },
  })

  const { response: clientes } = useFetch({
    url: "/api/catalogue/client",
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    execute({
      url: '/api/contratos',
      body: values,
    }).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Contrato guardado",
          description: "El contrato ha sido guardado correctamente",
        })
        update()
        closeSheet()
      }
    })
  }

  useEffect(() => {
    if (clientes) {
      const clientesList = clientes.data.map((cliente: any) => {
        return {
          label: cliente.nombre,
          value: cliente.id,
        }
      })

      setData((prev) => ({ ...prev, clientes: clientesList }))
    }
  }, [clientes])


  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormInput
            label="Nombre"
            name="nombre"
            control={form.control}
            required
          />
          <FormCombobox
            label="Cliente"
            name="clienteId"
            control={form.control}
            option={Data.clientes}
            setValue={form.setValue}
            required
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
