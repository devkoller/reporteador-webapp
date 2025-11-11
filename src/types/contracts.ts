export interface ContractType {
	aprovisionamiento: number
	art_mc_nom: string
	cod_art_mc_pk: number
	cod_art_mc_pk_ant: number
	cod_bar_mc_pr: number
	codigo: string
	consumido: number
	consumo: number
	contrato_pk: number
	cta_contable: number
	ejercicio: number
	estado: number
	fecha: string
	fondeo: number
	libera_30: number
	licitado: number
	marca: string
	max: number
	maximo_dinero: number
	min: number
	minio_dinero: number
	nuevas: number
	num_licitacion: string
	precio: number
	presentacion: string
	proveedo_nom: string
	proveedo_pk: number
	proveedo_pk_ant: number
	subrogado: number
	tenita_porciento: number
	unidad: string
	unidad_hosp_pk: number
	vigencia_fin: string
	vigencia_inicio: string
}

export interface ContractAdvanceType extends ContractType {
	partida: number
	disponible_contrato: number
	precio_ci: number
	importe_maximo_ci: number
	importe_maximo_movimientos_ci: number
	importe_disponible_contrato: number
	importe_disponible_ci: number
	pendiente_en_oc: number
	recibido_en_oc: number
	cantidad_en_oc: number
	cantidad_convertida_en_oc: number
	factor_conversion: number
	monto_recibido: number
	monto_pendiente: number
	monto_cancelado: number
	monto_total: number
	uh: string
	capitulo: number
}
