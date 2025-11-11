import {
	ComposedChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	Area,
	Bar,
	Line,
	Scatter,
	ResponsiveContainer,
} from 'recharts'

type MetricKind = 'bar' | 'line' | 'area' | 'scatter'

type Metric<T> = {
	field: string // clave en el data (ej. "monto_recibido")
	label?: string // etiqueta para Legend/Tooltip
	type: MetricKind // tipo de serie
	sumBy: (row: T) => number // cómo sumar desde el dato crudo
	fill?: string // color de relleno (Bar/Area/Scatter)
	stroke?: string // color de línea (Line/Area)
	stackId?: string // para apilar barras/áreas
	yAxisId?: 'left' | 'right' // si quieres doble eje Y
}

type Props<T> = {
	data: T[]
	getKey: (row: T) => string | null | undefined // eje X (categoría)
	metrics: Metric<T>[]
	colors?: string[] // fallback global
	xDataKey?: string // por si quieres cambiar "key"->"name"
	onPointClick?: (label: string) => void
}

function buildMultiMetricData<T>(
	rows: T[],
	getKey: (row: T) => string | null | undefined,
	metrics: Metric<T>[],
	xKey = 'key'
) {
	const acc: Record<string, any> = {}
	for (const r of rows) {
		const raw = getKey(r) ?? 'Desconocido'
		const k = raw === '0' ? 'Desconocido' : raw
		if (!acc[k]) {
			acc[k] = { [xKey]: k, key: k, name: k } // name y key por compatibilidad
			for (const m of metrics) acc[k][m.field] = 0
		}
		for (const m of metrics) acc[k][m.field] += Number(m.sumBy(r) ?? 0)
	}
	return Object.values(acc)
}

export function GenericComposedChart<T>({
	data,
	getKey,
	metrics,
	colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'],
	xDataKey = 'name',
	onPointClick,
}: Props<T>) {
	const chartData = buildMultiMetricData(data, getKey, metrics, xDataKey)

	const colorAt = (idx: number) => colors[idx % colors.length]

	return (
		<ResponsiveContainer width="100%" height={420}>
			<ComposedChart
				data={chartData}
				onClick={({ activeLabel }: any) =>
					activeLabel && onPointClick?.(activeLabel)
				}
				margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
			>
				<CartesianGrid stroke="#f5f5f5" />
				<XAxis dataKey={xDataKey} />
				<YAxis yAxisId="left" />
				<YAxis yAxisId="right" orientation="right" />
				<Tooltip formatter={(v: number) => Number(v).toLocaleString()} />
				<Legend />

				{metrics.map((m, idx) => {
					const fill = m.fill ?? m.stroke ?? colorAt(idx)
					const stroke = m.stroke ?? m.fill ?? colorAt(idx)
					const common = {
						key: m.field,
						dataKey: m.field,
						name: m.label ?? m.field,
						yAxisId: m.yAxisId ?? ('left' as 'left' | 'right'),
					}

					switch (m.type) {
						case 'area':
							return (
								<Area
									{...common}
									type="monotone"
									fill={fill}
									stroke={stroke}
									stackId={m.stackId}
								/>
							)
						case 'bar':
							return (
								<Bar
									{...common}
									fill={fill}
									stackId={m.stackId}
									barSize={20}
									radius={[4, 4, 0, 0]}
								/>
							)
						case 'line':
							return (
								<Line
									{...common}
									type="monotone"
									stroke={stroke}
									dot={false}
									strokeWidth={2}
								/>
							)
						case 'scatter':
							return <Scatter {...common} fill={fill} />
						default:
							return null
					}
				})}
			</ComposedChart>
		</ResponsiveContainer>
	)
}
