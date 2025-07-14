// import { useContext } from 'react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
// import { PermissionContext } from '@/context/PermissionContext';
import { AuthNavItems } from "@/routes/routes"
import { ChevronRight } from "lucide-react"


import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useSession } from "@/hooks"


import { NavLink } from "react-router-dom"

export function NavMain() {
  // const { permissions } = useContext(PermissionContext);
  const { user } = useSession()


  const print = () => {
    return AuthNavItems.map((item, index) => {
      let subItem = item.submenu.filter((sub) => sub.menu === true)

      if (!user.permissions) return

      if (subItem.length > 0) {

        return (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title} asChild>
                  <NavLink to={`${item.to}`} className="[&.active]:bg-sky-400/20 w-full flex rounded-md" >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </NavLink>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {subItem.map((subItem) => {
                    if (!user.permissions.includes(subItem.permission || 0)) return

                    return (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <NavLink to={`${item.to}${subItem.to}`} className="[&.active]:bg-sky-400/20 w-full flex rounded-md">
                            <span>{subItem.title}</span>
                          </NavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        )
      }

      if (!user.permissions.includes(item.permission || 0) && item.to !== '/') return

      return (
        <SidebarMenuItem key={index}>
          <NavLink to={item.to} className="[&.active]:bg-sky-400/20 w-full flex  rounded-md">
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              {item.title}
            </SidebarMenuButton>
          </NavLink>
        </SidebarMenuItem>
      )
    })
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Administrativo</SidebarGroupLabel>
      <SidebarMenu>
        {print()}
      </SidebarMenu>
    </SidebarGroup>
  )
}
