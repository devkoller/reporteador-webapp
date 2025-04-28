import { Layout } from '@/components/auth'

import { Link, useNavigate } from "react-router-dom"
import { Plus, } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { useState, useEffect } from 'react'
import { useFetch } from '@/hooks'
import { Spinner } from '@/components/ui/spinner'
import { EnterpriseType } from '@/types'
import { getColumnsDetails } from '@/components/enterprise/columns'
import { DataTable } from '@/components/utils'



export const Enterprise = () => {
  const [enterprises, setEnterprises] = useState<EnterpriseType[]>([])
  const navigate = useNavigate()
  const { response: enterprisesData, loading } = useFetch({
    url: "/enterprise/read/all",
  })

  const goToEdit = (row: EnterpriseType) => {
    navigate(`/enterprise/${row.id}/edit`)
  }

  const goToDetails = (row: EnterpriseType) => {
    navigate(`/enterprise/${row.id}`)
  }


  const columns = getColumnsDetails({ goToDetails, goToEdit })

  useEffect(() => {
    if (enterprisesData) {
      setEnterprises(enterprisesData.data)
    }
  }, [enterprisesData])


  if (loading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Administrador de empresas</h2>
            <div className="flex items-center space-x-2">
              <Button asChild>
                <Link to="/enterprise/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar empresa
                </Link>
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Empresas</CardTitle>
              <CardDescription>
                Administra todas tus empresas desde un solo lugar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={enterprises}
                columns={columns}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout >
  )
}
