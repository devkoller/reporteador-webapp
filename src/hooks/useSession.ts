import { useStore } from "@tanstack/react-store"
import { sessionStore } from "../store/sessionStore"
import { User } from "@/types"
import { useEffect } from "react"
import { useLocalStorage } from "./useLocalStorage"
import fetchApi from "@/api/fetchApi"

export const useSession = () => {
	// Subscribe to `user` slice of state
	const user = useStore(sessionStore, (state) => state.user)

	const [localStorage, setLocalStorage] = useLocalStorage({
		key: "localStorage",
		defaultValue: {},
	})

	// Rehydrate on component mount in case
	useEffect(() => {
		if (Object.keys(localStorage).length === 0) {
			clearUser()
			return
		}

		if (!localStorage?.status) {
			clearUser()
			return
		}

		if (Object.keys(localStorage).length > 0) {
			setUser(localStorage)
		}
	}, [])

	useEffect(() => {
		if (!user?.token || user.status !== "authenticated") return
		const abortController = new AbortController()
		const signal = abortController.signal

		const payload = JSON.parse(atob(user.token.split(".")[1]))
		const exp = payload.exp * 1000
		const tiempoRestante = exp - Date.now()

		const fetchData = async () => {
			try {
				const res = await fetchApi["post"]({
					url: "/v1/user/refresh-token",
					token: user.token,
					signal,
				})

				if (!res.ok) {
					throw new Error(`Error fetching data. Status: ${res.status}`)
				}
				const json = await res.json()

				const newToken = json.data.token

				if (json.status !== 200) {
					console.log("🚀 > useSession.ts:73 > fetchData > json:", json)
					// clearUser()
				}

				const newUser = {
					...user,
					token: newToken,
				}

				sessionStore.setState(() => ({ user: newUser }))
				setLocalStorage(newUser)
			} catch (error) {
				console.log("🚀 > useSession.ts:85 > fetchData > error:", error)
				// clearUser()
			}
		}

		const fetchDataPermissions = async () => {
			try {
				const res = await fetchApi["post"]({
					url: "/v1/user/refresh-permissions",
					token: user.token,
					signal,
				})
				// console.log("🚀 > useSession.ts:121 > fetchDataPermissions > res:", res)

				if (!res.ok) {
					throw new Error(`Error fetching data. Status: ${res.status}`)
				}
				const json = await res.json()

				const permissions = json.data

				if (json.status !== 200) {
					console.log("🚀 > useSession.ts:73 > fetchData > json:", json)
					// clearUser()
				}

				const newUser = {
					...user,
					permissions,
				}

				sessionStore.setState(() => ({ user: newUser }))
				setLocalStorage(newUser)
			} catch (error) {
				// console.log("🚀 > useSession.ts:85 > fetchData > error:", error)
				clearUser()
			}
		}

		if (tiempoRestante < 10 * 60 * 1000) {
			fetchData()
		}

		if (exp - Date.now() < 0) {
			clearUser()
		}

		fetchDataPermissions()

		return () => abortController.abort()
	}, [user?.token])

	// Actions to update session
	const setUser = (user: User) => {
		sessionStore.setState(() => ({ user }))
		setLocalStorage(user)
	}

	const clearUser = () => {
		setLocalStorage({})
		sessionStore.setState(() => ({
			user: {
				username: "",
				token: "",
				firstName: "",
				lastName1: "",
				lastName2: "",
				fullName: "",
				email: "",
				permissions: [],
				status: "unauthenticated",
			},
		}))
	}

	return { user, setUser, clearUser }
}
