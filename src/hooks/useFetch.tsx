import fetchApi from "../api/fetchApi"
import { useAuthStore } from "./useAuthStore"
import { useQuery } from '@tanstack/react-query';

export interface useFetchInterface {
  url: string
  qs?: any
  token?: string
  [key: string]: any
}


export const useFetch = ({ url, qs }: useFetchInterface) => {
  const { token } = useAuthStore()

  // Definimos la clave de consulta, incorporando 'url' y 'qs'
  const queryKey = ['fetchData', url, qs];

  // Nuestro queryFn recibe un objeto que incluye 'signal' para la cancelación
  const queryFn = async ({ signal }: { signal: AbortSignal }) => {
    const res = await fetchApi.get({ url, qs, token, signal });
    if (!res.ok) {
      throw new Error(`Error fetching data. Status: ${res.status}`);
    }
    const json = await res.json();
    return json;
  };

  const { data, isLoading, error, refetch } = useQuery({ queryKey, queryFn });

  return {
    response: data,
    loading: isLoading,
    error: error,
    refetch: refetch,
  }
}

