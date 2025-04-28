import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Box, Truck } from "lucide-react"
import { Link } from 'react-router-dom'
import { AlmacenType } from '@/types'


interface TabShipmentsProps {
  warehouse: AlmacenType
}

export const TabShipments = ({ warehouse }: TabShipmentsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Truck className="h-5 w-5 mr-2" />
            Envíos Entrantes
          </CardTitle>
          <CardDescription>
            Envíos entrantes a este almacén
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">{3}</div>
            <Button variant="outline" size="sm">
              <Link to={`/warehouses/${warehouse.id}/shipments/inbound`}>
                Ver Todos
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Box className="h-5 w-5 mr-2" />
            Envíos Salientes
          </CardTitle>
          <CardDescription>
            Envíos salientes de este almacén

          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">{5}</div>
            <Button variant="outline" size="sm">
              <Link to={`/warehouses/${warehouse.id}/shipments/outbound`}>
                Ver Todos
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
