import { Layout } from '@/components/auth'
import { useEffect, useState } from 'react'
import { DataTable } from '@/components/utils'
import { getColumns, ProveedorType, FormProveedores } from '@/components/Proveedores'
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
  proveedores: ProveedorType[]
  selectedProveedores: ProveedorType | null
  SheetTitle: string
  SheetType: number
}




export const Proveedores = () => {
  const { execute } = usePost()
  const [open, setOpen] = useState(false)
  const [Data, setData] = useState<StateTypeof>({
    proveedores: [],
    selectedProveedores: null,
    SheetTitle: '',
    SheetType: 1
  })

  const { response: proveedorData, loading } = useFetch({
    url: "/api/catalogue/provider",
  })

  const handleEdit = (proveedor: ProveedorType) => {
    setOpen(prev => !prev)
    setData(prev => ({
      ...prev,
      selectedProveedores: proveedor,
      SheetTitle: 'Editar Proveedor',
    }))
  }

  const handleNewProveedor = () => {
    setOpen(prev => !prev)
    setData(prev => ({
      ...prev,
      selectedProveedores: null,
      SheetTitle: 'Nuevo Proveedor',
    }))
  }

  const handleSheet = () => {
    setOpen(prev => !prev)
  }

  const update = () => {
    execute({
      url: "/user/list-users",
      method: "get",
    }).then((res) => {
      if (res.status === 200) {
        let data = res.data.map((user: { persona: { nombre: string; ape1: string; ape2?: string } }) => {
          return {
            ...user,
            nombre: `${user?.persona?.nombre} ${user?.persona?.ape1}`,
          }
        })
        setData(e => ({ ...e, users: data, }))
      }
    })
  }

  const columns = getColumns(handleEdit)

  useEffect(() => {
    if (proveedorData) {
      setData(prev => ({
        ...prev,
        proveedores: proveedorData.data
      }))
    }
  }, [proveedorData])
  return (
    <Layout>
      <PageHeader>
        <PageHeaderHeading>Proveedores</PageHeaderHeading>
        <PageHeaderDescription>
          Aquí puedes ver, crear y editar los proveedores del sistema
        </PageHeaderDescription>
        <PageActions>
          <Button onClick={handleNewProveedor}>
            Nuevo proveedor
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
          data={Data.proveedores}
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
          <FormProveedores
            selectedProveedor={Data.selectedProveedores}
            update={update}
            closeSheet={handleSheet}
          />

        </SheetContent>
      </Sheet>
    </Layout>
  )
}
