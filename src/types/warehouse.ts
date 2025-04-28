export interface AlmacenType {
	id: number
	nombre: string
	padre?: string
	tipo?: number
	descrip?: string
	status?: number
	updatedAt: string
	location?: string
	address?: string
	manager?: string
	managerContact?: string
	size?: string
	warehouseContact?: WarehouseContactType
	warehouseFacility?: WarehouseFacilityType
	currentProducts?: number
}

export interface WarehouseContactType {
	id: number
	id_warehouse: number
	manager: string
	number_contact: string
	email_contact: string
	operation_hours: string
}

export interface WarehouseFacilityType {
	id: number
	id_warehouse: number
	facility_size: string
	facility_notes: string
	climate_controlled: boolean
	security_system: boolean
	cold_storage: boolean
	packing_station: boolean
	loading_dock: boolean
}
