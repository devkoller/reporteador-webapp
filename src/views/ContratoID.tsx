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
}



export const ContratoID = () => {
  const { id } = useParams()
  const { execute } = usePost()
  const navigate = useNavigate()
  const [Data, setData] = useState<StateTypeof>({
    contrato: null,
  })




  const { response: contrato, loading } = useFetch({
    url: `/api/contratos`,
    qs: {
      id: id
    }
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
      content: <TabContrato contrato={Data.contrato} />
    },
    {
      title: 'Cliente',
      value: 'client',
      content: <TabCliente contrato={Data.contrato} />
    },
    {
      title: 'Salida de Articulos',
      value: 'articles',
      content: <TabArticulosContrato contrato={Data.contrato} update={updateContrato} />
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


  if (loading) {
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
