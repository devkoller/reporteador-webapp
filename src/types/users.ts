export interface UserType {
	id: number
	username: string
	nombre: string
	correo: string
	persona: {
		nombre: string
		ape1: string
		ape2?: string
	}
	typeFilter?: string
}
