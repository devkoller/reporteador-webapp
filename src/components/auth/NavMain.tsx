import { useContext } from 'react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { PermissionContext } from '@/context/PermissionContext';
import { UserConfigContext } from '@/context/UserConfigContext';



import { routes as menus } from "@/routes/routes"
import { Link } from "react-router-dom"

export function NavMain() {
  const { permissions } = useContext(PermissionContext);
  const { config } = useContext(UserConfigContext);


  const print = () => {
    return menus.map((item, index) => {
      if (!item.menu) return
      let menu = item.route.split("/")[1];

      if (!config) {
        return
      }

      let access = Array.isArray(permissions)
        ? permissions.find((perm: any) => {
          return perm.permission.resource === menu && perm.permission.action === "read" && perm.permission.enterpriseID === config.enterprise.id;
        })
        : undefined;

      if (!access && item.needGrants) return

      return (
        <SidebarMenuItem key={index}>
          <Link to={item.route}>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      )
    })
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
      <SidebarMenu>
        {print()}
      </SidebarMenu>
    </SidebarGroup>
  )
}
