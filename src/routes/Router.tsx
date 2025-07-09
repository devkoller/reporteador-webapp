import { Route, Routes, Navigate } from "react-router-dom"
import { Landing } from "@/app/index"
import { mainNavItems, limboNavItems, AuthNavItems } from "./routes"
import { useSession } from "@/hooks"

export const Router = () => {
  const { user } = useSession()

  const printPageRoutes = () => {

    const routes: any = [];

    mainNavItems.map((item) => {
      if (item.component) {
        routes.push({
          to: item.to,
          component: item.component,
        });
      }

      if (Array.isArray(item.submenu)) {
        item.submenu.forEach(sub => {


          if (sub.component) {
            routes.push({
              to: sub.to,
              component: sub.component,
            });
          }
        });
      }

    })

    return routes.map((item: any, index: number) => {
      return <Route
        key={index}
        path={item.to}
        element={<item.component />}
      />
    })
  }

  const printLimboRoutes = () => {
    return limboNavItems.map((item: any, index: number) => {
      if (user.status === 'authenticated') {
        return <Route
          key={index}
          path={'/'}
          element={<Navigate to='/inicio' />}
        />
      }

      return <Route
        key={index}
        path={item.to}
        element={<item.component />}
      />
    })
  }

  const printAuthRoutes = () => {

    const routes: any = [];

    AuthNavItems.map((item) => {
      if (item.component) {
        routes.push({
          to: item.to,
          component: item.component,
        });
      }

      if (Array.isArray(item.submenu)) {
        item.submenu.forEach(sub => {


          if (sub?.component) {
            routes.push({
              to: sub?.to,
              component: sub?.component,
            });
          }
        });
      }

    })

    return routes.map((item: any, index: number) => {
      return <Route
        key={index}
        path={item.to}
        element={<item.component />}
      />
    })
  }

  if (user.status === 'checking') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div >
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {printPageRoutes()}

      {user.status === 'unauthenticated' &&
        <>
          {printLimboRoutes()}
        </>
      }

      {user.status === 'authenticated' &&
        <>
          {printAuthRoutes()}
        </>
      }
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
