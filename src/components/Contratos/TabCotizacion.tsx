import { ContratoType, CotizacionesColumns, CotizacionesType, CotizacionDetalleType } from "./Columns"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'
import { Cotizaciones } from './Cotizaciones'
import { useFetch } from '@/hooks'
import { Spinner } from '@/components/ui/spinner'
import { DataTable } from '@/components/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardHeader, CardTitle, CardFooter, CardDescription, CardContent } from '@/components/ui/card'
import { utils } from '@/utils'



type Props = {
  contrato: ContratoType | null
}

type StateTypeof = {
  cotizacion: boolean
  selectedCotizacion: CotizacionesType | null
  cotizacionesData: CotizacionesType[]
  selectedRow: CotizacionesType | null
}

export const TabCotizacion = ({ contrato }: Props) => {
  const [Data, setData] = useState<StateTypeof>({
    cotizacion: false,
    selectedCotizacion: null,
    cotizacionesData: [],
    selectedRow: null
  })

  const { response: cotizaData, loading } = useFetch({
    url: "/api/catalogue/cotizacionArticulo",
    qs: {
      contratoId: contrato?.id
    }
  })




  const handleNewCotizacion = () => {
    setData(prev => ({
      ...prev,
      cotizacion: !prev.cotizacion,
    }))
  }

  const closeCotizacion = () => {
    setData(prev => ({
      ...prev,
      cotizacion: !prev.cotizacion
    }))
  }

  const closeDetalle = () => {
    setData(prev => ({
      ...prev,
      selectedRow: null
    }))
  }

  const selectedRow = (row: CotizacionesType) => {
    setData(prev => ({ ...prev, selectedRow: row }))
  }

  const printDetalle = () => {
    if (!Data.selectedRow) return
    if (!Data.selectedRow.cotizacionDetalle) return

    return Data.selectedRow?.cotizacionDetalle.map((detalle: CotizacionDetalleType, index) => {
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
                  {parseInt(detalle.cantidad) || 0}
                </p>

              </div>
              <div className="flex flex-col">
                <span className="w-full p-2 bg-slate-100">Precio S/Imp</span>
                <p className="p-2">
                  {utils.formatCurrency(parseFloat(detalle.precio))}
                </p>
              </div>

            </div>
          </div>
        </li>
      )
    })
  }

  useEffect(() => {
    if (cotizaData) {
      const cotizaciones = cotizaData.data.map((cotizacion: CotizacionesType) => {
        let total = 0
        let totalArticulos = 0
        if (cotizacion.cotizacionDetalle) {

          cotizacion.cotizacionDetalle.forEach((detalle: CotizacionDetalleType) => {
            total += parseFloat(detalle.precio) || 0
            totalArticulos += parseInt(detalle.cantidad) || 0
          })
        }
        return {
          ...cotizacion,
          contador: cotizacion?.cotizacionDetalle?.length || 0,
          totalArticulos: totalArticulos,
          total: utils.formatCurrency(parseFloat(total.toFixed(2)))
        }
      })
      setData(prev => ({
        ...prev,
        cotizacionesData: cotizaciones
      }))
    }
  }, [cotizaData])

  if (loading) {
    return (
      <Spinner />
    )
  }


  return (
    <div>
      {!Data.cotizacion && (
        <PageHeader>
          <PageHeaderHeading>Cotizaciones</PageHeaderHeading>
          <PageHeaderDescription>
            Aquí puedes ver y crear las cotizaciones para este contrato.
            Esto es necesario para poder generar las ordenes de compra.
          </PageHeaderDescription>
          <PageActions>
            <Button size="sm" onClick={handleNewCotizacion}>
              Nueva cotización
            </Button>
          </PageActions>
        </PageHeader>
      )}

      {Data.cotizacion && (
        <Cotizaciones
          contrato={contrato}
          close={closeCotizacion}
        />
      )}


      {!Data.cotizacion && (
        <div className="h-full py-2">
          <div className={`grid h-full items-stretch gap-6 ${Data.selectedRow ? 'md:grid-cols-[1fr_400px]' : ''}`}>
            <div className={`${Data.selectedRow ? 'flex' : 'hidden'} flex-col space-y-4 md:order-2`}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between">Detalle de la cotización
                    <Button variant='destructive' onClick={closeDetalle}>Cerrar</Button>
                  </CardTitle>
                  <CardDescription></CardDescription>
                  <CardContent>
                    <ScrollArea className="h-[500px] mb-3">
                      <ul className="">
                        {printDetalle()}
                      </ul>
                    </ScrollArea>

                    <CardFooter>


                    </CardFooter>

                  </CardContent>
                </CardHeader>
              </Card>
            </div>
            <div className="md:order-1">
              <DataTable
                data={Data.cotizacionesData}
                columns={CotizacionesColumns}
                onRowClick={selectedRow}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
