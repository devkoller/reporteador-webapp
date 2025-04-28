import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormInput, FormCombobox } from '@/components/Form'
import { usePost, useFetch } from "@/hooks"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect, useContext } from "react"
import { Spinner } from "@/components/ui/spinner"
import { Save } from "lucide-react"
import { AlmacenType, } from "@/types"
import { UserConfigContext } from '@/context/UserConfigContext';



const formSchema = z.object({
  quantity: z.preprocess((val) => {
    const numberVal = Number(val);
    return isNaN(numberVal) ? undefined : numberVal;
  }, z.number({ message: "Debes ingresar la cantidad", })),
  unitPrice: z.preprocess((val) => {
    const numberVal = Number(val);
    return isNaN(numberVal) ? undefined : numberVal;
  }, z.number({ message: "El precio unitario de compra", })),
  productID: z.number({
    message: "Debes seleccionar un producto",
  }),
  lotName: z.string().optional().nullable(),
  expirationDate: z.string().optional().nullable(),
})

interface FormComboboxType {
  value: number
  label: string
}

interface useStateTypeof {
  products: FormComboboxType[]
  filterProducts: FormComboboxType[]
}


interface AddProductProps {
  warehouse: AlmacenType
  updateInventory: () => void
  closeDialog: () => void
}

export const AddProduct = ({ warehouse, updateInventory, closeDialog }: AddProductProps) => {
  const { toast } = useToast()
  const { execute, loading, } = usePost()
  const { config, } = useContext(UserConfigContext);

  const [Data, setData] = useState<useStateTypeof>({
    products: [],
    filterProducts: [],
  })

  const { response: productsData, loading: fetchLoading } = useFetch({
    url: "/data/read/products",
    qs: {
      enterpriseID: config?.enterprise?.id,
    },
  })


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productID: 0,
      quantity: 0,
      unitPrice: 0,
      expirationDate: "",
      lotName: "",
    },
  })

  useEffect(() => {
    if (productsData) {

      setData(prev => ({
        ...prev,
        products: productsData.data,
      }))
    }
  }, [productsData])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    let body = {
      warehouseID: warehouse.id,
      enterprise: config?.enterprise,
      products: [
        values
      ]
    }

    execute({
      url: "/inventory/create/input",
      body,
    }).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Correcto!",
          description: "Los datos han sido guardados correctamente",
        })
        form.reset()
        closeDialog()
        // refetch()
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


  if (fetchLoading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <FormCombobox
          label="Medicamento"
          name="productID"
          needFilter
          control={form.control}
          option={Data.products}
          setValue={form.setValue}
          required
        />

        <FormInput
          label="Cantidad"
          name="quantity"
          control={form.control}
          required
        />
        <FormInput
          label="Precio unitario"
          name="unitPrice"
          control={form.control}
          required
        />
        <FormInput
          label="Numero de lote"
          name="lotName"
          control={form.control}

        />
        <FormInput
          label="Fecha de caducidad"
          name="expirationDate"
          type="date"
          control={form.control}

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
