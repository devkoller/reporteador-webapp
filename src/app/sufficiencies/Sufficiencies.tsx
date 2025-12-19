import { Layout } from '@/components/auth'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DataTable } from '@/components/utils'
import { useEffect, useState } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { FormCombobox, FormInput } from '@/components/Form'
import { useFetch, usePost, useToast } from '@/hooks'
import { Button } from '@/components/ui/button'
import { SufficienciesType } from '@/types'

const formSchema = z.object({
	cod_bar_mc_pr: z.string().optional(),
	ejercicio: z.string().optional(),
	partida: z.string().optional(),
	unid_hosp: z.number().optional(),
	status: z.number().optional(),
	buscador: z.string().optional(),
})

interface comboOptionsType {
	status: { label: string; value: string }[]
	unid_hosp: { label: string; value: string }[]
}

export const Sufficiencies = () => {
	const [data, setData] = useState<SufficienciesType[]>([])
	const { execute, loading: LoadingPost } = usePost()
	const { toast } = useToast()
	const anios = []
	let initialYear =
		new Date().getFullYear() + (new Date().getMonth() >= 7 ? 1 : 0)
	for (let i = initialYear; i >= 2021; i--) {
		anios.push({ id: i, value: i })
	}

	const [ComboOptions, setComboOptions] = useState<comboOptionsType>({
		status: [],
		unid_hosp: [],
	})

	const { response: sufficiencesData } = useFetch({
		url: '/v1/data/sufficiencesStatus',
	})

	const { response: unidHospData } = useFetch({
		url: '/v1/data/unidHosp',
		qs: { tipo: 'sufficiences' },
	})
	// const { response: sufficiencies, loading } = useFetch({
	// 	url: '/v1/data/sufficiencies',
	// })

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			partida: '',
			cod_bar_mc_pr: '',
			ejercicio: '',
			status: 0,
			unid_hosp: 0,
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		execute({
			url: '/v1/data/sufficiencies',
			method: 'post',
			body: values,
		}).then((res) => {
			if (res.status === 200) {
				let data = res.data

				setData(data)
			} else {
				toast({
					title: 'Error cargar los datos',
					description: res.message || 'Por favor, verifica tus credenciales',
					variant: 'destructive',
				})
			}
		})
	}

	useEffect(() => {
		if (sufficiencesData) {
			setComboOptions((prev) => ({
				...prev,
				status: sufficiencesData.data,
			}))
		}
	}, [sufficiencesData])

	useEffect(() => {
		if (unidHospData) {
			setComboOptions((prev) => ({
				...prev,
				unid_hosp: unidHospData.data,
			}))
		}
	}, [unidHospData])

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
									<CardTitle>Suficiencias</CardTitle>
									<CardDescription>Información</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							{LoadingPost ? (
								<div className="flex items-center justify-center h-10">
									<Spinner />
								</div>
							) : (
								<div className="mb-4">
									<Form {...form}>
										<form
											onSubmit={form.handleSubmit(onSubmit)}
											className="space-y-4 mb-4"
										>
											<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
												<FormCombobox
													label="Ejercicio"
													name="ejercicio"
													control={form.control}
													setValue={form.setValue}
													option={anios.map((anio) => ({
														label: anio.value.toString(),
														value: anio.value.toString(),
													}))}
												/>
												<FormInput
													label="Partida"
													name="partida"
													placeholder='Ejemplo: "2551"'
													control={form.control}
													// setValue={form.setValue}
												/>
												<FormInput
													label="Codigo"
													name="cod_bar_mc_pr"
													placeholder='Ejemplo: "255123456"'
													control={form.control}
													// setValue={form.setValue}
												/>
												<FormCombobox
													label="Status"
													name="status"
													control={form.control}
													setValue={form.setValue}
													option={ComboOptions.status}
												/>
												<FormCombobox
													label="Unidad Hospitalaria"
													name="unid_hosp"
													control={form.control}
													setValue={form.setValue}
													option={ComboOptions.unid_hosp}
												/>
											</div>
											<div className="grid gap-4">
												<FormInput
													label="Buscador general"
													name="buscador"
													placeholder='Busca por codigo, ejercicio, partida, uh, concepto, descripción o partida. Ejemplo: "2023 2551 FAA Ampliacion"'
													control={form.control}
													// setValue={form.setValue}
												/>
											</div>
											<div className="flex justify-end gap-3">
												<Button
													variant="outline"
													disabled={LoadingPost}
													onClick={(e) => {
														e.preventDefault()
														form.reset({
															partida: '',
															cod_bar_mc_pr: '',
															ejercicio: '',
															unid_hosp: 0,
															status: 0,
														})
													}}
												>
													Limpiar
												</Button>
												<Button type="submit" disabled={LoadingPost}>
													Buscar
													{LoadingPost && <Spinner />}
												</Button>
											</div>
										</form>
									</Form>
								</div>
							)}

							{LoadingPost ? (
								<div className="flex items-center justify-center h-64">
									<Spinner />
								</div>
							) : (
								<DataTable
									data={data}
									columns={[
										{ header: 'U.H.', accessorKey: 'corta' },
										{ header: 'Ejercicio', accessorKey: 'anio' },
										{ header: 'Folio', accessorKey: 'folio' },
										{ header: 'Concepto', accessorKey: 'concepto' },
										{ header: 'Descripcion', accessorKey: 'descrip' },
										{ header: 'Tipo suficiencia', accessorKey: 'tipo_sufu' },
										{ header: 'Status', accessorKey: 'desc_stat' },
										{ header: 'Status Renglon', accessorKey: 'stat_deta' },
										{ header: 'Partida', accessorKey: 'partida' },
										{
											header: 'Código del articulo',
											accessorKey: 'cod_bar_mc_pr',
										},
										{
											header: 'Descripción del articulo',
											accessorKey: 'alm_art_desc',
										},
										{ header: 'Cantidad licitada', accessorKey: 'cant_lici' },
										{ header: 'Cantidad supre', accessorKey: 'cantidad' },

										{ header: 'Costo licitacion', accessorKey: 'cost_lici' },
										{ header: 'Costo supre', accessorKey: 'costo' },

										{ header: 'Fecha', accessorKey: 'fech_cier' },
										{ header: 'Impuesto 1', accessorKey: 'iva' },
										{ header: 'Impuesto 2', accessorKey: 'impuesto2' },
										{ header: 'Otro impuesto', accessorKey: 'otro_impuesto' },
										{ header: 'Total supre', accessorKey: 'total' },
										{ header: 'Total licitado', accessorKey: 'tota_lici' },
										{
											header: 'Presupuesto',
											accessorKey: 'clave_presupuestal',
										},
										{ header: 'Presentación', accessorKey: 'presentacion' },
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
