import { Layout } from "@/components/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/utils"
import { useEffect, useState } from "react"
import { useFetch } from "@/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ContractType } from "@/types"
import { Spinner } from "@/components/ui/spinner"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { FormCombobox } from '@/components/Form'
import { usePost, useToast } from "@/hooks"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  num_licitacion: z.string().optional(),
  cod_bar_mc_pr: z.string().optional(),
  ejercicio: z.number().optional(),
  proveedo_nom: z.string().optional(),
})

interface comboOptionsType {
  licitaciones: { label: string; value: string }[]
  codigos: { label: string; value: string }[]
  ejercicios: { label: string; value: string }[]
  proveedores: { label: string; value: string }[]
}

export const Orders = () => {
  const [data, setData] = useState<ContractType[]>([])
  const { execute, loading: LoadingPost } = usePost()
  const { toast } = useToast()

  const [ComboOptions, setComboOptions] = useState<comboOptionsType>({
    licitaciones: [],
    codigos: [],
    ejercicios: [],
    proveedores: [],
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      num_licitacion: "",
      cod_bar_mc_pr: "",
      ejercicio: 0,
      proveedo_nom: "",
    },
  })

  const { response: licitacionesData, refetch: refetchLicitaciones, loading: l1 } = useFetch({
    url: "/v1/data/order/licitaciones",
    qs: {
      ejercicio: form.watch("ejercicio"),
    }
  })

  const { response: proveeData, refetch: refetchProvee, } = useFetch({
    url: "/v1/data/order/proveedores",
    qs: {
      ejercicio: form.watch("ejercicio"),
      num_licitacion: form.watch("num_licitacion"),
    }
  })

  const { response: articulosData, refetch: refetchArticulos, loading: l2 } = useFetch({
    url: "/v1/data/order/articulos",
    qs: {
      ejercicio: form.watch("ejercicio"),
      num_licitacion: form.watch("num_licitacion"),
      proveedo_nom: form.watch("proveedo_nom"),
    }
  })

  const { response: ejerciciosData, loading: l3 } = useFetch({
    url: "/v1/data/order/ejercicios",
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    execute({
      url: "/v1/data/orders",
      method: "post",
      body: values,
    }).then((res) => {
      if (res.status === 200) {

        let data = res.data

        setData(data)
      } else {
        toast({
          title: "Error cargar los datos",
          description: res.message || "Por favor, verifica tus credenciales",
          variant: "destructive",
        })
      }
    })
  }

  useEffect(() => {
    if (licitacionesData) {
      setComboOptions((prev) => ({
        ...prev,
        licitaciones: licitacionesData.data,
      }))
    }
  }, [licitacionesData])

  useEffect(() => {
    if (proveeData) {
      setComboOptions((prev) => ({
        ...prev,
        proveedores: proveeData.data,
      }))
    }
  }, [proveeData])

  useEffect(() => {
    if (articulosData) {
      setComboOptions((prev) => ({
        ...prev,
        codigos: articulosData.data,
      }))
    }
  }, [articulosData])

  useEffect(() => {
    if (ejerciciosData) {
      setComboOptions((prev) => ({
        ...prev,
        ejercicios: ejerciciosData.data,
      }))
    }
  }, [ejerciciosData])

  useEffect(() => {
    if (form.watch("ejercicio")) {
      refetchLicitaciones()
      refetchArticulos()
      form.setValue("cod_bar_mc_pr", "")
      form.setValue("num_licitacion", "")
    }
  }, [form.watch("ejercicio")])

  useEffect(() => {
    if (form.watch("num_licitacion") || form.watch("ejercicio")) {
      refetchProvee()
      refetchArticulos()
    }
  }, [form.watch("num_licitacion"), form.watch("ejercicio")])

  useEffect(() => {
    if (form.watch("proveedo_nom")) {
      refetchArticulos()
    }
  }, [form.watch("proveedo_nom")])

  return (
    <Layout>
      <Tabs defaultValue="contracts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contracts">Tabla de información</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Ordenes de compra</CardTitle>
                  <CardDescription>Información</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>

              {l1 || l2 || l3 ? (
                <div className="flex items-center justify-center h-10">
                  <Spinner />
                </div>
              ) : (
                <div className="mb-4">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <FormCombobox
                          label="Ejercicio"
                          name="ejercicio"
                          control={form.control}
                          setValue={form.setValue}
                          option={ComboOptions.ejercicios}
                        />

                        <FormCombobox
                          label="Número de licitación"
                          name="num_licitacion"
                          control={form.control}
                          setValue={form.setValue}
                          option={ComboOptions.licitaciones}
                        />

                        <FormCombobox
                          label="Proveedor"
                          name="proveedo_nom"
                          control={form.control}
                          setValue={form.setValue}
                          option={ComboOptions.proveedores}
                        />

                        <FormCombobox
                          label="Código del artículo"
                          name="cod_bar_mc_pr"
                          control={form.control}
                          setValue={form.setValue}
                          option={ComboOptions.codigos}
                          needFilter={ComboOptions.codigos.length > 20}
                        />

                      </div>
                      <div className="flex justify-end gap-3">

                        <Button variant='outline' disabled={LoadingPost} onClick={(e) => {
                          e.preventDefault();
                          form.reset({
                            num_licitacion: "",
                            cod_bar_mc_pr: "",
                            ejercicio: 0,
                          });
                        }}>
                          Limpiar
                        </Button>
                        <Button type="submit" disabled={LoadingPost} >
                          Buscar
                          {LoadingPost && (
                            <Spinner />
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              )}

              {/* <div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormCombobox
                        label="Ejercicio"
                        name="ejercicio"
                        control={form.control}
                        setValue={form.setValue}
                        option={ComboOptions.ejercicios}
                      />

                      <FormCombobox
                        label="Número de licitación"
                        name="num_licitacion"
                        control={form.control}
                        setValue={form.setValue}
                        option={ComboOptions.licitaciones}
                      />

                      <FormCombobox
                        label="Código del artículo"
                        name="cod_bar_mc_pr"
                        control={form.control}
                        setValue={form.setValue}
                        option={ComboOptions.codigos}
                        needFilter={ComboOptions.codigos.length > 20}
                      />

                    </div>
                    <div className="flex justify-end gap-3">

                      <Button variant='outline' disabled={LoadingPost} onClick={(e) => {
                        e.preventDefault();
                        form.reset({
                          num_licitacion: "",
                          cod_bar_mc_pr: "",
                          ejercicio: 0,
                        });
                      }}>
                        Limpiar
                      </Button>
                      <Button type="submit" disabled={LoadingPost} >
                        Buscar
                        {LoadingPost && (
                          <Spinner />
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div> */}

              {LoadingPost ? (
                <div className="flex items-center justify-center h-64">
                  <Spinner />
                </div>
              ) : (
                <DataTable
                  data={data}
                  columns={[
                    { header: 'Ejercicio', accessorKey: 'año' },
                    { header: 'Numero de orden', accessorKey: 'no_orden' },
                    { header: 'Numero de pedido', accessorKey: 'no_ped' },
                    { header: 'Licitación', accessorKey: 'num_licitacion' },
                    { header: 'Código del articulo', accessorKey: 'cod_bar_mc_pr' },
                    { header: 'Descripcion', accessorKey: 'descripcion' },
                    { header: 'Cantidad', accessorKey: 'cantidad' },
                    { header: '$ Precio', accessorKey: 'precio' },
                    { header: 'Cantidad Cancelada', accessorKey: 'cant_cancelada' },
                    { header: '$ Subtotal orden', accessorKey: 'subtotal_ord' },
                    { header: '$ Subtotal pedido', accessorKey: 'subtotal_ped' },
                    { header: '$ Total orden', accessorKey: 'total_ord' },
                    { header: 'Centro', accessorKey: 'centro' },
                    { header: 'Almacén', accessorKey: 'almacen_deno' },
                    {
                      header: 'Cinco al millar', accessorKey: 'cinco_al_millar',
                      cell: (info) => info.getValue() ? "Sí" : "No"

                    },
                    { header: 'Condiciones de pago', accessorKey: 'condiciones_pago' },
                    { header: 'Estado de la orden', accessorKey: 'estado_ord' },
                    { header: 'Estado del pedido', accessorKey: 'estado_ped' },
                    { header: 'Fecha de envió', accessorKey: 'fecha_envio' },
                    { header: 'Fondeo orden', accessorKey: 'fondeo_ord' },
                    { header: 'Fondeo pedido', accessorKey: 'fondeo_ped' },
                    { header: 'IVA', accessorKey: 'iva' },
                    { header: '$ IVA Orden', accessorKey: 'iva_ord' },
                    { header: '$ IVA Pedido', accessorKey: 'iva_ped' },
                    { header: 'Monto ieps', accessorKey: 'monto_ieps' },
                    { header: 'Objeto del gasto Orden', accessorKey: 'og_ord' },
                    { header: 'Objeto del gasto Pedido', accessorKey: 'og_ped' },
                    { header: '% ieps', accessorKey: 'porciento_ieps' },
                    { header: 'Proveedor', accessorKey: 'proveedo_nom' },
                    { header: 'Servicio orden', accessorKey: 'servicio_ord' },
                    { header: 'Servicio pedido', accessorKey: 'servicio_ped' },
                    { header: 'Suministro orden', accessorKey: 'suministro_ord' },
                    { header: 'Suministro pedido', accessorKey: 'suministro_ped' },
                    { header: 'Tiempo de entrega', accessorKey: 'tiempo_entrega' },
                  ]}
                />
              )}

            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  )
}
