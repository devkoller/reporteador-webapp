export const PORT = window.location.protocol === "http:" ? ":3030" : ":3013"

export const API_URL = import.meta.env.DEV
	? `http://${window.location.hostname}${PORT}`
	: "https://api.meditiva.com.mx"
