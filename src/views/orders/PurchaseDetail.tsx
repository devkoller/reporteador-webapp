import { Layout } from "@/components/auth"
import { Detail } from "@/components/orders/[id]/Detail"
import { useFetch } from "@/hooks"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { PurchaseOrderType } from "@/types"
import { Spinner } from "@/components/ui/spinner"


export const PurchaseDetail = () => {
  const { id } = useParams()
  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrderType | null>(null)

  const { response: purchaseOrderData, loading } = useFetch({
    url: "/order/read/purchase/" + id,
  })

  useEffect(() => {
    if (purchaseOrderData) {
      setPurchaseOrder(purchaseOrderData.data)
    }
  }, [purchaseOrderData])

  if (!purchaseOrder) {
    return (
      <Layout>
        <div className="flex justify-center h-screen">
          <h2>
            No se ha encontrado la orden de compra
          </h2>
        </div>
      </Layout>
    )
  }


  return (
    <Layout>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      ) : (
        <Detail
          backUrl='/order'
          type='purchase'
          order={purchaseOrder as PurchaseOrderType}
        />
      )}
    </Layout>
  )
}
