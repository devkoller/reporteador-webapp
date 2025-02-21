import { Layout } from '@/components/auth'
import { useFetch, usePost } from '@/hooks'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { DataTable } from '@/components/utils'

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'
import { FaSpinner } from "react-icons/fa";

import { getColumns, AlmacenType, FormAlamacenes } from '@/components/Alamacenes'

type StateTypeof = {
  almacenes: AlmacenType[]
  selectedAlmacen: AlmacenType | null
  SheetTitle: string
  SheetType: number
}


export const Almacenes = () => {
  const { execute } = usePost()
  const [open, setOpen] = useState(false)
  const [Data, setData] = useState<StateTypeof>({
    almacenes: [],
    selectedAlmacen: null,
    SheetTitle: '',
    SheetType: 1
  })

  const { response: almacenesData, loading } = useFetch({
    url: "/api/catalogue/warehouse",
  })


  const handleNewAlmacen = () => {
    setOpen(prev => !prev)
    setData(prev => ({
      ...prev,
      selectedClient: null,
      SheetTitle: 'Nuevo Almacén',
    }))
  }
  const handleEdit = (almacen: AlmacenType) => {
    setOpen(prev => !prev)
    setData(prev => ({
      ...prev,
      selectedAlmacen: almacen,
      SheetTitle: 'Editar Almacén',
    }))
  }


  const handleSheet = () => {
    setOpen(prev => !prev)
  }

  const columns = getColumns(handleEdit)

  const update = () => {
    execute({
      url: "/api/catalogue/warehouse",
      method: "get",
    }).then((res) => {
      if (res.status === 200) {
        setData(prev => ({
          ...prev,
          almacenes: res.data
        }))
      }
    })
  }


  useEffect(() => {
    if (almacenesData) {
      setData(prev => ({
        ...prev,
        almacenes: almacenesData.data
      }))
    }
  }, [almacenesData])
  return (
    <Layout>
      <PageHeader>
        <PageHeaderHeading>Almacenes</PageHeaderHeading>
        <PageHeaderDescription>
          Aquí puedes ver, crear y editar los almacenes del sistema
        </PageHeaderDescription>
        <PageActions>
          <Button onClick={handleNewAlmacen}>
            Nuevo almacén
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
          data={Data.almacenes}
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
          <FormAlamacenes
            selectedAlmacen={Data.selectedAlmacen}
            update={update}
            closeSheet={handleSheet}
          />

        </SheetContent>
      </Sheet>
    </Layout>
  )
}
