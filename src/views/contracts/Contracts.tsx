import { Layout, } from '@/components/auth'

import { useState, useEffect, useContext } from "react"
import { UserConfigContext } from '@/context/UserConfigContext';

import { Link } from "react-router-dom"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useFetch } from '@/hooks'
import { ContractType } from "@/types"
import { Columns } from "@/components/contracts"
import { DataTable } from '@/components/utils';
import { Spinner } from '@/components/ui/spinner';


interface StateTypeof {
  contracts: ContractType[]
}

export const Contracts = () => {

  const [Data, setData] = useState<StateTypeof>({
    contracts: [],
  })

  const { config } = useContext(UserConfigContext)

  const { response: contractsD, loading: loadingContracts } = useFetch({
    url: "/contract/read/all",
    qs: {
      enterpriseID: config?.enterprise?.id,
    },
  })



  useEffect(() => {
    if (contractsD) {
      setData(prev => ({
        ...prev,
        contracts: contractsD.data
      }))
    }
  }, [contractsD])

  if (loadingContracts) {
    return (
      <Layout>
        <div className="flex flex-col">
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Administrador de contratos</h2>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Contratos</CardTitle>
                <CardDescription>
                  Administra todos los contratos de tu empresa.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Spinner />
              </CardContent>
            </Card>

          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Administrador de contratos</h2>
            <div className="flex items-center space-x-2">
              <Button asChild>
                <Link to="/contract/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo contrato
                </Link>
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Contratos</CardTitle>
              <CardDescription>
                Administra todos los contratos de tu empresa.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <DataTable
                  columns={Columns}
                  data={Data.contracts}
                />
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </Layout>
  )
}
