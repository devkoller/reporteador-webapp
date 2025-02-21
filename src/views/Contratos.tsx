import { Layout } from '@/components/auth'
import { useFetch } from '@/hooks'
import { useState, useEffect } from "react"
import { Spinner } from '@/components/ui/spinner'
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { utils } from '@/utils'
import { FormContratos } from '@/components/Contratos'
import { useNavigate } from 'react-router-dom'



export const Contratos = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const [Data, setData] = useState({
    contratos: [],
    SheetTitle: '',
  })




  const { response: contratos, loading } = useFetch({
    url: "/api/contratos",
  })

  const handleSheet = () => {
    setOpen(prev => !prev)
  }

  const print = () => {
    return Data.contratos.map((item: any, index: number) => {
      return (
        <Card key={index} className='cursor-pointer' onDoubleClick={() => {
          navigate(`/contratos/${item.id}`)
        }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {item.nombre}
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {utils.formatCurrency(item.total)}
            </div>
            <p className="text-xs text-muted-foreground">
              {item?.catCliente?.nombre || "Sin cliente"}
            </p>
          </CardContent>
        </Card>
      )
    })
  }

  const update = () => { }


  useEffect(() => {
    if (contratos) {
      const data = contratos.data.map((item: any) => {
        let total = 0
        if (item.contratosDetalles.length > 0) {
          item.contratosDetalles.map((ele: any) => {
            total += parseFloat(ele.precioVenta)
          })
        }

        return {
          ...item,
          total: total.toFixed(2),
        }
      })

      setData(prev => ({
        ...prev,
        contratos: data,
      }))
    }
  }, [contratos])

  return (
    <Layout>
      <PageHeader>
        <PageHeaderHeading>Contratos</PageHeaderHeading>
        <PageHeaderDescription>
          Aquí puedes ver, crear y editar los contratos del sistema
        </PageHeaderDescription>
        <PageActions>
          <Button size="sm" onClick={handleSheet}>
            Nuevo contrato
          </Button>
        </PageActions>
      </PageHeader>

      {loading && (
        <Spinner />
      )}

      {!loading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5">
          {print()}
        </div>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              Nuevo Contrato
            </SheetTitle>
            <SheetDescription>
            </SheetDescription>
          </SheetHeader>
          <FormContratos closeSheet={handleSheet} update={update} />
        </SheetContent>
      </Sheet>

    </Layout>
  )
}
