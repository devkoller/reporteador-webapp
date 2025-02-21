import fetchApi from "../api/fetchApi"
import { useEffect, useState } from "react"
import { useAuthStore } from "./useAuthStore"

export interface useFetchInterface {
	url: string
	qs?: any
	token?: string
	[key: string]: any
}

type VarsOptions = {
	response: any
	loading: boolean
	error: any
}

const useFetch = ({ url, qs }: useFetchInterface) => {
	const [vars, setVars] = useState<VarsOptions>({
		response: null,
		loading: false,
		error: null,
	})
	const { token } = useAuthStore()

	useEffect(() => {
		const abortController = new AbortController()
		const signal = abortController.signal

		const fetchData = async () => {
			setVars((e) => ({ ...e, loading: true }))
			try {
				const res = await fetchApi.get({ url, qs, signal, token })

				if (!res.ok) {
					throw res
				}

				const json = await res.json()

				if (!signal.aborted) {
					setVars((e) => ({ ...e, response: json, error: null }))
				}
			} catch (error) {
				if (!signal.aborted) {
					setVars((e) => ({ ...e, response: null, error: error }))
				}
			} finally {
				if (!signal.aborted) {
					setVars((e) => ({ ...e, loading: false }))
				}
			}
		}
		fetchData()

		return () => abortController.abort()
	}, [url, JSON.stringify(qs)])

	return {
		response: vars.response,
		loading: vars.loading,
		error: vars.error,
	}
}

export default useFetch
