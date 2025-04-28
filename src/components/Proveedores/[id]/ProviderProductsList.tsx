
import { Link, useParams } from "react-router-dom"
import { Package } from "lucide-react"
import { ProductsType } from "@/types"
import { DataTable } from "@/components/utils"
import { Button } from "@/components/ui/button"
import { ColumnsProductsProvider } from "@/components/Proveedores/Column"



interface ProviderProductsListProps {
  products?: ProductsType[]
}

export const ProviderProductsList = ({ products }: ProviderProductsListProps) => {
  const { id } = useParams()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">
          Productos de proveedor
        </h3>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/provider/${id}/products`}>
              <Package className="mr-2 h-4 w-4" />
              Administrar productos
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-md border">

        <DataTable
          columns={ColumnsProductsProvider}
          data={products || []}
        />
      </div>
    </div>
  )
}
