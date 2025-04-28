import { WarehouseFacilityType } from "@/types"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormInput, FormSwitch } from '@/components/Form'
import { usePost } from "@/hooks"
import { useToast } from "@/hooks/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"



const formSchema = z.object({
  facility_size: z.string().min(1, {
    message: "El tamaño de la instalación es requerido",
  }),
  facility_notes: z.string().optional().nullable(),
  climate_controlled: z.boolean().optional().nullable(),
  security_system: z.boolean().optional().nullable(),
  cold_storage: z.boolean().optional().nullable(),
  packing_station: z.boolean().optional().nullable(),
  loading_dock: z.boolean().optional().nullable(),
})

type TabContactProps = {
  warehouseFacility?: WarehouseFacilityType | null
  id_warehouse: number
}


export const TabFacilities = ({ warehouseFacility, id_warehouse }: TabContactProps) => {

  const { execute, loading } = usePost()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facility_size: warehouseFacility?.facility_size || "",
      facility_notes: warehouseFacility?.facility_notes || "",
      climate_controlled: warehouseFacility?.climate_controlled || false,
      security_system: warehouseFacility?.security_system || false,
      cold_storage: warehouseFacility?.cold_storage || false,
      packing_station: warehouseFacility?.packing_station || false,
      loading_dock: warehouseFacility?.loading_dock || false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    let url = warehouseFacility ? `/api/catalogue/warehouse/facilities/update` : `/api/catalogue/warehouse/facilities/save`
    let method = warehouseFacility ? 'put' : 'post'

    execute({
      url,
      method,
      body: {
        ...values,
        id_warehouse,
        id: warehouseFacility?.id || null,
      },
    }).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Instalación guardada",
          description: "La instalación ha sido guardada correctamente",
        })
      }
    })
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Detalles de la instalación
        </CardTitle>
        <CardDescription>
          Información sobre las instalaciones del almacén
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              label="Tamaño de la instalación"
              name="facility_size"
              control={form.control}
              required
            />
            <div className="space-y-2">
              <Label>
                Instalaciones del almacén
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <FormSwitch
                  label="Climatizada"
                  name="climate_controlled"
                  control={form.control}
                />
                <FormSwitch
                  label="Sistema de seguridad"
                  name="security_system"
                  control={form.control}
                />
                <FormSwitch
                  label="Almacenamiento en frío"
                  name="cold_storage"
                  control={form.control}
                />
                <FormSwitch
                  label="Estación de embalaje"
                  name="packing_station"
                  control={form.control}
                />
                <FormSwitch
                  label="Muelles de carga"
                  name="loading_dock"
                  control={form.control}
                />
              </div>
            </div>

            <FormInput
              label="Notas de la instalación"
              name="facility_notes"
              type="textarea"
              control={form.control}
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
