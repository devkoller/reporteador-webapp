import { useState } from "react"
import { useAuthStore } from "./useAuthStore"

import fetchApi from "@/api/fetchApi"

export interface useFetchInterface {
  url: string
  qs?: any
  token?: string
  [key: string]: any
}


export interface usePostInterface {
  url: string
  body?: any
  method?: any
  hasFiles?: boolean
  qs?: any
}


const usePost = () => {
  const { token } = useAuthStore()
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const execute = async ({
    url = "",
    body,
    method = "post",
    hasFiles = false,
    qs = {},
  }: usePostInterface) => {
    const abortController = new AbortController()
    const signal = abortController.signal
    let res, data, errors
    setLoading(true)

    try {
      res = await fetchApi[method]({
        url,
        body,
        headers: {},
        hasFiles,
        token,
        qs,
      })
      data = await res.json()

      if (!res.ok) {
        throw res
      }

      if (!signal.aborted) {
        setResponse(data)
        setError(null)
      }
    } catch (error) {
      if (!signal.aborted) {
        setResponse(null)
        setError(error)
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false)
      }
    }

    return {
      ...data,
      res,
      errors
    }
  }

  return {
    execute,
    response,
    loading,
    error
  }
}

export default usePost
