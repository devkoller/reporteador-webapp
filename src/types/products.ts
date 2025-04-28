export interface ProductsType {
	id: number
	nombre: string
	descrip: string
	marca: string
	categoryID: string
	measureUnit: string
	size: string
	enterpriseID: number
	SKU?: string
	price?: number
	currentStock?: number
	minimumStock?: number
	status?: string
	isProductProvider?: boolean
}

export interface PackageComponentsType {
	packageID: number
	productID: string
	quantity: number
	product?: ProductsType
	isService?: boolean
	serviceID?: number
	service?: ServiceType
	unitPrice?: number
}

export interface PackageType {
	id: string
	enterpriseID: number
	name: string
	description: string
	price: number
	type: string
	items: PackageComponentsType[]
	entityID: number
}

export interface ServiceType {
	id: number
	SKU?: string
	name: string
	description: string
	typeService: string
	categoryID: number
	categoryName?: string
	enterpriseID: number
}
