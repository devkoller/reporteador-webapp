import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import hcg from "@/assets/images/hcg.png"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import { useSession } from "@/hooks"
import { mainNavItems } from "@/routes/routes"


export function MainNav() {
  const pathname = useLocation()
  const [open, setOpen] = useState(false)
  const { user } = useSession()

  const printMenuItems = () => {
    return mainNavItems.map((item) => {
      if (item?.menu === false) return null

      let subItem = item.submenu.filter((subItem) => subItem.menu === true)

      if (subItem.length === 0) {
        return (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
              <Link to={item.to} >
                {item.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )
      }


      return (
        <NavigationMenuItem key={item.title}>
          <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {subItem.map((submenuItem) => (
                <li key={submenuItem.title} className="row-span-1">
                  <NavigationMenuLink asChild>
                    <Link to={submenuItem.to || '/'}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">{submenuItem.title}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {submenuItem.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      )

    })
  }

  const printMobileMenuItems = () => {
    return mainNavItems.map((item) => {
      if (item?.menu === false) return null

      let subItem = item.submenu.filter((subItem) => subItem.menu === true)

      if (subItem.length === 0) {
        return (
          <Link
            key={item.title}
            to={item.to}
            className={cn(
              "text-lg font-medium transition-colors hover:text-primary",
              pathname.toString() === '/' ? "text-primary" : "text-muted-foreground",
            )}
            onClick={() => setOpen(false)}
          >
            {item.title}
          </Link>
        )
      }

      return (
        <div key={item.title} className="space-y-2">
          <span
            className={cn(
              "text-lg font-medium transition-colors",
              pathname.toString() === '/' ? "text-primary" : "text-muted-foreground",
            )}
          >
            {item.title}
          </span>
          {item.submenu.length > 0 && (
            <div className="ml-4 space-y-2 border-l pl-4">
              {item.submenu.map((submenuItem) => (
                <Link
                  key={submenuItem.title}
                  to={'/'}
                  className={cn(
                    "block text-sm transition-colors hover:text-primary",
                    pathname.toString() === submenuItem.to ? "text-primary" : "text-muted-foreground",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {submenuItem.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      )
    })
  }

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <img src={hcg} alt="Hospital Civil de Guadalajara" className="h-10 w-10 rounded-full" />
          <span className="hidden font-bold sm:inline-block">Hospital Civil de Guadalajara</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {printMenuItems()}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle>
                <div className="flex items-center justify-between">
                  <Link to="/" className="flex items-center space-x-2">
                    <img src={hcg} alt="Hospital Civil de Guadalajara" className="h-10 w-10 rounded-full" />
                    <span className="font-bold">Hospital Civil de Guadalajara</span>
                  </Link>
                </div>
                <SheetDescription></SheetDescription>
              </SheetTitle>
              <nav className="mt-6 flex flex-col space-y-4">
                {printMobileMenuItems()}
                <Button className="mt-4 w-full bg-red-600 hover:bg-red-700" asChild>
                  <Link to="/donar-sangre" onClick={() => setOpen(false)}>
                    Dona Sangre
                  </Link>
                </Button>

                <Button variant='outline' asChild>
                  <Link to={!user ? '/iniciar-sesion' : '/inicio'}>
                    {!user ? 'Iniciar sesión' : 'Inicio'}
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Donate Blood Button (Desktop) */}
        <div className="hidden lg:block">
          <Button className="bg-red-600 hover:bg-red-700" asChild>
            <Link to="/donar-sangre">Dona Sangre</Link>
          </Button>
        </div>

        <div className="hidden lg:block">
          <Button variant='outline' asChild>
            <Link to={user.status === 'unauthenticated' ? '/iniciar-sesion' : '/inicio'}>
              {user.status === 'unauthenticated' ? 'Iniciar sesión' : 'Inicio'}
            </Link>
          </Button>
        </div>

      </div>
    </div>
  )
}
