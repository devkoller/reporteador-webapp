import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { AlmacenType } from "@/types"
import { format } from "date-fns"


interface TabDetailsProps {
  warehouse: AlmacenType
}

export const TabDetails = ({ warehouse }: TabDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del almacén</CardTitle>
        <CardDescription>
          Información detallada sobre esta instalación de almacén
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Administrador del almacén</h3>
              <p className="text-base">{warehouse.warehouseContact?.manager}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Contacto del administrador
              </h3>
              <p className="text-base">{warehouse.warehouseContact?.number_contact}</p>
              <p className="text-base">{warehouse.warehouseContact?.email_contact}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Capacidad del almacén
              </h3>
              <p className="text-base">{warehouse.warehouseFacility?.facility_size}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Ubicación del almacén
              </h3>
              <p className="text-base">{warehouse.location}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Dirección del almacén
              </h3>
              <p className="text-base">{warehouse.address}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Última actualización
              </h3>
              <p className="text-base">
                {format(warehouse.updatedAt, "EEEE, MMMM d, yyyy")}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
