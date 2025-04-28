import { Layout } from '@/components/auth'
import { useEffect, useState } from 'react'
import { DataTable } from '@/components/utils'
import { getColumns } from '@/components/Proveedores'
import { useFetch } from '@/hooks'
import { Link, useNavigate } from 'react-router-dom'
import { Plus } from "lucide-react"
import { ProveedorType } from '@/types'

import { Button } from "@/components/ui/button"
import { FaSpinner } from "react-icons/fa";

type StateTypeof = {
  proveedores: ProveedorType[]
  selectedProveedores: ProveedorType | null
  SheetTitle: string
  SheetType: number
}

export const Proveedores = () => {
  const navigate = useNavigate()
  const [Data, setData] = useState<StateTypeof>({
    proveedores: [],
    selectedProveedores: null,
    SheetTitle: '',
    SheetType: 1
  })

  const { response: proveedorData, loading } = useFetch({
    url: "/provider/read/all",
  })

  const handleEdit = (proveedor: ProveedorType) => {
    navigate(`/provider/${proveedor.id}/edit`)
  }

  const goToDetails = (proveedor: ProveedorType) => {
    navigate(`/provider/${proveedor.id}`)
  }

  const columns = getColumns({ handleEdit, goToDetails })

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
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Administrador de proveedores</h2>
          <div className="flex items-center space-x-2">
            <Button asChild>
              <Link to="/provider/new">
                <Plus className="mr-2 h-4 w-4" />
                Agregar proveedor
              </Link>
            </Button>
          </div>
        </div>

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
      </div>
    </Layout>
  )
}
