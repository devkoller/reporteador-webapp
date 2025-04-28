import { Layout } from "@/components/auth"

import { useFetch } from "@/hooks"
import { useState, useEffect, useContext } from "react"
import { UserConfigContext } from "@/context/UserConfigContext"
import { Spinner } from "@/components/ui/spinner"


import { OrderForm } from "@/components/orders"


export const CreateSellingOrder = () => {
  const [clients, setClients] = useState([])
  const { config, loading: loadingUserConfig } = useContext(UserConfigContext)


  const { response: clientsData, loading: loadingProducts } = useFetch({
    url: "/data/read/clients",
    qs: {
      enterpriseID: config?.enterprise?.id,
    },
  })

  useEffect(() => {
    if (clientsData) {
      setClients(clientsData.data)
    }
  }, [clientsData])

  if (loadingUserConfig || loadingProducts) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      </Layout>
    )
  }
  return (
    <Layout>
      <OrderForm
        type="sales"
        entities={clients}
      />
    </Layout>
  )
}
