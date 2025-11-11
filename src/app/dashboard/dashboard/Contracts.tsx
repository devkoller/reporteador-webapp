import { AppointmentType } from '@/types'
import { FiltersPanel, GenericChart } from '@/components/utils'
import { getAgeGroup } from '@/utils/functions'
import { useEffect, useState } from 'react'
import { ContractType, ContractAdvanceType } from '@/types'
import { useDynamicFilters, useFetch, usePost } from '@/hooks'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { FormCombobox } from '@/components/Form'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatNumber, formatCurrency } from '@/utils/functions'
import { GenericComposedChart } from '@/components/utils/GenericComposedChart'

interface comboOptionsType {
	// licitaciones: { label: string; value: string }[]
	// codigos: { label: string; value: string }[]
	ejercicios: { label: string; value: string }[]
	// proveedores: { label: string; value: string }[]
}

interface ContractQuantityType {
	uh: string
	num_licitacion: string
	proveedo_nom: string
	importe_maximo_movimientos_ci: number
}

interface Contracts {}

export const Contracts = ({}: Contracts) => {
	const [data, setData] = useState<ContractAdvanceType[]>([])
	// const [data]
	const { execute, loading: LoadingPost } = usePost()

	const [ComboOptions, setComboOptions] = useState<comboOptionsType>({
		// licitaciones: [],
		// codigos: [],
		ejercicios: [],
		// proveedores: [],
	})

	const { response: ejerciciosData } = useFetch({
		url: '/v1/data/ejercicios',
	})

	const formSchema = z.object({
		// num_licitacion: z.string().optional(),
		// cod_bar_mc_pr: z.string().optional(),
		ejercicio: z.number().optional(),
		// proveedo_nom: z.string().optional(),
		// buscador: z.string().optional(),
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			// num_licitacion: '',
			// cod_bar_mc_pr: '',
			ejercicio: 0,
			// proveedo_nom: '',
			// buscador: '',
		},
	})

	const filterableKeys: (keyof ContractAdvanceType)[] = [
		'uh',
		'num_licitacion',
		'proveedo_nom',
		'partida',
		'capitulo',
	]
	const fastFilterableKeys: (keyof ContractAdvanceType)[] = [
		'uh',
		// 'num_licitacion',
		// 'proveedo_nom',
	]

	const {
		filteredData,
		filters,
		searchFilters,
		handleInclude,
		handleExclude,
		handleSearchInclude,
		handleSearchExclude,
	} = useDynamicFilters<ContractAdvanceType>(data, filterableKeys)

	function onSubmit(values: z.infer<typeof formSchema>) {
		execute({
			url: '/v1/data/contracts_reports',
			method: 'post',
			body: values,
		}).then((res) => {
			if (res.status === 200) {
				if (res.status !== 200)
					throw new Error('Error al obtener los contratos')

				let data = res.data

				setData(data)
			} else {
				// toast({
				// 	title: 'Error cargar los datos',
				// 	description: res.message || 'Por favor, verifica tus credenciales',
				// 	variant: 'destructive',
				// })
			}
		})
	}

	useEffect(() => {
		if (ejerciciosData) {
			setComboOptions((prev) => ({
				...prev,
				ejercicios: ejerciciosData.data,
			}))
		}
	}, [ejerciciosData])

	useEffect(() => {}, [filteredData])

	return (
		<div className="space-y-8">
			<div className="">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mb-4"
					>
						<div className="flex flex-row content-between items-end gap-4">
							<FormCombobox
								label="Ejercicio"
								name="ejercicio"
								control={form.control}
								setValue={form.setValue}
								option={ComboOptions.ejercicios}
							/>
							<Button type="submit" disabled={LoadingPost}>
								Buscar
								{LoadingPost && <Spinner />}
							</Button>
							{/* <Button
								variant="outline"
								disabled={LoadingPost}
								onClick={(e) => {
									e.preventDefault()
									// form.reset({
									// 	num_licitacion: '',
									// 	cod_bar_mc_pr: '',
									// 	ejercicio: 0,
									// 	buscador: '',
									// })
								}}
							>
								Limpiar
							</Button> */}
						</div>
					</form>
				</Form>
				<div className="flex">
					<FiltersPanel<ContractAdvanceType>
						filteredData={filteredData}
						filters={filters}
						searchFilters={searchFilters}
						handleInclude={handleInclude}
						handleExclude={handleExclude}
						handleSearchInclude={handleSearchInclude}
						handleSearchExclude={handleSearchExclude}
						fastFiltersKeys={fastFilterableKeys}
					/>
					{/* <Button
						onClick={() => {
							refetchInvoices()
						}}
					>
						<RefreshCcw></RefreshCcw>
					</Button> */}
				</div>
			</div>
			<div className="grid gap-4 md:grid-cols-1">
				<GenericComposedChart
					data={filteredData}
					getKey={(r) => r.uh}
					metrics={[
						{
							field: 'monto_pendiente',
							label: 'Pendiente en OC',
							type: 'bar',
							sumBy: (r) => r.monto_pendiente,
							fill: '#f44336',
							// stroke: '#42a5f5',
							stackId: 'A',
						},
						{
							field: 'monto_recibido',
							label: 'Devengado',
							type: 'bar',
							sumBy: (r) => r.monto_recibido,
							fill: '#66bb6a',
							stackId: 'A',
						},
						{
							field: 'monto_total',
							label: 'Total en OC',
							type: 'bar',
							sumBy: (r) => r.monto_total,
							stroke: '#2196f3',
							// yAxisId: 'right',
							// stackId: 'A',
						},
						{
							field: 'importe_disponible_contrato',
							label: 'Importe Disponible contrato',
							type: 'area',
							sumBy: (r) => r.importe_disponible_contrato,
							// stroke: '#42FF42',
							fill: '#A1FFC8',
							stroke: '#79C799',
							yAxisId: 'right',
						},

						{
							field: 'importe_maximo_movimientos_ci',
							label: 'Importe Máx. Mov.',
							type: 'area',
							sumBy: (r) => r.importe_maximo_movimientos_ci,
							fill: '#C9FFF4',
							stroke: '#79D9D1',
						},
					]}
					colors={['#8884d8', '#82ca9d', '#ffc658', '#ff7300']} // fallback si alguna métrica no define color
					onPointClick={(label) => handleInclude('uh', label)}
				/>

				<GenericChart
					data={filteredData}
					getKey={(item) => item.uh}
					sumBy={(item) => item.importe_maximo_movimientos_ci} // <- suma campo 'total' en vez de contar
					chartType="pie"
					isCurrency={true}
					onFilter={(val) => handleInclude('uh', val)}
					title="Contratos HCG"
					// description="ontratos del HCG"
				/>
			</div>
			<div>
				<GenericChart
					data={filteredData}
					getKey={(item) => item.num_licitacion}
					sumBy={(item) => item.importe_maximo_movimientos_ci}
					// transformKey={getAgeGroup}
					onFilter={(val) => handleInclude('num_licitacion', val)}
					chartType="bar"
					isCurrency={true}
					showLegend={false}
					title="Distribución por contratos"
				/>
			</div>
			<div className="grid gap-4 md:grid-cols-1">
				<GenericChart
					data={filteredData}
					getKey={(item) => item.proveedo_nom}
					sumBy={(item) => item.importe_maximo_movimientos_ci} // <- suma campo 'total' en vez de contar
					chartType="bar"
					metrics={[
						{
							field: 'monto_recibido',
							label: 'Recibido en OC',
							sumBy: (r) => r.monto_recibido,
							fill: '#4caf50',
						},
						{
							field: 'monto_pendiente',
							label: 'Pendiente en OC',
							sumBy: (r) => r.monto_pendiente,
							fill: '#f44336',
						},
						{
							field: 'monto_total',
							label: 'Total en OC',
							sumBy: (r) => r.monto_total,
							fill: '#2196f3',
						},
						{
							field: 'importe_maximo_movimientos_ci',
							label: 'Importe máximo C/I contrato',
							sumBy: (r) => r.importe_maximo_movimientos_ci,
							fill: '#ff9800',
						},
						{
							field: 'importe_disponible_contrato',
							label: 'Importe Disponible contrato',
							sumBy: (r) => r.importe_disponible_contrato,
							fill: '#42FF42',
						},
					]}
					onFilter={(val) => handleInclude('proveedo_nom', val)}
					title="Avance de contratos del HCG"
					description="Avance de contratos"
					showLegend={false}
				/>

				{/* <GenericChart
					data={data}
					getKey={(item) => item.num_licitacion}
					sumBy={(item) => item.importe_maximo_movimientos_ci}
					// transformKey={getAgeGroup}
					// onFilter={(val) => handleFilter('AgeGroup', val)}
					chartType="pie"
					showLegend={false}
					title="Distribución por contratos"
				/> */}
			</div>
			<div>
				<GenericChart
					data={filteredData}
					getKey={(item) => item.capitulo.toString()}
					sumBy={(item) => item.importe_maximo_movimientos_ci} // <- suma campo 'total' en vez de contar
					chartType="pie"
					onFilter={(val) => handleInclude('capitulo', val)}
					title="Por capitulo"
					description="Por capitulo"
					showLegend={false}
				/>
			</div>
			<div className="">
				<GenericChart
					data={filteredData}
					getKey={(item) => item.partida.toString()}
					sumBy={(item) => item.importe_maximo_movimientos_ci} // <- suma campo 'total' en vez de contar
					chartType="bar"
					onFilter={(val) => handleInclude('partida', val.toString())}
					title="Por partida"
					description="Por partida"
					showLegend={false}
				/>
			</div>

			{/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<GenericChart
					data={data}
					getKey={(item) => item.Estado}
					chartType="bar"
					onFilter={(val) => handleFilter('Estado', val)}
					onSearch={(text) => handleSearch('Estado', text)}
					searchText={searchFilters['Estado']?.include || ''}
					title="Estados de Residencia"
					description="Los 20 estados donde residen más pacientes"
					top={20}
				/>

				<GenericChart
					data={data}
					getKey={(item) => item.Municipio}
					chartType="bar"
					onFilter={(val) => handleFilter('Municipio', val)}
					onSearch={(text) => handleSearch('Municipio', text)}
					searchText={searchFilters['Municipio']?.include || ''}
					title="Municipios de Residencia"
					description="Los 20 municipios donde residen más pacientes"
					top={20}
				/>

				<GenericChart
					data={data}
					getKey={(item) => item.Colonia}
					chartType="treemap"
					onFilter={(val) => handleFilter('Colonia', val)}
					onSearch={(text) => handleSearch('Colonia', text)}
					searchText={searchFilters['Colonia']?.include || ''}
					title="Colonias de Residencia"
					description="Los 40 colonias donde residen más pacientes"
					top={40}
				/>
			</div> */}
		</div>
	)
}
