import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header"
import { ProveedorType } from '@/components/Proveedores'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useState, useEffect } from 'react'
import { Input } from "../ui/input"
import { Button } from "../ui/button"


type Props = {
  providers: ProveedorType[]
  selectProvider: (data: ProveedorType) => void
  close: () => void
}

type StateTypeof = {
  providers: ProveedorType[]
  filterProviders: ProveedorType[]
}

export const PrintProviders = ({ providers, selectProvider, close }: Props) => {
  const [Data, setData] = useState<StateTypeof>({
    providers: providers || [],
    filterProviders: providers || []
  })

  const printClients = () => {
    if (Data.filterProviders.length === 0) return

    return Data.filterProviders.map((provider: any, index: number) => {
      return (
        <Card key={index} className='cursor-pointer hover:bg-gray-50' onDoubleClick={() => {
          selectProvider(provider)

        }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {provider?.nombre}
            </CardTitle>
          </CardHeader>
        </Card>
      )
    })
  }

  useEffect(() => {
    setData(prev => ({ ...prev, providers: providers, filterProviders: providers }))
  }, [providers])

  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Selecciona al proveedor</PageHeaderHeading>
        <PageHeaderDescription>
        </PageHeaderDescription>
        <PageActions>
          <Button onClick={() => close()}>Cancelar</Button>
        </PageActions>
      </PageHeader>
      <div>
        <Input
          placeholder='Buscar proveedor'
          onChange={(e) => {
            const value = e.target.value
            const filter = Data.providers.filter((provider) => {
              return provider.nombre.toLowerCase().includes(value.toLowerCase())
            })
            setData(prev => ({ ...prev, filterProviders: filter }))
          }}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5">
        {printClients()}
      </div>
    </div>
  )
}
