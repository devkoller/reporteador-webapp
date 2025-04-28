import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormInput, FormSelect } from "@/components/Form"
import { CombosType } from "@/types"


interface InformationOrderFormProps {
  form: any
  entityLabel: string
  entities: CombosType[]
  orderTitle: string
  warehouseLabel: string
  warehouses: CombosType[]
  type: "sales" | "purchase"
}


export const InformationOrderForm = ({ form, entityLabel, entities, orderTitle, warehouseLabel, warehouses, type }: InformationOrderFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Información de la orden
        </CardTitle>
        <CardDescription>Ingresa los detalles básicos de la {orderTitle.toLowerCase()}.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormSelect
          control={form.control}
          name="entityID"
          label={entityLabel}
          option={entities || []}
        />

        <FormInput
          control={form.control}
          name="orderDate"
          label='Fecha de la orden'
          type="date"
        />

        {type === "purchase" && (
          <FormInput
            control={form.control}
            name="expectedDate"
            label='Fecha esperada de entrega'
            type="date"
          />
        )}

        <FormSelect
          control={form.control}
          name="warehouseID"
          label={warehouseLabel}
          option={warehouses}
        />

        <FormInput
          control={form.control}
          name="notes"
          label='Notas'
          description='Opcional: Agrega cualquier instrucción o nota especial para esta orden.'
          type="textarea"
        />


      </CardContent>
    </Card>
  )
}
