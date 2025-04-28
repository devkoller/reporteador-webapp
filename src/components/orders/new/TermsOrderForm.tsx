import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FormSelect } from "@/components/Form"
import { Separator } from "@/components/ui/separator"

interface TermsOrderFormProps {
  form: any
  subtotal: number
  tax: number
  total: number
}

const shippingMethodOptions = [
  { value: 1, label: "Envió estándar" },
  { value: 2, label: "Envió express" },
  { value: 3, label: "Transporte" },
  { value: 4, label: "Recoger en tienda" },
]

const paymentTermsOptions = [
  { value: 1, label: "Pago inmediato" },
  { value: 2, label: "Neto 15 días" },
  { value: 3, label: "Neto 30 días" },
  { value: 4, label: "Neto 60 días" },
]

export const TermsOrderForm = ({ form, subtotal, tax, total }: TermsOrderFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Entrega y método de pago</CardTitle>
        <CardDescription>Enter shipping and payment details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">

        <FormSelect
          control={form.control}
          name="shippingMethod"
          label='Método de envió'
          option={shippingMethodOptions}
        />

        <FormSelect
          control={form.control}
          name="paymentTerms"
          label='Términos de pago'
          option={paymentTermsOptions}
        />

      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="space-y-2 w-full">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>IVA (16%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
