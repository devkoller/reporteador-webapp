import { Layout } from "@/components/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/utils"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ContractType } from "@/types"
import { Spinner } from "@/components/ui/spinner"


import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { FormCombobox } from '@/components/Form'
import { usePost, useToast, useFetch } from "@/hooks"
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

export const Contracts = () => {
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


  const { response: licitacionesData, refetch: refetchLicitaciones } = useFetch({
    url: "/v1/data/licitaciones",
    qs: {
      ejercicio: form.watch("ejercicio"),
    }
  })

  const { response: articulosData, refetch: refetchArticulos } = useFetch({
    url: "/v1/data/articulos",
    qs: {
      ejercicio: form.watch("ejercicio"),
      num_licitacion: form.watch("num_licitacion"),
      proveedo_nom: form.watch("proveedo_nom"),
    }
  })

  const { response: proveeData, refetch: refetchProvee } = useFetch({
    url: "/v1/data/proveedores",
    qs: {
      ejercicio: form.watch("ejercicio"),
      num_licitacion: form.watch("num_licitacion"),

    }
  })

  const { response: ejerciciosData, } = useFetch({
    url: "/v1/data/ejercicios",
  })


  function onSubmit(values: z.infer<typeof formSchema>) {
    execute({
      url: "/v1/data/contracts",
      method: "post",
      body: values,
    }).then((res) => {
      if (res.status === 200) {
        if (res.status !== 200) throw new Error("Error al obtener los contratos")

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
    if (articulosData) {
      setComboOptions((prev) => ({
        ...prev,
        codigos: articulosData.data,
      }))
    }
  }, [articulosData])

  useEffect(() => {
    if (proveeData) {
      setComboOptions((prev) => ({
        ...prev,
        proveedores: proveeData.data,
      }))
    }
  }, [proveeData])

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
      refetchArticulos()
      refetchProvee()
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
                  <CardTitle>Contratos</CardTitle>
                  <CardDescription>Información</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div>
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
              {LoadingPost ? (
                <div className="flex items-center justify-center h-64">
                  <Spinner />
                </div>
              ) : (
                <DataTable
                  data={data}
                  columns={[
                    { header: "Ejercicio", accessorKey: "ejercicio" },
                    { header: "Número de licitación", accessorKey: "num_licitacion" },
                    { header: "Nombre del proveedor", accessorKey: "proveedo_nom" },
                    { header: "Partida", accessorKey: "cta_contable" },
                    { header: "Código del articulo", accessorKey: "cod_bar_mc_pr" },
                    { header: "Descripción del articulo", accessorKey: "art_mc_nom" },
                    { header: "Presentación", accessorKey: "presentacion" },
                    { header: "marca", accessorKey: "marca" },
                    { header: "Precio unitario (Sin IVA)", accessorKey: "precio" },
                    { header: "Mínimo", accessorKey: "min" },
                    { header: "Máximo", accessorKey: "max" },
                    { header: "Ampliado", accessorKey: "ampliado" },
                    { header: "Porcentaje", accessorKey: "porcentaje" },
                    { header: "Consumido", accessorKey: "consumido" },
                    { header: "Disponible", accessorKey: "disponible", },
                    { header: "$ Mínimo", accessorKey: "minio_dinero" },
                    { header: "$ Máximo", accessorKey: "maximo_dinero" },
                    { header: "$ Consumo", accessorKey: "consumo" },
                    { header: "$ Disponible", accessorKey: "disponible_dinero" },
                    { header: "Código (lic)", accessorKey: "codigo" },
                    { header: "Fecha", accessorKey: "fecha" },
                    { header: "Centro", accessorKey: "unidad" },
                    { header: "Vigencia Inicio", accessorKey: "vigencia_inicio" },
                    { header: "Vigencia Fin", accessorKey: "vigencia_fin" },
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
