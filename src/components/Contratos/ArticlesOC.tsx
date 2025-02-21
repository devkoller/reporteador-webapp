import { useState } from 'react'
import { DataTable } from '@/components/utils'
import { getOCDetalleColumns, CotizacionesType, CotizacionDetalleType } from "./Columns"
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
import { utils } from '@/utils'

const formSchema = z.object({
  cantidad: z.string({
    message: "La cantidad es requerida",
  }),
  precio: z.string({
    message: "El precio es requerido",
  }),
})

type Props = {
  setData: (data: any) => void
  cotizacionDetalle?: CotizacionDetalleType[]
}

export const ArticlesOC = ({ setData, cotizacionDetalle }: Props) => {
  const [open, setOpen] = useState(false)
  const [rowSelected, setRowSelected] = useState<CotizacionDetalleType | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      precio: '',
      cantidad: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {

    if (!rowSelected) return

    let newDetail = cotizacionDetalle?.map((item: CotizacionDetalleType) => {
      if (item.id === rowSelected.id) {
        return {
          ...item,
          cantidad: values.cantidad,
          precio: utils.formatCurrency(parseFloat(values.precio)),
          total: utils.formatCurrency(parseFloat(values.precio) * parseFloat(values.cantidad))
        }
      }
      return item
    })


    setData((prev: any) => ({
      ...prev, selectedCotizacion: {
        ...prev.selectedCotizacion,
        cotizacionDetalle: newDetail
      }
    }))
    form.reset()
    setOpen(false)

  }

  const onRowDoubleClick = (row: CotizacionDetalleType) => {
    setOpen(true)
    setRowSelected(row)
    form.setValue('cantidad', row.cantidad)
    const cleanString = row.precio.replace(/[^0-9.-]+/g, "");
    form.setValue('precio', cleanString)


  }

  const handleDelete = (row: CotizacionesType) => {

    let exists = cotizacionDetalle

    if (exists && exists?.length > 0) {
      let exist = exists.find((item: CotizacionDetalleType) => item.id === row.id)
      if (exist) {
        let newArticles = exists.filter((item: CotizacionDetalleType) => item.id !== row.id)

        setData((prev: any) => ({
          ...prev, selectedCotizacion: {
            ...prev.selectedCotizacion,
            cotizacionDetalle: newArticles
          }
        }))
      }
    }
  }

  const OCDetalleColumns = getOCDetalleColumns(handleDelete)


  return (
    <div>
      <h3 className='text-lg font-semibold'>Artículos</h3>
      <div className='grid gap-4 mt-5'>
        <DataTable
          data={cotizacionDetalle || []}
          columns={OCDetalleColumns}
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
