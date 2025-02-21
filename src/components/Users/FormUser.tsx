import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormInput } from '@/components/Form'
import { UserType } from "./Columns"
import { usePost } from "@/hooks"
import { useToast } from "@/hooks/use-toast"



const formSchema = z.object({
  username: z.string().min(2, {
    message: "El usuario debe tener al menos 2 caracteres",
  }).max(50, {
    message: "El usuario debe tener menos de 50 caracteres",
  }),
  nombre: z.string(),
  ape1: z.string(),
  ape2: z.string().nullable(),
  correo: z.string().email({
    message: "Correo no válido",
  }),
})

type FormUserProps = {
  selectedUser: UserType | null
  update: () => void
  closeSheet: () => void
}

export const FormUser = ({ selectedUser, update, closeSheet }: FormUserProps) => {
  const { execute, loading } = usePost()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: selectedUser?.username || "",
      nombre: selectedUser?.persona?.nombre || "",
      ape1: selectedUser?.persona?.ape1 || "",
      ape2: selectedUser?.persona?.ape2 || "",
      correo: selectedUser?.correo || "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {

    let url = selectedUser ? `/user/update-user` : "/user/new-user"
    let method = selectedUser ? "patch" : "post"

    execute({
      url,
      method,
      body: {
        ...values,
        id: selectedUser?.id,
      },
    }).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Usuario guardado",
          description: "El usuario ha sido guardado correctamente",
        })
        update()
        closeSheet()
      }
    })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormInput
            label="Usuario"
            name="username"
            control={form.control}
            required
          />
          <FormInput
            label="Nombre"
            name="nombre"
            control={form.control}
            required
          />
          <FormInput
            label="Primer apellido"
            name="ape1"
            control={form.control}
            required
          />
          <FormInput
            label="Segundo apellido"
            name="ape2"
            control={form.control}
          />
          <FormInput
            label="Correo"
            name="correo"
            control={form.control}
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
