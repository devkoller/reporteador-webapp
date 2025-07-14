import { Store } from "@tanstack/react-store"
import { User } from "@/types"

// Session state shape
interface SessionState {
	user: User
}

export const loadSession = (): SessionState => {
	return {
		user: {
			username: "",
			token: "",
			firstName: "",
			lastName1: "",
			lastName2: "",
			fullName: "",
			email: "",
			permissions: [],
			status: "checking",
		},
	}
}

// Create the store with the loaded session
export const sessionStore = new Store<SessionState>(loadSession())

// Subscribe and persist any changes
sessionStore.subscribe(() => {})

// Rehydrate immediately to update any subscribers after init
if (typeof window !== "undefined") {
	sessionStore.setState(() => loadSession())
}
