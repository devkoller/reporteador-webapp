import { ClientType } from "./clients"
import { ProveedorType } from "./providers"
import { ProductsType, ServiceType, PackageType } from "./products"

export interface OrderType {
	id: number
	enterpriseID: number
	warehouseID: number
	status: string
	userID: number
	notes: string
	shippingMethod: number
	paymentTerms: number
	orderDate: string
	currency: string
	createdAt: string
	subtotal: number
	tax: number
	total: number
}

export interface SellingOrderType extends OrderType {
	clientID: number
	client: ClientType
	details: SellingDetailsType[]
}

export interface PurchaseOrderType extends OrderType {
	providerID: number
	expectedDate: string
	provider: ProveedorType
	details: PurchaseDetailsType[]
}

export interface OrderDetailsType {
	id: number
	productID: number
	quantity: number
	unitPrice: number
	isPackage: boolean
	packageID: number
	isService: boolean
	serviceID: number
	product: ProductsType
	service: ServiceType
	package: PackageType
}

export interface SellingDetailsType extends OrderDetailsType {
	sellingOrderID: number
}

export interface PurchaseDetailsType extends OrderDetailsType {
	purchaseOrderID: number
}
