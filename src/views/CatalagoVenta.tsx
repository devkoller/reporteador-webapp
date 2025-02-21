import { Layout } from '@/components/auth'
import { DataTable } from '@/components/utils'
import { useEffect, useState } from 'react'
import { getColumns, AritculosType, FormCatalago } from '@/components/CatalagoVenta'
import { useFetch, usePost } from '@/hooks'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { FaSpinner } from "react-icons/fa";


type StateTypeof = {
  articulos: AritculosType[]
  selectedArticulo: AritculosType | null
  SheetTitle: string
}



export const CatalagoVenta = () => {
  const { execute } = usePost()
  const [open, setOpen] = useState(false)
  const [Data, setData] = useState<StateTypeof>({
    articulos: [],
    selectedArticulo: null,
    SheetTitle: '',
  })

  const { response: articulosData, loading } = useFetch({
    url: "/api/catalogue/article",
  })

  const handleEdit = (articulo: AritculosType) => {
    setOpen(prev => !prev)
    setData(prev => ({
      ...prev,
      selectedArticulo: articulo,
      SheetTitle: 'Editar Artículo',
    }))
  }

  const handleNewArticulo = () => {
    setOpen(prev => !prev)
    // setData(prev => ({
    //   ...prev,
    //   selectedClient: null,
    //   SheetTitle: 'Nuevo Artículo',
    // }))
  }

  const handleSheet = () => {
    setOpen(prev => !prev)
  }

  const columns = getColumns(handleEdit)

  const update = () => {
    execute({
      url: "/api/catalogue/article",
      method: "get",
    }).then((res) => {
      if (res.status === 200) {
        setData(prev => ({
          ...prev,
          articulos: res.data
        }))
      }
    })
  }


  useEffect(() => {
    if (articulosData) {
      setData(prev => ({
        ...prev,
        articulos: articulosData.data
      }))
    }
  }, [articulosData])
  return (
    <Layout>
      <PageHeader>
        <PageHeaderHeading>Artículos</PageHeaderHeading>
        <PageHeaderDescription>
          Aquí puedes ver, crear y editar los artículos del sistema
        </PageHeaderDescription>
        <PageActions>
          <Button onClick={handleNewArticulo}>
            Nuevo artículo
          </Button>
        </PageActions>
      </PageHeader>
      {loading && (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin h-8 w-8" />
        </div>
      )}
      {!loading &&
        <DataTable
          data={Data.articulos}
          columns={columns}
        />
      }
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className=''>
          <SheetHeader>
            <SheetTitle>
              {Data.SheetTitle}
            </SheetTitle>
            <SheetDescription>
            </SheetDescription>
          </SheetHeader>
          <FormCatalago
            selectedArticulo={Data.selectedArticulo}
            update={update}
            closeSheet={handleSheet}
          />
        </SheetContent>
      </Sheet>
    </Layout>
  )
}
