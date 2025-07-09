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


import { NavLink } from "react-router-dom"

export function NavMain() {
  // const { permissions } = useContext(PermissionContext);


  const print = () => {
    return AuthNavItems.map((item, index) => {
      let subItem = item.submenu.filter((sub) => sub.menu === true)

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
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {subItem.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <NavLink to={subItem.to} className="[&.active]:bg-sky-400/20 w-full flex rounded-md">
                          <span>{subItem.title}</span>
                        </NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        )
      }

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
