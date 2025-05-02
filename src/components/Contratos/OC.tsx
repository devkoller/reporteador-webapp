import { useState, useEffect } from 'react'
import {
  ContratoType,
  catArticuloType,
  CotizacionDetalleType,
  CotizacionesType,
} from "./Columns"
import { usePost, useFetch } from "@/hooks"
import { PrintProviders } from './PrintProviders'
import { ProveedorType } from '@/types'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  PageActions,
} from "@/components/ui/page-header"
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { utils } from '@/utils'
import { ArticlesOC } from './ArticlesOC'
import { Spinner } from '@/components/ui/spinner'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { FormInput } from '@/components/Form'
import { FormDatePicker } from '@/components/Form/FormDatePicker'

const formSchema = z.object({
  pedidoId: z.string({
    message: "El ID pedido es requerido",
  }),
  condicionEntrega: z.string({
    message: "La condición de entrega es requerida",
  }),
  fechaEntrega: z.date({
    message: "La fecha de entrega es requerida",
  }),
  noOrden: z.string({
    message: "El número de orden es requerido",
  }),
})


type Props = {
  contrato: ContratoType | null
  close: () => void
  update: () => void
}

type StateTypeof = {
  providers: ProveedorType[]
  selectedProvider: ProveedorType | null
  articles: catArticuloType[]
  cotizaciones: CotizacionesType[]
  selectedCotizacion: CotizacionesType | null
}


export const OC = ({ contrato, close, update }: Props) => {
  const { toast } = useToast()
  const { execute, loading: loadingExecute } = usePost()
  const [Data, setData] = useState<StateTypeof>({
    providers: [],
    cotizaciones: [],
    articles: [],
    selectedProvider: null,
    selectedCotizacion: null
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pedidoId: undefined,
      condicionEntrega: undefined,
      fechaEntrega: undefined,
      noOrden: undefined,
    },
  })

  const { response: providers, loading: providerLoading } = useFetch({
    url: "/api/catalogue/cotizacionArticulo",
    qs: {
      contratoId: contrato?.id
    }
  })

  const handleSelectProvider = (provider: ProveedorType) => {

    let item = Data.cotizaciones.find((item) => item.proveedorId === provider.id)

    if (item) {
      setData(prev => ({ ...prev, selectedProvider: provider, selectedCotizacion: item }))
    } else {
      toast({
        title: 'No hay cotizaciones',
        description: 'No hay cotizaciones para este proveedor'
      })
    }
  }


  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!Data.selectedProvider) {
      toast({
        title: 'Selecciona un proveedor',
      })
      return
    }

    if (!Data.selectedCotizacion) {
      toast({
        title: 'Selecciona un proveedor',
      })
      return
    }

    if (Data.selectedCotizacion?.cotizacionDetalle?.length === 0) {
      toast({
        title: 'No hay articulos en la orden',
      })
    }

    let articulos: any = []

    Data!.selectedCotizacion!.cotizacionDetalle!.map((item) => {
      if (parseInt(item.cantidad) === 0) return
      const cleanString = item.precio.replace(/[^0-9.-]+/g, "");

      articulos.push({
        articuloId: item.articuloId,
        cantidad: item.cantidad,
        precio: cleanString,
      })
    })

    if (articulos.length === 0) {
      toast({
        title: 'No hay articulos en la orden',
      })
      return
    }

    let body = {
      ...values,
      pedidoId: parseInt(values.pedidoId),
      proveedorId: Data.selectedProvider.id,
      empresaId: 1,
      contratoId: contrato?.id,
      articulos: JSON.stringify(articulos),

    }

    execute({
      url: "/api/orders/purchaseOrder",
      body: body,
    }).then((res) => {
      if (res.status === 200) {
        toast({
          title: 'Cotización guardada',
          description: 'La cotización ha sido guardada correctamente'
        })
        update()
        close()
      } else {
        toast({
          title: 'Error',
          description: 'Hubo un error al guardar la orden de compra'
        })
      }
    })

  }





  useEffect(() => {
    if (providers) {

      let provis: ProveedorType[] = []

      let provs = providers.data.reduce((acc: CotizacionesType[], item: CotizacionesType) => {
        let exist = acc.find((i) => i.proveedorId === item.proveedorId)

        if (exist) {
          let newProv = acc.filter((i) => i.proveedorId !== item.proveedorId)

          let existsDetalle = exist?.cotizacionDetalle ? exist.cotizacionDetalle : []
          let itemDetalle = item.cotizacionDetalle ? item.cotizacionDetalle : []

          return [...newProv, { ...exist, cotizacionDetalle: [...existsDetalle, ...itemDetalle] }]
        } else {
          return [...acc, item]
        }
      }, [])

      let prov = provs.map((item: CotizacionesType) => {

        if (item.proveedor) {
          provis.push(item.proveedor)
        }

        let order = item.cotizacionDetalle ? item.cotizacionDetalle.sort((a: CotizacionDetalleType, b: CotizacionDetalleType) => (b.createdAt > a.createdAt ? -1 : 1)) : []

        let filtered = order.reduce((acc: CotizacionDetalleType[], item: CotizacionDetalleType) => {
          let exist = acc.find((i) => i.articuloId === item.articuloId)
          if (exist) {
            let newProv = acc.filter((i) => i.articuloId !== item.articuloId)
            return [...newProv, { ...exist, cantidad: exist.cantidad + item.cantidad }]
          } else {
            return [...acc, item]
          }
        }
          , [])

        let format = filtered.map((item) => {
          let precio = parseFloat(item.precio).toFixed(2)
          let cantidad = parseInt(item.cantidad) || 0
          return {
            ...item,
            nombre: item.articulo?.nombre,
            cantidad: cantidad,
            precio: utils.formatCurrency(parseFloat(precio)),
            total: (parseFloat(precio) * cantidad).toFixed(2)
          }
        })

        return {
          ...item,
          cotizacionDetalle: format
        }


      })
      setData((prev) => ({ ...prev, providers: provis, cotizaciones: prov }))
    }
  }, [providers])

  if (providerLoading) {
    return <Spinner />
  }

  return (
    <div>
      {!Data.selectedProvider && (
        <PrintProviders providers={Data.providers} selectProvider={handleSelectProvider} close={close} />
      )}


      {Data.selectedProvider && (
        <>
          <PageHeader>
            <PageHeaderHeading>{Data.selectedCotizacion?.proveedor?.nombre}</PageHeaderHeading>
            <PageHeaderDescription className='flex flex-col'>

              <span>
                {Data.selectedCotizacion?.proveedor?.rfc} {Data.selectedCotizacion?.proveedor?.regimenFiscal}
              </span>
              <span>
                C. {Data.selectedCotizacion?.proveedor?.direccionCalle}
              </span>
              <span>
                {Data.selectedCotizacion?.proveedor?.direccionCiudad}
              </span>
              <span>
                C.P. {Data.selectedCotizacion?.proveedor?.direccionCP} Teléfono: {Data.selectedCotizacion?.proveedor?.telefono}
              </span>
            </PageHeaderDescription>
            <PageActions>
              <Button variant='outline' onClick={() => setData((prev) => ({ ...prev, selectedProvider: null }))}>
                Seleccionar otro proveedor
              </Button>
            </PageActions>
          </PageHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3 items-end ">
              <FormInput
                label="Condiciones de entrega"
                name="condicionEntrega"
                control={form.control}
                required
              />
              <FormDatePicker
                label="Fecha de entrega"
                name="fechaEntrega"
                control={form.control}
                required
              />
              <div className="">

              </div>
              <Button type="submit" disabled={loadingExecute}>
                Generar orden de compra
              </Button>
            </form>
          </Form>

          <div className='mt-5'>
            <ArticlesOC cotizacionDetalle={Data.selectedCotizacion?.cotizacionDetalle || []} setData={setData} />
            {/* <div>
              <h3 className='text-lg font-semibold'>Artículos</h3>
              <div className=''>
                <DataTable
                  data={Data.selectedCotizacion?.cotizacionDetalle || []}
                  columns={OCDetalleColumns}
                />
              </div>
            </div> */}
          </div>
        </>
      )}
    </div>
  )
}
