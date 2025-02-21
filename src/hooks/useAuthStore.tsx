import { useLocalStorage } from "./useLocalStorage"
import { useSessionStorage } from "./useSessionStorage"
import {
  clearErrorMessage,
  onCheckingCredentials,
  onLogin,
  onLogout,
} from "../store/slice/index.ts"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./redux.ts"
import { loginService, updatePermissions } from "@/service/authService.ts"


type startLogin = {
  username: string
  password: string
  keepSessionOpen: boolean
}

export const useAuthStore = () => {
  const dispatch = useAppDispatch()

  const [localStorage, setLocalStorage] = useLocalStorage({
    key: "localStorage",
    defaultValue: {},
  })

  const [sessionStorage, setSessionStorage] = useSessionStorage({
    key: "sessionStorage",
    defaultValue: {},
  })

  const {
    id,
    username,
    name,
    correo,
    telefono,
    permisos,
    keepSessionOpen,
    token,
    isAuthenticated,
    errorMessage,
  } = useAppSelector((state) => {
    return state.auth
  })


  const startLogin = async (body: startLogin) => {
    dispatch(onCheckingCredentials())

    try {
      const result = await loginService(body)

      if (!result.ok) {
        dispatch(onLogout({}))
        return
      }

      let data = await result.json()
      data = data.data

      const session = {
        id: data.id,
        username: data.username,
        name: data.name,
        correo: data.correo,
        telefono: data.telefono,
        keepSessionOpen: data.keepSessionOpen,
        token: data.token,
        permisos: data.permisos,
      }

      dispatch(onLogin(session))

      body.keepSessionOpen
        ? setLocalStorage(session)
        : setSessionStorage(session)
    } catch (error) {
      dispatch(onLogout("Hubo un error al intentarse autenticar"))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  const startLogout = async () => {
    try {
      setSessionStorage({})
      setLocalStorage({})
      dispatch(onLogout({}))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const checkAuth = async (session: any) => {
      try {
        const result = await updatePermissions(session.token)
        const data = await result.json()

        if (!result.ok) {
          throw new Error("Error al actualizar permisos")
        }

        dispatch(
          onLogin({
            ...session,
            permisos: data.data,
          })
        )

      } catch (error) {
        dispatch(
          onLogin({
            ...session,
          })
        )
        // startLogout()
      }
    }

    try {
      if (Object.keys(localStorage).length === 0 && Object.keys(sessionStorage).length === 0) {
        dispatch(onLogout({}))
        return
      }
      if (isAuthenticated === "Not Authenticated") return
      if (Object.keys(localStorage).length > 0) {
        checkAuth(localStorage)
      }
      if (Object.keys(sessionStorage).length > 0) {
        checkAuth(sessionStorage)
      }
    } catch (error) {
      startLogout()
    }
  }, [])

  return {
    id,
    username,
    name,
    correo,
    telefono,
    token,
    keepSessionOpen,
    permisos,
    isAuthenticated,
    errorMessage,
    startLogin,
    startLogout,
  }
}
