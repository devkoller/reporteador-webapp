export interface User {
	username: string
	token: string
	firstName: string
	lastName1: string
	lastName2: string
	fullName: string
	email: string
	keepSessionOpen: boolean
	status: "checking" | "authenticated" | "unauthenticated"
}
