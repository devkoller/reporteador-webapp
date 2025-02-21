import { useState, useEffect } from 'react'
import { ContratoType, } from "./Columns"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormInput } from '@/components/Form'
import { ArtiCotizacionType, getCotizaColumns } from "./Columns"
import { useToast } from "@/hooks/use-toast"
import { useFetch, usePost } from "@/hooks"
import { Spinner } from '@/components/ui/spinner'
import { DataTable } from '@/components/utils'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header"
import { ListCompArti } from './ListCompArti'


const formSchema = z.object({
  nombre: z.string({
    message: "El nombre es requerido",
  }),
  cantidad: z.string({
    message: "La cantidad es requerida",
  }),
  preciocimp: z.string({
    message: "El total es requerido",
  }),
  venta: z.string({
    message: "El precio de venta es requerido",
  }),
})



type Props = {
  contrato: ContratoType | null
  update: () => void
}

type StateTypeof = {
  articles: ArtiCotizacionType[]
  compuestos: ArtiCotizacionType[]
}

export const TabCompArticles = ({ contrato, update }: Props) => {
  const { toast } = useToast()
  const { execute, loading: loadingPost } = usePost()
  const [Data, setData] = useState<StateTypeof>({
    articles: [],
    compuestos: [],
  })

  const { response: autoCompleteData, loading: loadingAuto } = useFetch({
    url: "/api/catalogue/articleCompose",
  })

  const { response: articulos, loading: loadingArti } = useFetch({
    url: "/api/inventory/inventory/get",
  })

  const updateArticulos = () => {
    execute({
      url: "/api/inventory/inventory/get",
      method: "get",
    }).then((res: any) => {
      if (res.status === 200) {
        let existencias: any = []
        res.data.map((item: any) => {
          if (parseInt(item.cantidad) > 0) {
            existencias.push({
              ...item.catArticulo,
              cantidad: parseInt(item.cantidad),
            })
          }
        })

        //filter articulos para quitar los articulos duplicados
        let articulosData = existencias.filter((item: any, index: number, self: any) =>
          index === self.findIndex((t: any) => (
            t.id === item.id
          ))
        )

        setData(prev => ({
          ...prev,
          articles: articulosData,
        }))
      }
    })
  }



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: undefined,
      cantidad: undefined,
      preciocimp: undefined,
      venta: undefined,
    },
  })

  const addItem = (row: ArtiCotizacionType) => {
    let exist = Data.compuestos.find((item: ArtiCotizacionType) => item.id === row.id)
    if (exist) {
      let newArticles = Data.compuestos.filter((item: ArtiCotizacionType) => item.id !== row.id)
      setData(prev => ({ ...prev, compuestos: [...newArticles, row] }))
    } else {
      setData(prev => ({ ...prev, compuestos: [...prev.compuestos, row] }))
    }
  }


  function onSubmit(values: z.infer<typeof formSchema>) {
    if (typeof parseInt(values.cantidad) !== "number") {
      toast({
        title: 'La cantidad debe ser un número',
      })
      return
    }

    if (typeof parseInt(values.venta) !== "number") {
      toast({
        title: 'El precio de venta debe ser un número',
      })
      return
    }


    if (Data.compuestos.length === 0) {
      toast({
        title: 'Agrega al menos un artículo',
      })
      return
    }
    let articulos = Data.compuestos.map((item) => {
      return {
        ...item,
        articuloId: item.id,
        preciosimp: parseFloat(item.precio),
      }
    })

    const body = {
      ...values,
      articulos: articulos,
      contratoId: contrato?.id,
      total: parseFloat(values.preciocimp) * parseInt(values.cantidad),
      type: 2,
    }


    execute({
      url: "/api/contratos/detalle",
      body,
    }).then((res) => {
      if (res.status === 200) {
        toast({
          title: 'Artículo compuesto guardado',
        })
        update()
        form.reset()
        setData(prev => ({
          ...prev,
          compuestos: [],
        }))
        updateArticulos()
      } else {
        toast({
          title: 'Error',
          description: 'El artículo no puede ser guardado',
        })
      }
    })
  }

  const deleteRow = (row: ArtiCotizacionType) => {
    setData(prev => ({ ...prev, compuestos: prev.compuestos.filter((item) => item.id !== row.id) }))
  }

  useEffect(() => {
    let total = 0
    Data.compuestos.map((item: ArtiCotizacionType) => {
      total += parseFloat(item.cantidad) * parseFloat(item.precio)
    })
    form.setValue('preciocimp', total.toFixed(2))

  }, [Data.compuestos])

  const CotizacionColumns = getCotizaColumns(deleteRow)
  useEffect(() => {
    if (articulos) {
      let existencias: any = []
      articulos.data.map((item: any) => {
        if (parseInt(item.cantidad) > 0) {
          existencias.push({
            ...item.catArticulo,
            cantidad: parseInt(item.cantidad),
          })
        }
      })

      //filter articulos para quitar los articulos duplicados
      let articulosData = existencias.filter((item: any, index: number, self: any) =>
        index === self.findIndex((t: any) => (
          t.id === item.id
        ))
      )

      setData(prev => ({
        ...prev,
        articles: articulosData,
      }))


    }
  }, [articulos])


  if (loadingAuto || loadingArti) return <Spinner />

  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Artículos compuestos</PageHeaderHeading>
        <PageHeaderDescription>
          Aquí puedes agregar artículos compuestos al contrato
        </PageHeaderDescription>
      </PageHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 items-end">
          <FormInput
            label="Nombre del compuesto"
            name="nombre"
            control={form.control}
            required
          />
          <FormInput
            label="Cantidad"
            name="cantidad"
            control={form.control}
            required
          />
          <FormInput
            label="Total del compuesto"
            name="preciocimp"
            control={form.control}
            required
            disabled
          />
          <FormInput
            label="Precio de venta"
            name="venta"
            control={form.control}
          />
          <Button type="submit" disabled={loadingPost}>
            Guardar
          </Button>
        </form>
      </Form>

      <div className='grid gap-4 md:grid-cols-2 mt-5'>
        <ListCompArti
          articulos={Data.articles}
          addItem={addItem}
        />

        <div>
          <h3 className='text-lg font-semibold'>Cotizaciones</h3>
          <div className='grid gap-4 mt-5'>
            <DataTable
              data={Data.compuestos}
              columns={CotizacionColumns}
            />
          </div>
        </div>

      </div>

    </div>
  )
}
