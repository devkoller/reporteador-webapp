import { ProductsType } from "./products"

export interface ProveedorType {
	id: number
	nombre: string
	rfc: string
	telefono?: string
	direccionCP?: string
	direccionCalle?: string
	direccionCiudad?: string
	direccionPais?: string
	razonSocial?: string
	regimenFiscal?: string
	representanteLegal?: string
	email?: string
	products?: ProductsType[]
}
