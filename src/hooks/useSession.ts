import { useStore } from "@tanstack/react-store"
import { sessionStore } from "../store/sessionStore"
import { User } from "@/types"
import { useEffect } from "react"
import { useSessionStorage } from "./useSessionStorage"
import { useLocalStorage } from "./useLocalStorage"

export const useSession = () => {
	// Subscribe to `user` slice of state
	const user = useStore(sessionStore, (state) => state.user)

	const [localStorage, setLocalStorage] = useLocalStorage({
		key: "localStorage",
		defaultValue: {},
	})

	const [sessionStorage, setSessionStorage] = useSessionStorage({
		key: "sessionStorage",
		defaultValue: {},
	})

	// Rehydrate on component mount in case
	useEffect(() => {
		if (
			Object.keys(localStorage).length === 0 &&
			Object.keys(sessionStorage).length === 0
		) {
			clearUser()
			return
		}

		// console.log(localStorage, sessionStorage)

		if (!localStorage?.status && !sessionStorage?.status) {
			clearUser()
			return
		}

		if (Object.keys(localStorage).length > 0) {
			setUser(localStorage)
		}
		if (Object.keys(sessionStorage).length > 0) {
			setUser(sessionStorage)
		}
	}, [])

	// Actions to update session
	const setUser = (user: User) => {
		sessionStore.setState(() => ({ user }))

		if (user.keepSessionOpen) {
			setLocalStorage(user)
		} else {
			setSessionStorage(user)
		}
	}

	const clearUser = () => {
		setSessionStorage({})
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
				keepSessionOpen: false,
				status: "unauthenticated",
			},
		}))
	}

	return { user, setUser, clearUser }
}
