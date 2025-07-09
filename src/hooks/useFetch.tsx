import fetchApi from "../api/fetchApi"
import { useSession } from "./useSession";
import { useQuery } from '@tanstack/react-query';

export interface useFetchInterface {
  url: string
  qs?: any
  token?: string
  [key: string]: any
  enabled?: boolean
}


export const useFetch = ({ url, qs, enabled = true }: useFetchInterface) => {
  const { user } = useSession()

  // Definimos la clave de consulta, incorporando 'url' y 'qs'
  const queryKey = ['fetchData', url, qs];

  // Nuestro queryFn recibe un objeto que incluye 'signal' para la cancelación
  const queryFn = async ({ signal }: { signal: AbortSignal }) => {
    const res = await fetchApi.get({ url, qs, token: user?.token, signal });
    if (!res.ok) {
      throw new Error(`Error fetching data. Status: ${res.status}`);
    }
    const json = await res.json();
    return json;
  };

  const { data, isLoading, error, refetch } = useQuery({ queryKey, queryFn, enabled });

  return {
    response: data,
    loading: isLoading,
    error: error,
    refetch: refetch,
  }
}

