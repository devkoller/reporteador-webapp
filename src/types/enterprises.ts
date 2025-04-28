import { AlmacenType } from "./warehouse"

export interface EnterpriseType {
	id: number
	descripcion: string
	rfc: string
	domicilioCalle?: string
	domicilioExterior?: string
	domicilioInterior?: string
	domicilioCP?: string
	razonSocial?: string
	regimenFiscal?: string
	domicilioColonia?: string
	domicilioCiudad?: string
	domicilioEstado?: string
	domicilioPais?: string
	location?: string
	warehouse?: AlmacenType[]
}
