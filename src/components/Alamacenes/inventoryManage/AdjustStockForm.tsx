import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormInput, FormSelect } from '@/components/Form'
import { usePost, useToast } from "@/hooks"
import { AlmacenType } from "@/types"
import { useContext } from "react"
import { Save } from "lucide-react"
import { UserConfigContext } from '@/context/UserConfigContext';
import { InventoryType } from "@/types"



const formSchema = z.object({
  type: z.string().min(1, {
    message: "El tipo de ajuste es requerido",
  }),
  quantity: z.preprocess((val) => {
    const numberVal = Number(val);
    return isNaN(numberVal) ? undefined : numberVal;
  }, z.number({ message: "Debes ingresar la cantidad", })),
  notes: z.string().optional().nullable(),
})


interface AdjustStockFormProps {
  warehouse: AlmacenType
  updateInventory: () => void
  closeDialog: () => void
  product: InventoryType | null
}

export const AdjustStockForm = ({ warehouse, updateInventory, closeDialog, product }: AdjustStockFormProps) => {
  const { toast } = useToast()
  const { execute, loading } = usePost()
  const { config, } = useContext(UserConfigContext);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: '',
      quantity: 0,
      notes: "Ajuste manual de inventario",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    let body = {
      warehouseID: warehouse.id,
      enterprise: config?.enterprise,
      notes: values.notes,
      products: [
        {
          productID: product?.id,
          quantity: values.quantity,
        }
      ]
    }

    let url = parseInt(values.type) === 1 ? "/inventory/create/input" : "/inventory/create/output"

    execute({
      url,
      body,
    }).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Correcto!",
          description: "Los datos han sido guardados correctamente",
        })
        form.reset()
        closeDialog()
        updateInventory()
      } else {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <FormSelect
          label="Tipo de ajuste"
          name="type"
          control={form.control}
          option={[
            { value: 1, label: "Añadir Stock" },
            { value: 2, label: "Reducir Stock" },
          ]}
          needFilter
          required
        />

        <FormInput
          label="Cantidad"
          name="quantity"
          control={form.control}
          description="Cantidad que se va a reducir o añadir al inventario"
          required
        />

        <FormInput
          label="Notas"
          name="notes"
          control={form.control}
          required
        />

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={closeDialog} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              "Guardando..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Guardar
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
