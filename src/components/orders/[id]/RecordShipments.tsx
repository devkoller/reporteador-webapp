import { useState, useRef } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Save, Truck, } from "lucide-react"
import { WarehouseIcon } from "lucide-react"
import { usePost, useToast } from "@/hooks"
import { PurchaseOrderType, SellingOrderType, RecordsShippingType } from "@/types"
import { DataTable, DataTableHandle } from '@/components/utils'
import { Form } from "@/components/ui/form"
import { FormInput } from "@/components/Form"
import { useForm } from "react-hook-form"
import { z, } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Columns } from "./columns"




const formSchema = z.object({
  notes: z.string().optional().nullable(),
})



interface RecordShipmentsProps {
  type: "selling" | "purchase"
  order: SellingOrderType | PurchaseOrderType
  refetch?: () => void
}

export const RecordShipments = ({ type, order, refetch }: RecordShipmentsProps) => {
  const { execute, loading } = usePost()
  const { toast } = useToast()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const tableRef = useRef<DataTableHandle<RecordsShippingType>>(null);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    },
  })


  const getSelectedRows = () => {
    if (!tableRef.current) return []
    if (!tableRef.current.getSelectedRows) return []

    return tableRef.current.getSelectedRows()
  }


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let selectedRows = getSelectedRows()
    if (selectedRows.length === 0) {
      toast({
        title: "Error",
        description: "No se ha seleccionado ningún producto",
        variant: "destructive",
      })
      return
    }

    let products = selectedRows.filter((item: RecordsShippingType) => item.quantityToSave > 0)

    let body = {
      ...values,
      orderId: order.id,
      data: products.map((item: RecordsShippingType) => {
        return {
          id: item.id,
          quantityToSave: item.quantityToSave,
        }
      })
    }


    let url = type === "selling" ? "/order/create/shipping" : "/order/receive/purchase"

    execute({
      url,
      method: "patch",
      body,
    }).then((response) => {
      if (response.status === 200) {
        toast({
          title: "Éxito",
          description: type === "selling" ? "Envío guardado" : "Recepción guardada",
        })
        setIsDialogOpen(false)
        if (refetch) {
          refetch()
        }
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        })
      }
    }).catch((error) => {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    })


  }

  return (

    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          {type === "selling" ? (
            <>
              <Truck className="mr-2 h-4 w-4" />
              Guardar Envío
            </>
          ) : (
            <>
              <WarehouseIcon className="mr-2 h-4 w-4" />
              Guardar Recepción
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {type === "selling" ? "Productos de salida" : "Productos de entrada"}
          </DialogTitle>
          <DialogDescription>
            {type === "selling"
              ? "Selecciona los productos que se están enviando al cliente."
              : "Selecciona los productos que están llegando al almacén."}
          </DialogDescription>
        </DialogHeader>


        <div className="flex items-center justify-end mb-2">
          <div className="text-sm text-muted-foreground">
            {/* {Object.values(productSelections).filter((item: any) => item.selected).length} de{" "}
            {Object.keys(productSelections).length} seleccionados */}
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-3 rounded-md border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <DataTable
                data={order.details as any[]}
                columns={Columns}
                ref={tableRef}
              />


              <FormInput
                label="Notas"
                name="notes"
                type='textarea'
                control={form.control}
              />

              <div className="flex justify-between gap-3">
                <Button type="button" variant="outline" disabled={loading} onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {type === "selling" ? "Guardar envió" : "Guardar recepción"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>


        {/* <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={loading || !hasSelectedProducts()}>
            {loading ? (
              <>Processing...</>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {type === "selling" ? "Record Shipment" : "Record Arrival"}
              </>
            )}
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
