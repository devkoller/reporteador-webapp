
import { useFetch, usePost } from "@/hooks"
import { useState, useEffect, useMemo } from "react"
import { Spinner } from '@/components/ui/spinner'
import { MovimientosColumns, MovementsType } from "./Columns"
import { DataTable } from '@/components/utils'
import { utils } from '@/utils'
import { Card, CardHeader, CardTitle, CardFooter, CardDescription, CardContent } from '@/components/ui/card'
import { useToast } from "@/hooks/use-toast"

import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from "../ui/button"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type StateTypeof = {
  items: MovementsType[]
  total: string
  totalItems: number
  selectedRow: MovementsType | null
}


export const Movimientos = () => {
  const { execute, loading: loadginPost } = usePost()
  const { toast } = useToast()
  const { response: moviemientos, loading } = useFetch({
    url: "/api/inventory/movement",
    qs: {},
  })

  const [Data, setData] = useState<StateTypeof>({
    items: [],
    total: "",
    totalItems: 0,
    selectedRow: null
  })

  const processedData = useMemo(() => {
    return Data.items.map((item: any) => ({ ...item, additionalProp: 'processed' }));
  }, [Data]);



  const selectedRow = (row: MovementsType) => {
    setData(prev => ({ ...prev, selectedRow: row }))
  }

  const closeRow = () => {
    setData(prev => ({ ...prev, selectedRow: null }))
  }

  const deleteRow = (id: number) => {
    execute({
      url: `/api/inventory/movement/${id}`,
      method: "delete",
    }).then(res => {
      if (res.status === 200) {
        toast({
          title: "Movimiento eliminado",
          description: "El movimiento ha sido eliminado correctamente",
        })
        update()
        setData(prev => ({ ...prev, selectedRow: null }))
      } else {
        toast({
          title: "Error",
          description: "El movimiento no puede ser eliminado",
        })
      }
    })
  }

  const printDetalle = () => {
    if (!Data.selectedRow || !Data.selectedRow.detalle) return null
    return Data.selectedRow.detalle.map((det: any, index: number) => {
      return (
        <li key={index} className="flex justify-between border rounded-sm mb-3">
          <div className="flex flex-col w-full">
            <span className="w-full p-2 bg-slate-100">Articulo</span>
            <p className="p-2">
              {det.articulo?.nombre || ''}
            </p>
            <div className="grid grid-cols-2">
              <div className="flex flex-col">
                <span className="w-full p-2 bg-slate-100">Cantidad</span>
                <p className="p-2">
                  {det.cantidad || ''}
                </p>

              </div>
              <div className="flex flex-col">
                <span className="w-full p-2 bg-slate-100">Precio S/Imp</span>
                <p className="p-2">
                  {utils.formatCurrency(parseFloat(det.precioSImp))}
                </p>
              </div>

            </div>
          </div>
        </li>
      )
    })
  }

  const update = () => {
    execute({
      url: "/api/inventory/movement",
      qs: {},
      method: "get",
    }).then((res) => {
      const data = res.data.map((mov: any) => {
        let totalSImp = 0

        let totalCImp = 0

        if (mov?.detalle && mov?.detalle.length > 0) {
          mov.detalle.forEach((det: any) => {
            totalSImp += parseFloat(det.precioSImp) * det.cantidad || 0
          })
        }

        let iva = totalSImp * 0.16
        totalCImp = totalSImp + iva

        const fecha = new Date(mov.createdAt).toJSON().slice(0, 10)

        return {
          ...mov,
          fecha: fecha,
          movimiento: mov?.catTipoMovimiento.descripcion || "",
          totalsimp: utils.formatCurrency(parseFloat(totalSImp.toFixed(2))),
          totalcimp: utils.formatCurrency(parseFloat(totalCImp.toFixed(2))),
        }
      })
      setData((prev) => ({ ...prev, items: data }))
    })
  }


  useEffect(() => {
    if (moviemientos) {
      const data = moviemientos.data.map((mov: any) => {
        let totalSImp = 0

        let totalCImp = 0

        if (mov?.detalle && mov?.detalle.length > 0) {
          mov.detalle.forEach((det: any) => {
            totalSImp += parseFloat(det.precioSImp) * det.cantidad || 0
          })
        }

        let iva = totalSImp * 0.16
        totalCImp = totalSImp + iva

        const fecha = new Date(mov.createdAt).toJSON().slice(0, 10)

        return {
          ...mov,
          fecha: fecha,
          movimiento: mov?.catTipoMovimiento.descripcion || "",
          totalsimp: utils.formatCurrency(parseFloat(totalSImp.toFixed(2))),
          totalcimp: utils.formatCurrency(parseFloat(totalCImp.toFixed(2))),
        }
      })
      setData((prev) => ({ ...prev, items: data }))
    } else {
      if (processedData.length > 0) {
        setData((prev) => ({ ...prev, items: processedData }))
      }
    }
  }, [moviemientos])

  if (loading && processedData.length === 0) {
    return <Spinner />
  }
  return (
    <div className="h-full py-2">
      <div className={`grid h-full items-stretch gap-6 ${Data.selectedRow ? 'md:grid-cols-[1fr_400px]' : ''}`}>

        <div className={`${Data.selectedRow ? 'flex' : 'hidden'} flex-col space-y-4 md:order-2`}>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">Detalle del movimiento
                <Button variant='destructive' onClick={closeRow}>Cerrar</Button>
              </CardTitle>
              <CardDescription></CardDescription>
              <CardContent>
                <ScrollArea className="h-[500px] mb-3">
                  <ul className="">
                    {printDetalle()}
                  </ul>
                </ScrollArea>

                <CardFooter>
                  {Data.selectedRow && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant='destructive' className="w-full">Eliminar movimiento</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Estas seguro de eliminar este movimiento?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará permanentemente el movimiento.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>No, cancelar</AlertDialogCancel>
                          <AlertDialogAction asChild>
                            <Button variant='destructive' disabled={loadginPost} onClick={() => deleteRow(Data?.selectedRow?.id || 0)}>Si, eliminar</Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}


                </CardFooter>

              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <div className="md:order-1">
          <DataTable
            data={Data.items}
            columns={MovimientosColumns}
            onRowClick={selectedRow}
          />
        </div>
      </div>


    </div>
  )
}
