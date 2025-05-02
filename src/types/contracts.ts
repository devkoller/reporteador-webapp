import { EnterpriseType } from "./enterprises"

export interface ContractType {
	id: number
	name: string
	typeContract: number
	value: number
	clientID: number
	enterpriseID: number
	codeContract: string
	startDate: string
	endDate: string
	description: string
	terms: string
	estatus: "active" | "completed" | "canceled"
	userID: number
	createdAt: string
	updatedAt: string
	enterprise?: EnterpriseType
}

export interface ContactsType {
	id?: number
	name: string
	email: string
	phone: string
	position: string
	contractID?: number
	isPrimaryContact: boolean
	createdAt?: string
	updatedAt?: string
}

export interface DocumentsType {
	id?: number
	name: string
	extension: string
	path: string
	size: number
	contractID?: number
	createdAt?: string
	updatedAt?: string
}
