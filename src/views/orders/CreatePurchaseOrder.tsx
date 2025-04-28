import { Layout } from "@/components/auth"
import { useFetch } from "@/hooks"
import { useState, useEffect, useContext } from "react"
import { UserConfigContext } from "@/context/UserConfigContext"
import { Spinner } from "@/components/ui/spinner"
import { OrderForm } from "@/components/orders"

export const CreatePurchaseOrder = () => {
  const [providers, setProviders] = useState([])
  const { config, loading: loadingUserConfig } = useContext(UserConfigContext)


  const { response: productsData, loading: loadingProducts } = useFetch({
    url: "/data/read/providers",
    qs: {
      enterpriseID: config?.enterprise?.id,
    },
  })

  useEffect(() => {
    if (productsData) {
      setProviders(productsData.data)
    }
  }, [productsData])

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
        type="purchase"
        entities={providers}
      />
    </Layout>
  )
}
