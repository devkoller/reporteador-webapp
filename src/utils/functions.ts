type genericType = {
	[key: string]: any
}

interface handleExcelProps {
	data: genericType[]
	Columns: genericType[]
	execute: (params: { url: string; body: genericType }) => Promise<any>
}

function formatCurrency(value: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(value)
}

function getAgeGroup(fecha_nac?: string): string {
	if (!fecha_nac) return "Desconocido"

	const birth = new Date(fecha_nac)
	const now = new Date()

	const diffMs = now.getTime() - birth.getTime()
	const diffDays = diffMs / (1000 * 60 * 60 * 24)

	// 1. Menos de 30 días
	if (diffDays < 30) {
		return "0 - 30 días"
	}

	// 2. Entre 30 días y menos de 1 año
	if (diffDays < 365.25) {
		return "1 mes a menor de 1 año"
	}

	// A partir de aquí contamos en años completos
	const ageYears = Math.floor(diffDays / 365.25)

	// 3. De 1 a 4 años
	if (ageYears <= 4) {
		return "01 – 04 años"
	}

	// 4. Intervalos de 5 años (5–9, 10–14, …, 60–64)
	if (ageYears < 65) {
		const start = Math.floor((ageYears - 5) / 5) * 5 + 5
		const end = start + 4
		if (start < 10) {
			return `0${start}–0${end} años`
		}
		return `${start}–${end} años`
	}

	// 5. 65 años en adelante
	return "65+ años"
}

function tiempoAMilisegundos(hhmm: string): number {
	const [h, m] = hhmm.split(":").map(Number)
	return (h * 60 + m) * 60_000 // horas→minutos→milisegundos
}

function formatoHHMMSS(ms: number): string {
	const totalSeg = Math.floor(ms / 1000)
	const horas = Math.floor(totalSeg / 3600)
	const minutos = Math.floor((totalSeg % 3600) / 60)
	const segundos = totalSeg % 60
	return `${horas}h ${minutos}m ${segundos}s`
}

const handleExcel = async ({ data, Columns, execute }: handleExcelProps) => {
	const filteredData = data.map((item) => {
		const filteredItem: any = {}
		Columns.forEach((col: genericType) => {
			if ("accessorKey" in col) {
				filteredItem[col.accessorKey as keyof genericType] = item[
					col.accessorKey as keyof genericType
				]
					?.toString()
					.trim()
			}
		})
		return filteredItem
	})

	execute({
		url: "/api/patients/report/excel",
		body: {
			columns: Columns.map((col) =>
				"accessorKey" in col ? col.accessorKey : undefined
			),
			data: filteredData,
			title: "Citas",
		},
	})
		.then((resp) => {
			const byteCharacters = atob(resp.data)
			const byteNumbers = new Uint8Array(byteCharacters.length)

			for (let i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i)
			}

			const blob = new Blob([byteNumbers], { type: "application/xlsx" })
			const url = URL.createObjectURL(blob)

			const a = document.createElement("a")
			a.href = url
			a.download = "Citas.xlsx"
			document.body.appendChild(a)
			a.click()
			a.remove()
			URL.revokeObjectURL(url)
		})
		.catch((error) => {
			console.log("🚀 > Data.tsx:51 > handleExcel > error:", error)
		})
}

export {
	formatCurrency,
	getAgeGroup,
	tiempoAMilisegundos,
	formatoHHMMSS,
	handleExcel,
}
