import { ProductsType } from "./products"

export interface InventoryType extends ProductsType {
	id: number
	productID: number
	warehouseID: number
	enterpriseID: number
	minimumStock: number
	currentStock: number
	warehouseName?: string
	status?: string
	SKU?: string
	product?: ProductsType
	updatedAt?: string
}

export interface inventoryMovementsType {
	id: number
	typeMovement: string
	warehouseID: number
	clientID: number
	providerID: number
	movementDate: string
	notes: string
	enterpriseID: number
}

export interface inventoryMovementDetailsType {
	id: number
	movementID: number
	productID: number
	quantity: number
	unitPrice: number
	packageID: number
}

export interface InventoryLots {
	id: number
	lotName: string
	productID: number
	availableQuantity: number
	expirationDate: string
	movementDetailsID: number
	warehouseID: number
	reserved: number
}

export interface InfoMovementsType {
	move: inventoryMovementsType[]
	sumPrice: number
	sumQuantity: number
	average: number
	lastPrice: number
}
