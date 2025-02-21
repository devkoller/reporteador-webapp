
import { Menu } from '@/components/Landing'
// import { AuthLayer } from '@/components/Login'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormInput, FormCheckBox } from '@/components/Form'
import { useAuthStore } from '@/hooks'
import { LoginForm } from "@/components/login-form"


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
  keepSessionOpen: z.boolean(),
})


export const Login = () => {
  const { startLogin } = useAuthStore()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      keepSessionOpen: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    startLogin(values)
  }

  return (
    <>
      <Menu />
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
                  password
                  control={form.control}
                />
                <FormCheckBox
                  label="Mantener sesión abierta"
                  name="keepSessionOpen"
                  control={form.control}
                />
                <Button type="submit">
                  Iniciar sesión
                </Button>
              </form>
            </Form>
          </LoginForm>
        </div>
      </div>
      {/* <AuthLayer>
        <div className="bg-white p-5 h-full">
          <div className="mb-10">
            <h1 className="font-bold text-4xl">Corporativo</h1>
          </div>
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
                password
                control={form.control}
              />
              <FormCheckBox
                label="Mantener sesión abierta"
                name="keepSessionOpen"
                control={form.control}
              />
              <Button type="submit">
                Iniciar sesión
              </Button>
            </form>
          </Form>
        </div>
      </AuthLayer> */}
    </>
  )
}
