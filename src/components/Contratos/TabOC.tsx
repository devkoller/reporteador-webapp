import { useState, useEffect } from "react"
import { useFetch, usePost } from '@/hooks'
import { ContratoType, getOCColumns, OcType, OcDetalleType } from "./Columns"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { utils } from "@/utils"
import { DataTable } from '@/components/utils'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { OC } from './OC'
import { API_URL } from "@/api/config"



type Props = {
  contrato: ContratoType | null
}

type StateTypeof = {
  oc: boolean
  ocData: OcType[]
  selectedRow: OcType | null
}

export const TabOC = ({ contrato }: Props) => {
  const { execute } = usePost()
  const [Data, setData] = useState<StateTypeof>({
    oc: false,
    ocData: [],
    selectedRow: null
  })

  const { response: OCData, loading } = useFetch({
    url: "/api/orders/purchaseOrder",
    qs: {
      contratoId: contrato?.id
    }
  })

  const update = () => {
    execute({
      url: "/api/orders/purchaseOrder",
      method: "get",
      qs: {
        contratoId: contrato?.id
      }
    }).then((res: any) => {
      let oc = res.data.map((item: OcType) => {

        let total = 0
        let totalArticulos = 0

        item?.ordenCompraDetalle?.forEach((detalle: OcDetalleType) => {
          total += detalle.precio ? parseFloat(detalle.precio) : 0
          totalArticulos += detalle.cantidad ? parseInt(detalle.cantidad) : 0
        })
        return {
          ...item,
          contador: item?.ordenCompraDetalle?.length || 0,
          totalArticulos: totalArticulos,
          total: utils.formatCurrency(parseFloat(total.toFixed(2)))
        }
      })

      setData(prev => ({
        ...prev,
        ocData: oc
      }))
    })
  }

  const handleOc = () => {
    setData(prev => ({
      ...prev,
      oc: !prev.oc
    }))
  }

  const selectedRow = (row: OcType) => {
    setData(prev => ({ ...prev, selectedRow: row }))
  }

  const closeDetalle = () => {
    setData(prev => ({
      ...prev,
      selectedRow: null
    }))
  }

  const printDetalle = () => {
    if (!Data.selectedRow?.ordenCompraDetalle) return
    if (Data.selectedRow?.ordenCompraDetalle?.length === 0) return
    return Data.selectedRow?.ordenCompraDetalle.map((detalle: OcDetalleType, index) => {
      return (
        <li key={index} className="flex justify-between border rounded-sm mb-3">
          <div className="flex flex-col w-full">
            <span className="w-full p-2 bg-slate-100">Articulo</span>
            <p className="p-2">
              {detalle.articulo?.nombre || ''}
            </p>
            <div className="grid grid-cols-2">
              <div className="flex flex-col">
                <span className="w-full p-2 bg-slate-100">Cantidad</span>
                <p className="p-2">
                  {detalle.cantidad ? parseInt(detalle.cantidad) : 0}
                </p>

              </div>
              <div className="flex flex-col">
                <span className="w-full p-2 bg-slate-100">Precio ind. S/Imp</span>
                <p className="p-2">
                  {detalle.precio ? utils.formatCurrency(parseFloat(detalle.precio)) : 0}
                </p>
              </div>

            </div>
          </div>
        </li>
      )
    })
  }

  const showPDF = (row: OcDetalleType) => {
    window.open(`${API_URL}/api/orders/printPurchaseOrder/${row.id}`, '_blank')

  }


  const columns = getOCColumns(showPDF)

  useEffect(() => {
    if (OCData) {
      let oc = OCData.data.map((item: OcType) => {

        let total = 0
        let totalArticulos = 0

        item?.ordenCompraDetalle?.forEach((detalle: OcDetalleType) => {
          let cantidad = detalle.cantidad ? parseInt(detalle.cantidad) : 0
          total += detalle.precio ? parseFloat(detalle.precio) * cantidad : 0
          totalArticulos += detalle.cantidad ? parseInt(detalle.cantidad) : 0
        })

        return {
          ...item,
          contador: item?.ordenCompraDetalle?.length || 0,
          totalArticulos: totalArticulos,
          total: utils.formatCurrency(parseFloat(total.toFixed(2)))
        }
      })

      setData(prev => ({
        ...prev,
        ocData: oc
      }))

    }
  }, [OCData])


  if (loading) {
    return (
      <Spinner />
    )
  }

  return (
    <div>
      {!Data.oc && (
        <PageHeader>
          <PageHeaderHeading>Ordenes de compra</PageHeaderHeading>
          <PageHeaderDescription>
            Aquí puedes ver y crear ordenes de compra necesarias para el contrato.
          </PageHeaderDescription>
          <PageActions>
            <Button size="sm" onClick={handleOc}>
              Nueva orden de compra
            </Button>
          </PageActions>
        </PageHeader>
      )}

      {Data.oc && (
        <>
          <OC contrato={contrato} close={handleOc} update={update} />
        </>
      )}

      {!Data.oc && (
        <div className="h-full py-2">
          <div className={`grid h-full items-stretch gap-6 ${Data.selectedRow ? 'md:grid-cols-[1fr_400px]' : ''}`}>
            <div className={`${Data.selectedRow ? 'flex' : 'hidden'} flex-col space-y-4 md:order-2`}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between">Detalle de la orden de compra
                    <Button variant='destructive' onClick={closeDetalle}>Cerrar</Button>
                  </CardTitle>
                  <CardDescription></CardDescription>
                  <CardContent>
                    <ScrollArea className="h-[500px] mb-3">
                      <ul className="">
                        {printDetalle()}
                      </ul>
                    </ScrollArea>
                  </CardContent>
                </CardHeader>
              </Card>
            </div>
            <div className="md:order-1">
              <DataTable
                columns={columns}
                data={Data.ocData}
                onRowClick={selectedRow}
              />
            </div>
          </div>
        </div>

      )}
    </div>
  )
}
