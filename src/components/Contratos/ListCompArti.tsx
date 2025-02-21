import { useState } from 'react'
import { DataTable } from '@/components/utils'
import { ArtiCotizacionType, ArtiCompColumns } from "./Columns"
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
import { useToast } from "@/hooks/use-toast"


const formSchema = z.object({
  cantidad: z.string({
    message: "La cantidad es requerida",
  }),
  precio: z.string({
    message: "El precio es requerido",
  }),
})


type Props = {
  addItem: (row: ArtiCotizacionType) => void
  articulos: ArtiCotizacionType[]
}


export const ListCompArti = ({ articulos, addItem }: Props) => {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const [selectedRow, setRowSelected] = useState<ArtiCotizacionType>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      precio: undefined,
      cantidad: undefined,
    },
  })

  const onRowDoubleClick = (row: ArtiCotizacionType) => {
    setOpen(true)
    setRowSelected(row)
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!selectedRow) return
    if (parseInt(selectedRow.cantidad) < parseInt(values.cantidad)) {
      toast({
        title: "Error",
        description: "La cantidad no puede ser mayor a la cantidad disponible del artículo",
      })
      return
    }


    addItem({
      ...selectedRow,
      ...values
    } as ArtiCotizacionType)
    form.reset()
    setOpen(false)
  }

  return (
    <div>
      <h3 className='text-lg font-semibold'>Selecciona los Artículos</h3>
      <div className='grid gap-4 mt-5'>
        <DataTable
          data={articulos || []}
          columns={ArtiCompColumns}
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
