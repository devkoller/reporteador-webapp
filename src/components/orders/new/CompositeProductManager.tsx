import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Box, Package, Trash2, Wrench } from "lucide-react"
import { FormInput, FormCombobox } from "@/components/Form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { CombosType } from "@/types"
import { usePost, useToast } from "@/hooks"

const compositeProductSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  description: z.string().optional(),
  price: z.coerce.number().min(0, { message: "El precio debe ser un numero positivo" }),
  items: z
    .array(
      z.object({
        productID: z.number({ required_error: "Selecciona un producto" }),
        quantity: z.coerce
          .number({ required_error: "Ingresa una cantidad." })
          .min(1, { message: "La cantidad debe ser al menos 1." }),
        unitPrice: z.coerce.number().min(0, { message: "El precio debe ser un numero positivo" }),
        isService: z.boolean().optional(),
        serviceID: z.string().optional(),
      }),
    )
    .min(1, { message: "Selecciona al menos un producto" }),
})

type CompositeProductFormValues = z.infer<typeof compositeProductSchema>

interface CompositeProductManagerProps {
  products: CombosType[]
  services: CombosType[]
  type: "sales" | "purchase"
  enterpriseID?: number
  entityID?: number | string
  // compositeProducts: PackageT ype[]
  // onSave: (product: PackageType) => void
  // onSelect?: (product: PackageType) => void
  // buttonVariant?: "default" | "outline" | "secondary"
  // buttonText?: string
}

export function CompositeProductManager({
  products,
  services,
  type,
  enterpriseID,
  entityID,
  // compositeProducts,
  // onSave,
  // onSelect,
  // buttonVariant = "default",
}: CompositeProductManagerProps) {
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const { toast } = useToast()
  const { execute, loading } = usePost()
  // const [selectedComposite, setSelectedComposite] = useState<PackageType | null>(null)

  const form = useForm<CompositeProductFormValues>({
    resolver: zodResolver(compositeProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      items: [{ productID: 0, quantity: 1, unitPrice: 0, isService: false, serviceID: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  })

  async function onSubmit(values: CompositeProductFormValues) {

    const body = {
      ...values,
      type: type === "sales" ? "selling" : "purchase",
      enterpriseID,
      entityID: type === "sales" ? null : entityID,
    }

    const response = await execute({
      url: "/product/create/package",
      body,
    })

    if (response.status === 200) {
      toast({
        title: "Paquete creado",
        description: "El paquete se ha creado correctamente.",
      })
      setOpen(false)
      resetForm()
    } else {
      toast({
        title: "Error al crear el paquete",
        description: response.message,
        variant: "destructive",
      })
    }

    // const newComposite: PackageType = {
    //   id: selectedComposite?.id || `CP-${Date.now()}`,
    //   ...values,
    //   description: values.description || "",
    //   items: values.items.map((item) => ({
    //     ...item,
    //     product: products.find((p) => p.id === item.productId),
    //   })),
    // }

    // onSave(newComposite)
    // resetForm()
    // setOpen(false)
  }

  function resetForm() {
    form.reset({
      name: "",
      description: "",
      price: 0,
      items: [{ productID: 0, quantity: 1, unitPrice: 0, isService: false, serviceID: "" }],
    })
    // setSelectedComposite(null)
    setEditMode(false)
  }

  // function handleEdit(composite: PackageType) {
  //   setSelectedComposite(composite)
  //   setEditMode(true)

  //   form.reset({
  //     name: composite.name,
  //     description: composite.description || "",
  //     price: composite.price,
  //     items: composite.items.map((item) => ({
  //       productId: item.productID,
  //       quantity: item.quantity,
  //     })),
  //   })
  // }

  // Handle product selection
  const handleProductChange = (index: number, productId: string, isService: boolean) => {
    if (!isService) {
      const product = products.find((p) => p.id.toString() === productId)
      if (product) {
        form.setValue(`items.${index}.unitPrice`, product.price)
      }
    }
  }

  function calculateSuggestedPrice() {
    const items = form.getValues("items")
    const suggestedPrice = items.reduce((total, item) => {
      return total + (item.unitPrice || 0) * item.quantity
    }, 0)

    form.setValue("price", suggestedPrice)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Package className="mr-2 h-4 w-4" />
          Administrar paquetes
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editMode ? "Editar un producto compuesto" : "Crear un producto compuesto"}</DialogTitle>
          <DialogDescription>
            Crea paquetes de productos que se pueden agregar a los pedidos como un solo artículo.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 border rounded-md p-4">
            <h3 className="font-medium mb-2">Paquetes guardados</h3>
            {/* {compositeProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aún no hay paquetes.</p>
            ) : (
              <div className="space-y-2">
                {compositeProducts.map((composite) => (
                  <div key={composite.id} className="border rounded-md p-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{composite.name}</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleEdit(composite)}>
                          <span className="sr-only">Editar</span>
                          <Package className="h-3 w-3" />
                        </Button>
                        {onSelect && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => {
                              onSelect(composite)
                              setOpen(false)
                            }}
                          >
                            <span className="sr-only">Seleccionar</span>
                            <Plus className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {composite.items.length} productos · ${composite.price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )} */}
          </div>

          <div className="md:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                <FormInput
                  control={form.control}
                  name="name"
                  label='Nombre de paquete'
                  placeholder="Ingresa el nombre del paquete"
                />

                <FormInput
                  control={form.control}
                  name="description"
                  type="textarea"
                  label='Nombre de paquete'
                  placeholder="Ingresa la descripción del paquete"
                  description="Opcional: Describe lo que incluye este paquete."
                />

                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Productos en el paquete</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => append({ productID: 0, quantity: 1, unitPrice: 0, isService: false, serviceID: "" })}
                      >
                        <Box className="mr-2 h-4 w-4" />
                        Agregar producto
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => append({ productID: 0, quantity: 1, unitPrice: 0, isService: true, serviceID: "" })}
                      >
                        <Wrench className="mr-2 h-4 w-4" />
                        Agregar servicio
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Producto / servicio</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead className="min-w-[100px]">Cantidad</TableHead>
                          <TableHead className="min-w-[100px]">Precio</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {fields.map((field, index) => {
                          const quantity = form.watch(`items.${index}.quantity`) || 0
                          const isService = form.watch(`items.${index}.isService`) || false
                          const price = form.watch(`items.${index}.unitPrice`) || 0

                          return (
                            <TableRow key={field.id}>
                              <TableCell>
                                <FormCombobox
                                  name={`items.${index}.productID`}
                                  needFilter={isService ? false : true}
                                  control={form.control}
                                  option={isService ? services : products}
                                  setValue={form.setValue}
                                  onChange={(value) => handleProductChange(index, value, isService)}
                                  required
                                />
                                {/* <FormField
                                  control={form.control}
                                  name={`items.${index}.productID`}
                                  render={({ field }) => (
                                    <FormItem className="space-y-0">
                                      <Select
                                        onValueChange={(value) => {
                                          field.onChange(value)
                                          handleProductChange(index, value, isService)
                                        }}
                                        defaultValue={field.value}
                                        value={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Selecciona un producto o servicio" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {isService
                                            ? services.map((service) => (
                                              <SelectItem key={service.id} value={service.id.toString()}>
                                                <div className="flex items-center">
                                                  <Wrench className="mr-2 h-4 w-4" />
                                                  <span>
                                                    {service.name} ({service.categoryName})
                                                  </span>
                                                </div>
                                              </SelectItem>
                                            ))
                                            : products.map((product) => (
                                              <SelectItem key={product.id} value={product.id.toString()}>
                                                <div className="flex items-center">
                                                  <Package className="mr-2 h-4 w-4" />
                                                  <span>
                                                    {product.nombre} ({product.SKU})
                                                  </span>
                                                </div>
                                              </SelectItem>
                                            ))}
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                /> */}
                              </TableCell>
                              <TableCell>
                                {isService ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    <Wrench className="mr-1 h-3 w-3" />
                                    Servicio
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <Package className="mr-1 h-3 w-3" />
                                    Producto
                                  </span>
                                )}
                              </TableCell>
                              <TableCell>
                                <FormInput
                                  control={form.control}
                                  name={`items.${index}.quantity`}
                                  placeholder="Cantidad"
                                  type="number"
                                />
                              </TableCell>
                              <TableCell>
                                <FormInput
                                  control={form.control}
                                  name={`items.${index}.unitPrice`}
                                  placeholder="Precio"
                                  type="number"
                                />
                              </TableCell>
                              <TableCell>${(price * quantity).toFixed(2)}</TableCell>
                              <TableCell>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  disabled={fields.length === 1}
                                  onClick={() => remove(index)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Precio del paquete</FormLabel>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <div className="flex items-center">
                                <span className="mr-1">$</span>
                                <Input
                                  type="number"
                                  step="0.01"
                                  min={0}
                                  className="w-32"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e.target.valueAsNumber)
                                  }}
                                />
                              </div>
                            </FormControl>
                            <Button type="button" variant="outline" size="sm" onClick={calculateSuggestedPrice}>
                              Calcular
                            </Button>
                          </div>
                          <FormDescription>
                            Tu puedes establecer un precio personalizado o calcularlo en base a los productos incluidos.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm()
                      setOpen(false)
                    }}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={loading}>{editMode ? "Actualizar paquete" : "Crear paquete"}</Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
