import {
	ResponsiveContainer,
	LineChart,
	Line,
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Treemap,
	ComposedChart,
	CartesianGrid,
	Area,
	Scatter,
} from 'recharts'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
// import { it } from 'node:test'

import { formatNumber, formatCurrency } from '@/utils/functions'

// Tipos de gráficas soportadas
export type ChartType = 'line' | 'bar' | 'pie' | 'treemap' | 'composed'

type Metric<T> = {
	field: string // nombre de la métrica en el chartData resultante
	label?: string // etiqueta legible (Legend)
	sumBy: (row: T) => number // cómo sumar desde el dato crudo
	fill?: string
}

export interface GenericChartProps<T> {
	data: T[]
	/**
	 * Función para extraer la clave de agrupamiento (por ejemplo: item => item.FECHA)
	 */
	getKey: (row: T) => string | undefined | null
	metrics?: Metric<T>[]
	/**
	 * Por qué campo ordenar: 'key' = por clave (lexicográfico), 'count' = por cantidad descendente
	 */
	sortBy?: 'key' | 'count' | 'noSort' | 'date'
	sortOrder?: 'asc' | 'desc'
	/**
	 * Tipo de gráfica: line, bar o pie
	 */
	chartType: ChartType
	/**
	 * Colores a usar en ciclos
	 */
	colors?: string[]
	/**
	 * Callback al filtrar (clic en un elemento), recibe la clave (string) seleccionada
	 */
	onFilter?: (key: string) => void
	/**
	 * Título opcional para mostrar encima de la gráfica
	 */
	title: string
	/**
	 * Descripción opcional para mostrar debajo del título
	 */
	description?: string
	/**
	 * Alto fijo del contenedor en píxeles
	 */
	height?: number
	/**
	 * Opcional: transforma la clave antes de agrupar (ej: convertir fecha a mes o calcular bin de edad)
	 */
	transformKey?: (rawKey: string) => string
	top?: number
	/** Texto de búsqueda y callback (search general) */
	searchText?: string
	onSearch?: (text: string) => void
	className?: string
	sumBy?: (item: T) => number
	showLegend?: boolean
	isCurrency?: boolean
}

export function GenericChart<T>({
	data,
	getKey,
	// sortBy = 'count',
	chartType,
	transformKey,
	colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0'],
	onFilter,
	title,
	description,
	height = 300,
	top = 0,
	searchText = '',
	onSearch,
	className,
	// sortOrder = 'desc',
	sumBy,
	showLegend = true,
	isCurrency = false,
	metrics,
}: GenericChartProps<T>) {
	const hasMulti = Array.isArray(metrics) && metrics.length > 0
	let chartData = hasMulti
		? buildMultiMetricData(data, getKey, metrics!)
		: buildSingleMetricData(data, getKey, sumBy)

	// Agrupa y cuenta, aplicando transformKey si existe
	const counts: Record<string, number> = {}
	data.forEach((item) => {
		const raw = getKey(item) ?? 'Desconocido'
		// if (raw === 'Desconocido') return
		const key = transformKey ? transformKey(raw) : raw
		// counts[key] = (counts[key] || 0) + 1
		counts[key] = (counts[key] || 0) + (sumBy ? Number(sumBy(item)) : 1)
	})

	// // Transforma a array
	// let chartData = Object.entries(counts).map(([key, count]) => ({
	// 	key: key != '0' ? key : 'Desconocido',
	// 	name: key != '0' ? key : 'Desconocido',
	// 	Contador: count,
	// }))

	// // Ordena según preferencia
	// if (sortBy === 'noSort') {
	// 	// No se ordena
	// } else if (sortBy === 'count') {
	// 	sortOrder === 'asc'
	// 		? chartData.sort((a, b) => a.Contador - b.Contador)
	// 		: chartData.sort((a, b) => b.Contador - a.Contador)
	// } else if (sortBy === 'date') {
	// 	// Si la clave es una fecha, se ordena como tal
	// 	chartData.sort((a, b) => {
	// 		const dateA = new Date(a.key)
	// 		const dateB = new Date(b.key)
	// 		return sortOrder === 'asc'
	// 			? dateA.getTime() - dateB.getTime()
	// 			: dateB.getTime() - dateA.getTime()
	// 	})
	// } else {
	// 	sortOrder === 'asc'
	// 		? chartData.sort((a, b) => a.key.localeCompare(b.key))
	// 		: chartData.sort((a, b) => b.key.localeCompare(a.key))
	// }

	// if (sortBy === 'key') {
	//   sortOrder === 'asc' ? chartData.sort((a, b) => a.key.localeCompare(b.key)) : chartData.sort((a, b) => b.key.localeCompare(a.key));
	//   // chartData.sort((a, b) => a.key.localeCompare(b.key));
	// } else {
	//   sortOrder === 'asc' ? chartData.sort((a, b) => a.Contador - b.Contador) : chartData.sort((a, b) => b.Contador - a.Contador)
	//   // chartData.sort((a, b) => b.Contador- a.Contador);
	// }

	// Filtro general de texto
	if (searchText && searchText.trim() !== '') {
		const term = searchText.toLowerCase()
		chartData = chartData.filter((entry) =>
			entry.key.toLowerCase().includes(term)
		)
	}

	if (top > 0) {
		chartData = chartData.slice(0, top)
	}

	const handleClick = (value?: string) => {
		if (onFilter && value != null) onFilter(value)
	}

	// Cuando metrics está presente, agregamos todas en un solo pase
	function buildMultiMetricData<T>(
		rows: T[],
		getKey: (row: T) => string | undefined | null,
		metrics: Metric<T>[]
	) {
		const acc: Record<string, any> = {}

		for (const row of rows) {
			const raw = getKey(row) ?? 'Desconocido'
			const key = raw === '0' ? 'Desconocido' : raw

			if (!acc[key]) {
				acc[key] = { key, name: key }
				// inicializa en 0 todas las métricas
				for (const m of metrics) acc[key][m.field] = 0
			}

			for (const m of metrics) {
				acc[key][m.field] += Number(m.sumBy(row) ?? 0)
			}
		}

		return Object.values(acc)
	}

	function buildSingleMetricData<T>(
		rows: T[],
		getKey: (row: T) => string | undefined | null,
		sumBy?: (row: T) => number
	) {
		const counts: Record<string, number> = {}
		rows.forEach((item) => {
			const raw = getKey(item) ?? 'Desconocido'
			const key = raw === '0' ? 'Desconocido' : raw
			counts[key] = (counts[key] || 0) + (sumBy ? Number(sumBy(item)) : 1)
		})
		return Object.entries(counts).map(([key, count]) => ({
			key,
			name: key,
			Contador: count,
		}))
	}

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-3">
				{onSearch && (
					<div>
						<input
							type="text"
							placeholder="Buscar..."
							value={searchText}
							onChange={(e) => onSearch(e.target.value)}
							className="border-2 border-gray-300 rounded p-1"
						/>
					</div>
				)}
				<div className="flex h-[400px] items-center justify-center">
					<ResponsiveContainer width="100%" height="100%">
						{chartType === 'line' ? (
							<LineChart
								data={chartData}
								onClick={({ activeLabel }) =>
									handleClick(activeLabel as string)
								}
							>
								<XAxis dataKey="key" />
								<YAxis />
								<Tooltip />
								<Line type="monotone" dataKey="Contador" stroke={colors[0]} />
							</LineChart>
						) : chartType === 'bar' ? (
							<BarChart
								data={chartData}
								onClick={({ activeLabel }) =>
									handleClick(activeLabel as string)
								}
							>
								<XAxis dataKey="key" />
								<YAxis />
								<Tooltip />
								{hasMulti ? (
									metrics!.map((m, idx) => (
										<Bar
											key={m.field}
											dataKey={m.field}
											name={m.label ?? m.field}
											fill={m.fill || colors[idx % colors.length]} // ✅ usa el color propio o del arreglo global
											barSize={22}
											radius={[4, 4, 0, 0]}
										/>
									))
								) : (
									<Bar dataKey="Contador">
										{chartData.map((entry, idx) => (
											<Cell
												key={entry.key}
												fill={colors[idx % colors.length]}
											/>
										))}
									</Bar>
								)}
								{/* <Bar dataKey="Contador">
									{chartData.map((entry, idx) => {
										console.log('entry', entry)
										return (
											<Cell
												key={entry.key}
												fill={colors[idx % colors.length]}
											/>
										)
									})}
								</Bar> */}
							</BarChart>
						) : chartType === 'treemap' ? (
							<Treemap
								data={chartData}
								nameKey="key"
								dataKey="Contador"
								stroke="#fff"
								fill="#8884d8"
								onClick={(e) => {
									handleClick(e.key || '')
								}}
							>
								<Tooltip content={<CustomTooltip />} />
							</Treemap>
						) : chartType === 'composed' ? (
							<ComposedChart
								style={{
									width: '100%',
									maxWidth: '700px',
									maxHeight: '70vh',
									aspectRatio: 1.618,
								}}
								// responsive={true}
								data={data}
								margin={{
									top: 20,
									right: 0,
									bottom: 0,
									left: 0,
								}}
							>
								<CartesianGrid stroke="#f5f5f5" />
								<XAxis dataKey="name" scale="band" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Area
									type="monotone"
									dataKey="amt"
									fill="#8884d8"
									stroke="#8884d8"
								/>
								<Bar dataKey="pv" barSize={20} fill="#413ea0" />
								<Line type="monotone" dataKey="uv" stroke="#ff7300" />
								<Scatter dataKey="cnt" fill="red" />
							</ComposedChart>
						) : (
							<PieChart>
								<Pie
									data={chartData}
									dataKey="Contador"
									nameKey="key"
									innerRadius={0}
									outerRadius={height / 3}
									onClick={({ name }) => handleClick(name as string)}
									label
								>
									{chartData.map((entry, idx) => (
										<Cell key={entry.key} fill={colors[idx % colors.length]} />
									))}
								</Pie>
								<Tooltip />
								{showLegend && (
									<Legend
										formatter={(value, entry) => {
											const val = entry?.payload?.value || 0
											// console.log("🚀 > ChartLine.tsx:209 > val:", val);
											let total = data.length
											const pct = ((val / total) * 100).toFixed(2)
											return `${value}: ${
												isCurrency
													? formatCurrency(val.toFixed(2))
													: formatNumber(val.toFixed(2))
											} (${formatNumber(pct)}%)`
										}}
									/>
								)}
							</PieChart>
						)}
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}

const CustomTooltip = ({ active, payload }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white border border-gray-300 p-2 rounded shadow-lg">
				<p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
			</div>
		)
	}

	return null
}
