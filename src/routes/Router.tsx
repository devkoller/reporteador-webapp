import { Route, Routes, Navigate } from "react-router-dom"
import { Landing } from "@/views/Landing"
import { useAuthStore } from "@/hooks"
import { routes as elements } from "@/utils"
import { Building } from "@/views/Building"

export const Router = () => {
  const { isAuthenticated } = useAuthStore()

  const printRoutes = () => {
    return elements.map((route) => {
      if (route.state === isAuthenticated) {
        if (route.submenus) {
          return (
            <Route key={route.route} path={route.route}>
              {route.submenus.map((submenu) => {
                return <Route key={submenu.route} path={submenu.route} element={<submenu.component />} />
              })}
            </Route>
          )
        }
        return (
          <Route
            key={route.route}
            path={route.route}
            element={<route.component />}
          />
        )
      } else {
        if (route.state === "Authenticated") {
          return <Route key={route.route} path={route.route} element={<Navigate to="/login" />} />
        } else {
          return <Route key={route.route} path={route.route} element={<Navigate to="/home" />} />
        }
      }
    })
  }

  if (isAuthenticated === "Checking") {
    return <Building />
  }


  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {printRoutes()}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
