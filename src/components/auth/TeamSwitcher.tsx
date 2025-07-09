import hcg from "@/assets/images/hcg.png"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"



export function TeamSwitcher() {



  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={hcg} alt='Hospital Civil de Guadalajara' />
              <AvatarFallback className="rounded-lg">HCG</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                Hospital Civil de Guadalajara
              </span>
              <span className="truncate text-xs">
                {/* {activeTeam.plan} */}
              </span>
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  )
}
