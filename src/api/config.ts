export const PORT = window.location.protocol === "http:" ? ":3070" : ":3070"

export const API_URL = import.meta.env.DEV
	? `http://${window.location.hostname}${PORT}`
	: "https://api-reportes.hcg.gob.mx"
