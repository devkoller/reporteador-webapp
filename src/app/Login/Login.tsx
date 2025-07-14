import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormInput } from '@/components/Form'
import { LoginForm } from "@/components/login-form"
import { usePost, useSession, useToast } from "@/hooks"
import { User } from "@/types"
import { Spinner } from "@/components/ui/spinner"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "El usuario debe tener al menos 2 caracteres",
  }).max(50, {
    message: "El usuario debe tener menos de 50 caracteres",
  }),
  password: z.string().min(4, {
    message: "La contraseña debe tener al menos 4 caracteres",
  }).max(50, {
    message: "La contraseña debe tener menos de 50 caracteres",
  }),
})

export const Login = () => {
  const { setUser } = useSession()
  const { execute, loading } = usePost()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {

    execute({
      url: "/v1/user/login",
      method: "post",
      body: values,
    }).then((res) => {
      if (res.status === 200) {
        let data = res.data

        let user = {
          ...data.user,
          permissions: data.permissions,
          token: data.token,
          status: "authenticated",
        }

        setUser(user as User)

        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido a Panacea",
        })
      } else {
        toast({
          title: "Error al iniciar sesión",
          description: res.message || "Por favor, verifica tus credenciales",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormInput
                label="Usuario"
                name="username"
                control={form.control}
              />
              <FormInput
                label="Contraseña"
                name="password"
                type="password"
                control={form.control}
              />
              <Button type="submit" disabled={loading} className="w-full">
                Iniciar sesión
                {loading && (
                  <Spinner />
                )}
              </Button>
            </form>
          </Form>
        </LoginForm>
      </div>
    </div>
  )
}
