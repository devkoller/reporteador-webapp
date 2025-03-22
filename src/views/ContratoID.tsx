import { Layout } from '@/components/auth'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { useFetch, usePost } from '@/hooks'
import { ContratoType, TabContrato, TabCotizacion, TabCliente, TabOC, TabArticulosContrato, TabCompArticles } from '@/components/Contratos'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


type StateTypeof = {
  contrato: ContratoType | null
  contratoDetalle: any[]
  chart1: chart1Type[]
  total: number
}

type chart1Type = {
  type: string
  value: number,
  fill: string
}



export const ContratoID = () => {
  const { id } = useParams()
  const { execute } = usePost()
  const navigate = useNavigate()
  const [Data, setData] = useState<StateTypeof>({
    contrato: null,
    contratoDetalle: [],
    chart1: [],
    total: 0
  })




  const { response: contrato, loading } = useFetch({
    url: `/api/contratos`,
    qs: {
      id: id
    }
  })

  const { response: contratoDetalle, loading: loadingDetalle } = useFetch({
    url: `/api/contratos/detalle/${id}`,
  })

  const updateContrato = () => {
    execute({
      url: `/api/contratos`,
      qs: {
        id: id
      },
      method: 'get',
    }).then((res: any) => {
      if (res.status === 200) {
        setData(prev => ({
          ...prev,
          contrato: res.data[0]
        }))
      }
    })
  }


  const tabs = [
    {
      title: 'Contrato',
      value: 'contract',
      content: <TabContrato contrato={Data.contrato} chart1={Data.chart1} total={Data.total} />
    },
    {
      title: 'Cliente',
      value: 'client',
      content: <TabCliente contrato={Data.contrato} />
    },
    {
      title: 'Salida de Articulos',
      value: 'articles',
      content: <TabArticulosContrato contrato={Data.contrato} contratoDetalle={Data.contratoDetalle} update={updateContrato} />
    },
    {
      title: 'Artículos compuestos',
      value: 'articlesComp',
      content: <TabCompArticles contrato={Data.contrato} update={updateContrato} />
    },
    {
      title: 'Cotizaciones',
      value: 'quotations',
      content: <TabCotizacion contrato={Data.contrato} />
    },
    {
      title: 'Ordenes de Compra',
      value: 'purchaseOrders',
      content: <TabOC contrato={Data.contrato} />
    }
  ]

  const printTabs = () => {
    return tabs.map((tab, index) => {
      return (
        <TabsTrigger key={index} value={tab.value}>{tab.title}</TabsTrigger>
      )
    })
  }

  const printContent = () => {
    return tabs.map((tab, index) => {
      return (
        <TabsContent key={index} value={tab.value}>{tab.content}</TabsContent>
      )
    })
  }






  useEffect(() => {
    if (contrato) {
      console.log(contrato.data[0])
      setData(prev => ({
        ...prev,
        contrato: contrato.data[0]
      }))
    }
  }, [contrato])

  useEffect(() => {
    if (contratoDetalle) {
      let total = 0
      let compra = 0
      let ganancias = 0
      contratoDetalle.data.map((item: any) => {
        total += parseFloat(item.precioVenta)
        compra += parseFloat(item.total)
        ganancias += parseFloat(item.precioVenta) - parseFloat(item.total)

      })

      let chart1: chart1Type[] = [
        { type: 'buying', value: compra, fill: "var(--color-buying)" },
        { type: 'gain', value: ganancias, fill: "var(--color-gain)" },
      ]


      setData(prev => ({
        ...prev,
        contratoDetalle: contratoDetalle.data,
        chart1: chart1,
        total: total
      }))
    }
  }, [contratoDetalle])


  if (loading || loadingDetalle) {
    return <Layout><Spinner /></Layout>
  }

  if (!Data.contrato) {
    return <Layout>
      <h1>Contrato no encontrado</h1>
      <Button onClick={() => navigate('/contratos')}>Regresar</Button>
    </Layout>
  }

  return (
    <Layout>
      <Tabs defaultValue="contract" className="space-y-4">
        <TabsList>
          {printTabs()}
        </TabsList>
        {printContent()}
      </Tabs>
    </Layout>
  )
}
