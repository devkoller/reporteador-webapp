import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Save, Trash2, Plus, Package, Calculator, Box, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompositeProductManager } from "@/components/orders"
import { CombosType, ProductsType, PackageType, PackageComponentsType } from "@/types"
import { useFetch, usePost, useToast } from "@/hooks"
import { UserConfigContext } from "@/context/UserConfigContext"
import { FormInput, FormCombobox } from "@/components/Form"

import { InformationOrderForm } from "./InformationOrderForm"
import { TermsOrderForm } from "./TermsOrderForm"




// Define the form schema
const orderFormSchema = z.object({
  entityID: z.string({
    required_error: "Por favor selecciona un cliente o proveedor.",
  }),
  warehouseID: z.string({
    required_error: "Por favor selecciona un almacén.",
  }),
  orderDate: z.string({
    required_error: "Please select a date.",
  }),
  expectedDate: z.string().optional(),
  notes: z.string().optional(),
  items: z
    .array(
      z.object({
        productID: z.coerce.number({
          required_error: "Por favor selecciona un producto.",
        }),
        quantity: z.coerce
          .number({
            required_error: "Pro favor ingresa una cantidad.",
            invalid_type_error: "Cantidad debe ser un número",
          })
          .min(1, {
            message: "Cantidad debe ser mayor a 0.",
          }),
        unitPrice: z.coerce
          .number({
            required_error: "Por favor ingresa un precio.",
            invalid_type_error: "Precio debe ser un número",
          })
          .min(0, {
            message: "El precio no puede ser menor o igual a 0.",
          }),
        isPackage: z.boolean().default(false),
        isService: z.boolean().default(false),
        compositeItems: z
          .array(
            z.object({
              productID: z.preprocess((val) => {
                const numberVal = Number(val);
                return isNaN(numberVal) ? 0 : numberVal;
              }, z.number().optional()),
              quantity: z.number(),
              isService: z.boolean(),
              serviceID: z.string().optional(),
              unitPrice: z.coerce
                .number({
                  required_error: "Por favor ingresa un precio.",
                  invalid_type_error: "Precio debe ser un número",
                })
            }),
          )
          .optional(),
      }),
    )
    .min(1, {
      message: "Por favor agrega al menos un producto.",
    }),
  paymentTerms: z.string({
    required_error: "Por favor selecciona los términos de pago.",
  }),
  shippingMethod: z.string({
    required_error: "Por favor selecciona los métodos de entrega.",
  }),
})
type OrderFormValues = z.infer<typeof orderFormSchema>

interface OrderFormProps {
  type: "sales" | "purchase"
  entities: CombosType[]
}

interface StateTypeof {
  warehouse: CombosType[] | []
  products: CombosType[] | []
  services: CombosType[] | []
  packages: PackageType[] | []
}

export function OrderForm({ type, entities, }: OrderFormProps) {
  const { config } = useContext(UserConfigContext)
  const { execute, loading: postLoading } = usePost()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<"products" | "packages">("products")
  const [Data, setData] = useState<StateTypeof>({
    warehouse: [],
    products: [],
    services: [],
    packages: [],
  })
  const defaultValues: Partial<OrderFormValues> = {
    orderDate: new Date().toISOString().split("T")[0],
    expectedDate: new Date().toISOString().split("T")[0],
    items: [{ productID: 0, quantity: 1, unitPrice: 0, isPackage: false, isService: false }],
  }

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  })

  const entityLabel = type === "sales" ? "Cliente" : "Proveedor"
  const orderTitle = type === "sales" ? "orden de venta" : "orden de compra"
  const warehouseLabel = type === "sales" ? "Almacén de salida" : "Almacén de llegada"
  const entityID = form.watch("entityID")

  // Calculate totals
  const items = form.watch("items")
  const subtotal = items.reduce((acc, item) => {
    return acc + (item.unitPrice || 0) * (item.quantity || 0)
  }, 0)
  const tax = subtotal * 0.16 // 16% iva
  const total = subtotal + tax

  const { response: warehouseData } = useFetch({
    url: "/data/read/warehouses",
    qs: {
      enterpriseID: config?.enterprise?.id,
    },
  })

  const { response: serviceData } = useFetch({
    url: "/data/read/services",
    qs: {
      enterpriseID: config?.enterprise?.id,
      typeService: type === "sales" ? 'selling' : 'purchase',
    },
  })

  const { response: packageData } = useFetch({
    url: "/product/read/package",
    qs: {
      enterpriseID: config?.enterprise?.id,
      type: type === "sales" ? 'selling' : 'purchase',
    },
  })

  const { response: productsData } = useFetch({
    url: "/data/read/products",
    qs: {
      enterpriseID: config?.enterprise?.id,
    },
  })


  // Handle product selection
  const handleProductChange = (index: number, productId: string, isService: boolean) => {
    if (!isService) {
      const product = Data.products.find((p) => p.id.toString() === productId)
      if (product) {
        form.setValue(`items.${index}.unitPrice`, product.price)
      }
    }
  }

  // Handle composite product selection
  const handleCompositeProductSelect = (composite: PackageType) => {
    append({
      productID: parseInt(composite.id) || 0,
      quantity: 1,
      unitPrice: composite.price,
      isPackage: true,
      isService: false,
      compositeItems: composite.items.map((item: PackageComponentsType) => ({
        productID: parseInt(item.productID),
        isService: item.isService ?? false,
        serviceID: item.serviceID !== undefined ? String(item.serviceID) : undefined,
        quantity: item.quantity,
        unitPrice: item.unitPrice ?? 0,
      })),
    })
    setActiveTab("products")
  }


  function onSubmit(values: OrderFormValues) {
    const items = values.items.map((item) => {
      if (item.isPackage) {
        return {
          ...item,
          productID: null,
          packageID: item.productID,
        }
      }

      if (item.isService) {
        return {
          ...item,
          productID: null,
          serviceID: item.productID,
        }
      }

      return item
    })

    let body: any = {
      ...values,
      enterpriseID: config?.enterprise?.id,
      total,
      subtotal,
      tax,
      products: items
    }

    if (type === "sales") {
      body = {
        ...body,
        clientID: values.entityID,
      }
    } else {
      body = {
        ...body,
        providerID: values.entityID,
      }
    }

    let url = type === "sales" ? "/order/create/selling" : "/order/create/purchase"

    execute({
      url,
      body
    }).then((response) => {
      if (response.status === 200) {
        // form.reset()
        // setData((prev) => ({
        //   ...prev,
        //   products: [],
        //   services: [],
        //   packages: [],
        // }))
        toast({
          title: "Orden guardada",
          description: `La ${orderTitle} ha sido guardada exitosamente.`,
          variant: "default",
        })
      } else {
        toast({
          title: "Error",
          description: `Error al guardar la ${orderTitle}.`,
          variant: "destructive",
        })
      }
    })
  }




  useEffect(() => {
    if (warehouseData) {
      let warehouseOptions = []

      if (type === 'sales') {
        warehouseOptions.push({
          value: 0,
          label: "Todos los almacenes",
        })
      }

      setData((prev) => ({
        ...prev,
        warehouse: [
          ...warehouseOptions,
          ...warehouseData.data,
        ]
      }))
    }
  }, [warehouseData])

  useEffect(() => {
    if (serviceData) {

      setData((prev) => ({
        ...prev,
        services: serviceData.data,
      }))
    }
  }, [serviceData])


  useEffect(() => {
    const fetchCompositeProducts = async () => {
      const response = await execute({
        url: `/provider/read/${entityID}`,
        method: 'get',
        qs: {
          enterpriseID: config?.enterprise?.id,
        },
      })

      if (response.status === 200) {
        const products = response.data?.products

        if (!products) return

        let data = products.map((product: ProductsType) => {
          return {
            ...product,
            value: product.id,
            label: product.nombre,
          }
        })


        setData((prev) => ({
          ...prev,
          products: data,
        }))
      }
    }

    if (type === "purchase" || entityID) {
      fetchCompositeProducts()
    }
  }, [entityID])

  useEffect(() => {
    if (packageData) {
      if (type === "sales") {
        setData((prev) => ({
          ...prev,
          packages: packageData.data,
        }))

      } else {
        let filter = packageData.data.filter((item: PackageType) => {
          return item.entityID === parseInt(entityID)
        })
        setData((prev) => ({
          ...prev,
          packages: filter,
        }))
      }

    }
  }, [packageData])

  useEffect(() => {
    if (productsData) {
      if (type === "sales") {
        setData((prev) => ({
          ...prev,
          products: productsData.data,
        }))
      }
    }
  }, [productsData])



  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Crear nueva {orderTitle}</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" asChild>
              <Link to='/order'>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Regresar
              </Link>
            </Button>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InformationOrderForm
                form={form}
                entityLabel={entityLabel}
                entities={entities}
                orderTitle={orderTitle}
                warehouseLabel={warehouseLabel}
                warehouses={Data.warehouse}
                type={type}
              />


              <TermsOrderForm
                form={form}
                subtotal={subtotal}
                tax={tax}
                total={total}
              />


            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Productos de la orden</CardTitle>
                  <CardDescription>Agrega productos a esta orden.</CardDescription>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <CompositeProductManager
                    products={Data.products}
                    services={Data.services}
                    type={type}
                    enterpriseID={config?.enterprise?.id}
                    entityID={entityID}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ productID: 0, quantity: 1, unitPrice: 0, isPackage: false, isService: false })}
                  >
                    <Box className="mr-2 h-4 w-4" />
                    Agregar articulo
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ productID: 0, quantity: 1, unitPrice: 0, isPackage: false, isService: true })}
                  >
                    <Wrench className="mr-2 h-4 w-4" />
                    Agregar servicio
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "products" | "packages")}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="products">
                      <Package className="mr-2 h-4 w-4" />
                      Productos
                    </TabsTrigger>
                    <TabsTrigger value="packages">
                      <Box className="mr-2 h-4 w-4" />
                      Paquetes ({Data.packages.length})
                    </TabsTrigger>

                  </TabsList>

                  <TabsContent value="products">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Producto / servicio</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Cantidad</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {fields.map((field, index) => {
                            const isPackage = form.watch(`items.${index}.isPackage`)
                            const isService = form.watch(`items.${index}.isService`)


                            if (isPackage) {
                              const compositeId = form.watch(`items.${index}.productID`)
                              const composite = Data.packages.find((p) => parseInt(p.id) === compositeId)
                              const quantity = form.watch(`items.${index}.quantity`) || 0
                              const price = form.watch(`items.${index}.unitPrice`) || 0

                              return (
                                <TableRow key={field.id}>
                                  <TableCell>
                                    <div className="flex items-center">
                                      <Box className="mr-2 h-4 w-4 text-primary" />
                                      <div>
                                        <div className="font-medium">{composite?.name || "Package"}</div>
                                        <div className="text-xs text-muted-foreground">
                                          {composite?.items.length || 0} productos incluidos
                                        </div>
                                      </div>

                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                      <Box className="mr-1 h-3 w-3" />
                                      Paquete
                                    </span>
                                  </TableCell>
                                  <TableCell>
                                    <FormInput
                                      control={form.control}
                                      name={`items.${index}.quantity`}
                                      placeholder="Cantidad"
                                      type="number"
                                    />
                                  </TableCell>
                                  <TableCell>${price}</TableCell>
                                  <TableCell>${(price * quantity)}</TableCell>
                                  <TableCell>
                                    <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              )
                            }

                            return (
                              <TableRow key={field.id}>
                                <TableCell>
                                  <FormCombobox
                                    name={`items.${index}.productID`}
                                    needFilter={isService ? false : true}
                                    control={form.control}
                                    option={isService ? Data.services : Data.products}
                                    setValue={form.setValue}
                                    onChange={(value) => handleProductChange(index, value, isService)}
                                    required
                                  />
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
                                <TableCell>
                                  $
                                  {(
                                    (form.watch(`items.${index}.quantity`) || 0) *
                                    (form.watch(`items.${index}.unitPrice`) || 0)
                                  ).toFixed(2)}
                                </TableCell>
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
                  </TabsContent>

                  <TabsContent value="packages">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Data.packages.length === 0 ? (
                        <div className="col-span-full p-8 text-center">
                          <Box className="mx-auto h-12 w-12 text-muted-foreground" />
                          <h3 className="mt-2 text-lg font-medium">Aún no hay paquetes</h3>
                          <p className="text-sm text-muted-foreground">
                            Crea paquetes de productos para agregar rápidamente varios artículos a tus órdenes.
                          </p>
                        </div>
                      ) : (
                        Data.packages.map((composite) => (
                          <Card key={composite.id} className="overflow-hidden">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{composite.name}</CardTitle>
                              <CardDescription>PKG-{composite.id}</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <p className="text-sm mb-2">{composite.description || "No description provided."}</p>
                              <div className="text-sm text-muted-foreground mb-2">
                                Contiene {composite.items?.length} productos:
                              </div>
                              <ul className="text-sm space-y-1 mb-4">
                                {composite.items?.map((item: PackageComponentsType, idx: number) => {
                                  // const product = products.find((p) => p.id.toString() === item.productId)
                                  return (
                                    <li key={idx} className="flex justify-between">
                                      <span>{item.isService ? item.service?.name : item.product?.nombre}</span>
                                      <span>x{item.quantity}</span>
                                    </li>
                                  )
                                })}
                              </ul>
                              <div className="font-medium text-right">${composite.price}</div>
                            </CardContent>
                            <CardFooter className="bg-muted/50 pt-2">
                              <Button
                                className="w-full"
                                size="sm"
                                onClick={() => handleCompositeProductSelect(composite)}
                              >
                                <Plus className="mr-2 h-4 w-4" />
                                Agregar a la orden
                              </Button>
                            </CardFooter>
                          </Card>
                        ))
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calculator className="mr-1 h-4 w-4" />
                  <span>Productos totales: {items.reduce((acc, item) => acc + (item.quantity || 0), 0)}</span>
                </div>
                <div className="font-bold">${total.toFixed(2)}</div>
              </CardFooter>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" disabled={postLoading}>
                {postLoading ? (
                  `Guardando ${orderTitle}...`
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar {orderTitle}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
