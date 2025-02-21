import { useEffect, useState } from 'react'
import { Layout } from '@/components/auth'
import { DataTable } from '@/components/utils'
import { getColumns, ClientType, FormClient } from '@/components/Clients'
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
import { FaSpinner } from 'react-icons/fa'

type StateTypeof = {
  clients: ClientType[]
  selectedClient: ClientType | null
  SheetTitle: string
}


export const Clientes = () => {
  const { execute } = usePost()
  const [open, setOpen] = useState(false)
  const [Data, setData] = useState<StateTypeof>({
    clients: [],
    selectedClient: null,
    SheetTitle: '',
  })

  const { response: clientsData, loading } = useFetch({
    url: "/api/catalogue/client",
  })

  const handleEdit = (client: ClientType) => {
    setOpen(prev => !prev)
    setData(prev => ({
      ...prev,
      selectedClient: client,
      SheetTitle: 'Editar Cliente',
    }))
  }

  const handleNewClient = () => {
    setOpen(prev => !prev)
    setData(prev => ({
      ...prev,
      selectedClient: null,
      SheetTitle: 'Nuevo Cliente',
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
        setData(prev => ({
          ...prev,
          clients: res.data
        }))
      }
    })
  }

  const columns = getColumns(handleEdit)

  useEffect(() => {
    if (clientsData) {
      setData(prev => ({
        ...prev,
        clients: clientsData.data
      }))
    }
  }, [clientsData])
  return (
    <Layout>
      <PageHeader>
        <PageHeaderHeading>Clientes</PageHeaderHeading>
        <PageHeaderDescription>
          Aquí puedes ver, crear y editar los clientes del sistema
        </PageHeaderDescription>
        <PageActions>
          <Button onClick={handleNewClient}>
            Nuevo cliente
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
          data={Data.clients}
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
          <FormClient
            selectedClient={Data.selectedClient}
            update={update}
            closeSheet={handleSheet}
          />

        </SheetContent>
      </Sheet>
    </Layout>
  )
}
