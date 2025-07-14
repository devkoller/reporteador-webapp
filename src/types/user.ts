export interface User {
	username: string
	token: string
	firstName: string
	lastName1: string
	lastName2: string
	fullName: string
	email?: string
	permissions: number[]
	status: "checking" | "authenticated" | "unauthenticated"
}

export interface UserAttributes {
	id: number
	username: string
	fullName: string
	firstName: string
	lastName1: string
	lastName2: string
}

export interface PermissionsAttributes {
	id: string
	name: string
	description?: string
	parent: string | null
	icon?: string
}

export interface UserPermissionsAttributes {
	id: string
	permissionID: string
	userID: string
}

export interface CentersAttributes {
	id: string
	name: string
	description?: string
}
