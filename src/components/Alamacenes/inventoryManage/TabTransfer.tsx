import { useState, useEffect, useContext, useRef } from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFetch } from "@/hooks"
import { AlmacenType } from "@/types"
import { UserConfigContext } from '@/context/UserConfigContext';
import { Spinner } from "@/components/ui/spinner"
import { z, } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { FormCombobox, FormInput } from '@/components/Form'
import { usePost, useToast } from "@/hooks"
import { DataTable, DataTableHandle } from "@/components/utils"
import { ColumnsTransfer, inventoryTransferType } from "@/components/inventory"


interface TabTransferProps {
  warehouse: AlmacenType
}

interface FormComboboxType {
  value: number
  label: string
}

interface StateTypeof {
  warehouses: FormComboboxType[]
  inventoryData: inventoryTransferType[]
}

const formSchema = z.object({
  destinationWarehouse: z.number({
    message: "El almacén de destino es requerido",
  }),
  notes: z.string().optional().nullable(),
})

export const TabTransfer = ({ warehouse }: TabTransferProps) => {
  const { config, } = useContext(UserConfigContext);
  const [Data, setData] = useState<StateTypeof>({
    warehouses: [],
    inventoryData: [],
  })
  const { toast } = useToast()
  const { execute, loading: postLoading } = usePost()

  const tableRef = useRef<DataTableHandle<inventoryTransferType>>(null);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destinationWarehouse: 0,
      notes: "Transferencia de inventario entre almacenes",
    },
  })


  const { response: almacenesData, loading } = useFetch({
    url: "/data/read/warehouses",
    qs: {
      enterpriseID: config?.enterprise?.id,
    }
  })

  const { response: inventorysData, loading: loadingFetch, refetch } = useFetch({
    url: "/inventory/read/all",
    qs: {
      enterpriseID: config?.enterprise?.id,
      warehouseID: warehouse.id,
    }
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

    let products = selectedRows.map((item: inventoryTransferType) => {
      return {
        productID: item.id,
        quantity: parseInt(item.transfer),
      }
    })

    let body = {
      warehouseIDOrigin: warehouse.id,
      warehouseIDDestination: values.destinationWarehouse,
      enterprise: config?.enterprise,
      notes: values.notes,
      products: products,
    }


    execute({
      url: "/inventory/create/transfer",
      body,
    }).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Correcto!",
          description: "Los datos han sido guardados correctamente",
        })
        form.reset()
        refetch()
        // closeDialog()
        // updateInventory()
      } else {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        })
      }
    })
  }

  useEffect(() => {
    if (almacenesData) {
      setData(prev => ({
        ...prev,
        warehouses: almacenesData.data
      }))
    }
  }, [almacenesData])

  useEffect(() => {
    if (inventorysData) {
      setData(prev => ({
        ...prev,
        inventoryData: inventorysData.data,
      }))
    }
  }, [inventorysData])

  if (loading || loadingFetch) {
    return (
      <div className="container mx-auto py-10">
        <Spinner />
      </div>
    )
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Transferir Stock</CardTitle>
        <CardDescription>Mueve inventario entre almacenes</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="space-y-4">
                <Label htmlFor="source" className="mb-2 block">
                  Almacén de origen
                </Label>
                <Input id="source" value={warehouse.nombre} disabled />
              </div>

              <FormCombobox
                name="destinationWarehouse"
                label="Almacén de destino"
                control={form.control}
                option={Data.warehouses}
                setValue={form.setValue}
                required
              />
            </div>

            <Card className="space-y-4 p-5">
              <h3 className="text-lg font-semibold">
                Selecciona los productos a transferir
              </h3>

              <DataTable
                data={Data.inventoryData}
                columns={ColumnsTransfer}
                ref={tableRef}
              // getSelectedRows={getSelectedRows}
              />
            </Card>


            <Card className="space-y-4 p-5">

              <h3 className="text-lg font-semibold">
                Detalles de la transferencia
              </h3>

              <FormInput
                label="Notas"
                name="notes"
                type='textarea'
                control={form.control}
                required
              />

              <div className="flex justify-between gap-3">
                <Button type="button" variant="outline" disabled={postLoading}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={postLoading}>
                  {postLoading ? (
                    "Guardando..."
                  ) : (
                    <>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Crear trasferencia
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
