import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuthenticated: "Checking", // checking, true, false
		id: null,
		username: null,
		fullname: null,
		name: null,
		lastName1: null,
		lastName2: null,
		correo: null,
		telefono: null,
		keepSessionOpen: null,
		permisos: null,
		token: null,
		error: null,
		errorMessage: null,
		loading: true,
	},
	reducers: {
		onLogin: (state, { payload }) => {
			state.isAuthenticated = "Authenticated"
			state.id = payload.id
			state.username = payload.username
			state.fullname = payload.fullname
			state.name = payload.name
			state.lastName1 = payload.lastName1
			state.lastName2 = payload.lastName2
			state.correo = payload.correo
			state.telefono = payload.telefono
			state.keepSessionOpen = payload.keepSessionOpen
			state.permisos = payload.permisos
			state.token = payload.token
			state.error = null
			state.errorMessage = null
			state.loading = false
		},
		/* Setting the state to the initial state. */
		onLogout: (state, { payload }) => {
			state.isAuthenticated = "Not Authenticated"
			state.id = null
			state.username = null
			state.fullname = null
			state.name = null
			state.lastName1 = null
			state.lastName2 = null
			state.correo = null
			state.keepSessionOpen = null
			state.permisos = null
			state.token = null
			state.error = null
			state.errorMessage = payload
			state.loading = false
		},
		onCheckingCredentials: (state) => {
			state.isAuthenticated = "Checking"
			state.error = null
			state.errorMessage = null
			state.loading = true
		},
		clearErrorMessage: (state) => {
			state.errorMessage = null
		},
	},
})

export const { onLogin, onLogout, onCheckingCredentials, clearErrorMessage } =
	authSlice.actions
