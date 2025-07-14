import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import login from '@/assets/images/sigma.png'
import logo from '@/assets/images/logo.png'



export function LoginForm({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <img
                  src={logo}
                  alt="Image"
                  className="h-[2cm]"
                />
                <div className="flex flex-col justify-center">
                  <h1 className="text-2xl font-bold">Bienvenido a Sigma</h1>
                  <p className="text-balance text-muted-foreground">
                    Hospital Civil de Guadalajara
                  </p>
                </div>
              </div>
              {children}
            </div>
          </div>
          <div className="relative hidden bg-muted md:block">
            <img
              src={login}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover object-top dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
