import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormInput, FormCombobox } from '@/components/Form'
import { ContratoType } from "./Columns"
import { usePost, useFetch } from "@/hooks"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect, useMemo } from "react"
import { Spinner } from "@/components/ui/spinner"

const formSchema = z.object({
  articuloId: z.number(),
  cantidad: z.string(),
  preciosimp: z.string(),
  precioVenta: z.string(),
})

type FormAddSimpleArticleProps = {
  update: () => void
  closeSheet: () => void
  contrato: ContratoType | null
}

type StateTypeof = {
  articulos: ArrayType[]
}

type ArrayType = {
  value: number
  label: string
}

export const AddSimpleArticle = ({ update, closeSheet, contrato }: FormAddSimpleArticleProps) => {
  const { execute, loading: executeLoading } = usePost()
  const { toast } = useToast()
  const [Data, setData] = useState<StateTypeof>({
    articulos: [],
  })
  const processedData = useMemo(() => {
    return Data.articulos.map((item: any) => ({ ...item, additionalProp: 'processed' }));
  }, [Data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      articuloId: 0,
      cantidad: "",
      preciosimp: "",
      precioVenta: "",
    },
  })

  const { response: articulos, loading } = useFetch({
    url: "/api/inventory/inventory/get",
  })


  function onSubmit(values: z.infer<typeof formSchema>) {

    // let url = selectedUser ? `/user/update-user` : "/user/new-user"
    // let method = selectedUser ? "patch" : "post"
    let iva = parseFloat(values.preciosimp) * 0.16
    let preciocimp = parseFloat(values.preciosimp) + iva
    const body = {
      ...values,
      total: parseInt(values.cantidad) * preciocimp,
      preciocimp,
      contratoId: contrato?.id,
      type: 1,
    }
    execute({
      url: "/api/contratos/detalle",
      body,
    }).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Articulo guardado",
          description: "El articulo ha sido guardado correctamente",
        })
        update()
        closeSheet()
      } else {
        toast({
          title: "Error",
          description: "El articulo no puede ser guardado",
        })
      }
    })
  }
  const AritucloId = form.watch('articuloId')

  useEffect(() => {
    if (AritucloId === 0) return
    execute({
      url: `/api/inventory/avgPrice/${AritucloId}`,
      method: "get",
    }).then((res) => {
      if (res.status === 200) {
        form.setValue("preciosimp", parseFloat(res.data).toFixed(2))
      }
    })

  }, [AritucloId])

  useEffect(() => {
    if (articulos) {

      let articulosList: ArrayType[] = []

      articulos.data.map((articulo: any) => {
        if (parseInt(articulo.cantidad) > 0) {
          articulosList.push({
            value: articulo.articuloId,
            label: `(${parseInt(articulo.cantidad)}) ${articulo.catArticulo.nombre}`,
          })
        }
      })

      // filter articulosList with same value 
      articulosList = articulosList.filter((item, index) => {
        return articulosList.findIndex((item2) => item2.value === item.value) === index
      })

      setData((prev) => ({ ...prev, articulos: articulosList }))
    }

  }, [articulos])

  if (loading && processedData.length === 0) return <Spinner />

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormCombobox
            control={form.control}
            label="Articulo"
            name="articuloId"
            option={Data.articulos}
            setValue={form.setValue}
          />

          <FormInput control={form.control} label="Cantidad" name="cantidad" required />
          <FormInput
            label="Precio sin imp."
            name="preciosimp"
            required
            control={form.control}
            disabled
          />
          <FormInput control={form.control} label="Precio de venta" name="precioVenta" required />
          <div className="flex justify-end">

            <Button type="submit" disabled={executeLoading}>
              Guardar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
