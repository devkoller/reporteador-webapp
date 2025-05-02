import { useState, useEffect } from 'react'
import { ContratoType, catArticuloType, getCotizaColumns, ArtiCotizacionType } from "./Columns"
import { usePost, useFetch } from "@/hooks"
import { DataTable } from '@/components/utils'
import { PrintProviders } from './PrintProviders'
import { ProveedorType } from '@/types'
import { Spinner } from '@/components/ui/spinner'
import { ArticlesCotiza } from './ArticlesCotiza'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  PageActions,
} from "@/components/ui/page-header"
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'



type Props = {
  contrato: ContratoType | null
  close: () => void
}

type StateTypeof = {
  providers: ProveedorType[]
  articles: catArticuloType[]
  selectedProvider: ProveedorType | null
  articlesSelected: ArtiCotizacionType[]
}


export const Cotizaciones = ({ contrato, close }: Props) => {
  const { toast } = useToast()
  const { execute, loading: loadingExecute } = usePost()
  const [Data, setData] = useState<StateTypeof>({
    providers: [],
    articles: [],
    articlesSelected: [],
    selectedProvider: null
  })

  const { response: providers, loading: providerLoading } = useFetch({
    url: "/api/catalogue/provider",
  })



  const handleSelectProvider = (provider: ProveedorType) => {
    setData(prev => ({ ...prev, selectedProvider: provider }))
  }

  const onSubmit = () => {
    if (!Data.selectedProvider) {
      toast({
        title: 'Selecciona un proveedor',
      })
      return
    }

    if (Data.articlesSelected.length === 0) {
      toast({
        title: 'Selecciona al menos un artículo',
      })
    }

    let articulos = Data.articlesSelected.map((item) => {
      return {
        articuloId: item.id,
        cantidad: item.cantidad,
        precio: item.precio,
      }
    })

    let body = {
      proveedorId: Data.selectedProvider.id,
      empresaId: 1,
      contratoId: contrato?.id,
      articulos: JSON.stringify(articulos),
    }

    execute({
      url: "/api/catalogue/cotizacionArticulo",
      body: body,
    }).then((res) => {
      if (res.status === 200) {
        toast({
          title: 'Cotización guardada',
          description: 'La cotización ha sido guardada correctamente'
        })
        close()
      }
    })

  }


  const selectedRow = (row: ArtiCotizacionType) => {
    let exist = Data.articlesSelected.find((item) => item.id === row.id)
    if (exist) {
      let newArticles = Data.articlesSelected.filter((item) => item.id !== row.id)
      setData(prev => ({ ...prev, articlesSelected: [...newArticles, row] }))
    } else {
      setData(prev => ({ ...prev, articlesSelected: [...prev.articlesSelected, row] }))

    }
  }

  const handleDelete = (row: ArtiCotizacionType) => {
    setData(prev => ({ ...prev, articlesSelected: prev.articlesSelected.filter((item) => item.id !== row.id) }))
  }

  const CotizacionColumns = getCotizaColumns(handleDelete)
  useEffect(() => {
    if (providers) {
      setData((prev) => ({ ...prev, providers: providers.data }))
    }
  }, [providers])



  if (providerLoading) return <Spinner />

  return (
    <div>
      {!Data.selectedProvider && (
        <PrintProviders providers={Data.providers} selectProvider={handleSelectProvider} close={close} />
      )}

      {Data.selectedProvider && (
        <>
          <PageHeader>
            <PageHeaderHeading>{Data.selectedProvider?.nombre}</PageHeaderHeading>
            <PageHeaderDescription className='flex flex-col'>

              <span>
                {Data.selectedProvider?.rfc} {Data.selectedProvider?.regimenFiscal}
              </span>
              <span>
                C. {Data.selectedProvider?.direccionCalle}
              </span>
              <span>
                {Data.selectedProvider?.direccionCiudad}
              </span>
              <span>
                C.P. {Data.selectedProvider?.direccionCP} Teléfono: {Data.selectedProvider?.telefono}
              </span>
            </PageHeaderDescription>
            <PageActions>
              <Button variant='outline' onClick={() => setData((prev) => ({ ...prev, selectedProvider: null }))}>
                Seleccionar otro proveedor
              </Button>
              <Button disabled>
                Cargar excel de productos
              </Button>
              <Button variant='secondary' disabled>
                Seleccionar PDF de cotización
              </Button>
              <Button onClick={onSubmit} disabled={loadingExecute}>
                Guardar cotización
              </Button>
            </PageActions>
          </PageHeader>

          <div className='grid gap-4 md:grid-cols-2 mt-5'>
            <ArticlesCotiza selectedRow={selectedRow} />

            <div>
              <h3 className='text-lg font-semibold'>Cotizaciones</h3>
              <div className='grid gap-4 mt-5'>
                <DataTable
                  data={Data.articlesSelected}
                  columns={CotizacionColumns}
                />
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  )
}
