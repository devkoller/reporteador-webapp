import { ContratoType, getArticulosColumns, DetalleType } from "./Columns"
import { useState, useEffect } from "react"
import { DataTable } from '@/components/utils'
import { utils } from '@/utils'
import Swal from 'sweetalert2'
import { usePost } from '@/hooks'
import { useToast } from "@/hooks/use-toast"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  PageActions
} from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { AddSimpleArticle } from './AddSimpleArticle'



type Props = {
  contrato: ContratoType | null
  update: () => void
  contratoDetalle: DetalleType[]
}

type StateTypeof = {
  data: DetalleType[]
}

export const TabArticulosContrato = ({ contrato, contratoDetalle, update }: Props) => {
  const [open, setOpen] = useState(false)
  const { execute } = usePost()
  const { toast } = useToast()
  const [Data, setData] = useState<StateTypeof>({ data: [] })

  const deleteRow = (row: DetalleType) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podras revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        execute({
          url: `/api/contratos/detalle/${row.id}`,
          method: "delete",
        }).then((res) => {
          if (res.status === 200) {
            toast({
              title: "Correcto",
              description: "El movimiento ha sido eliminado correctamente",
            })
            update()
          }
        })
      }
    })
  }

  const handleOpen = () => {
    setOpen(prev => !prev)
  }


  const DetallesColumns = getArticulosColumns(deleteRow)

  useEffect(() => {
    if (contrato) {
      let data: DetalleType[] = []
      if (contrato?.contratosDetalles && contrato?.contratosDetalles.length > 0) {
        contrato?.contratosDetalles.forEach((detalle) => {
          let precioVenta = detalle.precioVenta ? parseFloat(detalle.precioVenta) : 0
          let preciosimp = detalle.preciosimp ? parseFloat(detalle.preciosimp) : 0
          let preciocimp = detalle.preciocimp ? parseFloat(detalle.preciocimp) : 0
          let total = detalle.total ? parseFloat(detalle.total) : 0
          data.push({
            ...detalle,
            precioVenta: utils.formatCurrency(parseFloat(precioVenta.toFixed(2))),
            preciosimp: utils.formatCurrency(parseFloat(preciosimp.toFixed(2))),
            preciocimp: utils.formatCurrency(parseFloat(preciocimp.toFixed(2))),
            total: utils.formatCurrency(parseFloat(total.toFixed(2))),
          })
        })
        setData(prev => ({ ...prev, data: data }))
      }
    }
  }, [contrato])

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>
          Artículos de salida del contrato
        </PageHeaderHeading>
        <PageHeaderDescription>
        </PageHeaderDescription>
        <PageActions>
          <Button size="sm" onClick={handleOpen}>Agrega artículo simple</Button>
        </PageActions>
      </PageHeader>
      <DataTable
        data={Data.data}
        columns={DetallesColumns}
      />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              Agrega artículos al contrato
            </SheetTitle>
            <SheetDescription>
            </SheetDescription>
          </SheetHeader>
          <AddSimpleArticle contrato={contrato} closeSheet={handleOpen} update={update} />
        </SheetContent>
      </Sheet>
    </>
  )
}
