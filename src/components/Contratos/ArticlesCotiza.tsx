import { useState, useEffect } from 'react'
import { useFetch } from "@/hooks"
import { DataTable } from '@/components/utils'
import { ArticulosColumns, catArticuloType, ArtiCotizacionType } from "./Columns"
import { Spinner } from '@/components/ui/spinner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/Form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"




const formSchema = z.object({
  cantidad: z.string({
    message: "La cantidad es requerida",
  }),
  precio: z.string({
    message: "El precio es requerido",
  }),
})


type StateTypeof = {
  articles: catArticuloType[]
  selectedRow: catArticuloType | null
}

type Props = {
  selectedRow: (row: ArtiCotizacionType) => void
}



export const ArticlesCotiza = ({ selectedRow }: Props) => {
  const [open, setOpen] = useState(false)
  const [Data, setData] = useState<StateTypeof>({
    articles: [],
    selectedRow: null
  })
  const { response: articulosData, loading: articleLoading } = useFetch({
    url: "/api/catalogue/article",
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      precio: undefined,
      cantidad: undefined,
    },
  })

  const onRowDoubleClick = (row: catArticuloType) => {
    setOpen(true)
    setData(prev => ({
      ...prev,
      selectedRow: row
    }))
    // selectedRow({
    //   ...row,
    //   cantidad: 1,
    //   precio: 1,
    // })
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    selectedRow({
      ...Data.selectedRow,
      cantidad: values.cantidad,
      precio: values.precio,
    } as ArtiCotizacionType)
    form.reset()
    setOpen(false)

  }

  useEffect(() => {
    if (articulosData) {
      setData(prev => ({
        ...prev,
        articles: articulosData.data
      }))
    }
  }, [articulosData])

  if (articleLoading) {
    return <Spinner />
  }

  return (
    <div>
      <h3 className='text-lg font-semibold'>Selecciona los Artículos</h3>
      <div className='grid gap-4 mt-5'>
        <DataTable
          data={Data.articles}
          columns={ArticulosColumns}
          onRowDoubleClick={onRowDoubleClick}
        />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Agregar artículo
            </DialogTitle>
            <DialogDescription>
              Ingresa la cantidad y precio del artículo
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormInput
                label="Cantidad"
                name="cantidad"
                control={form.control}
                required
              />
              <FormInput
                label="Precio unitario"
                name="precio"
                control={form.control}
                required
              />
              <div className="flex justify-end">

                <Button type="submit">
                  Agregar artículo
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
