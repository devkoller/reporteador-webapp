import { ChevronsUpDown, } from "lucide-react"
import { EnterpriseType } from "@/types"
import { API_URL } from "@/api/config"
import { UserConfigContext } from '@/context/UserConfigContext';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useFetch } from "@/hooks"
import { useState, useEffect, useContext } from "react"



export function TeamSwitcher() {
  const { isMobile } = useSidebar()
  const [enterprises, setEnterprises] = useState<EnterpriseType[]>([])
  const { config, setValue, } = useContext(UserConfigContext);

  const { response: enterprisesData } = useFetch({
    url: "/enterprise/read/combo",
  })

  useEffect(() => {
    if (enterprisesData) {
      if (!config || !config.enterprise) {
        setValue('enterprise', enterprisesData.data[0])
      }
      setEnterprises(enterprisesData.data)
    }
  }, [enterprisesData])

  useEffect(() => {
    if (enterprisesData) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (/[1-9]/.test(event.key) && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          const index = parseInt(event.key);
          const enter = enterprises.find((e) => e.id === index);

          if (enter) {
            setValue('enterprise', enter);
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [enterprisesData, enterprises]);


  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                {(config && config.enterprise) && (
                  <>
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={`${API_URL}/enterprise/img/${config.enterprise.id}`} alt={config.enterprise.descripcion || ''} />
                      <AvatarFallback className="rounded-lg">{config.enterprise.descripcion ? `${config.enterprise.descripcion}`.toUpperCase().substring(0, 1) : ''}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {config.enterprise.descripcion}
                      </span>
                      <span className="truncate text-xs">
                        {/* {activeTeam.plan} */}
                      </span>
                    </div>
                  </>
                )}
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Corporativo
              </DropdownMenuLabel>

              {enterprises.map((team, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => {
                    setValue('enterprise', team)
                  }}
                  className="gap-2 p-2"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={`${API_URL}/enterprise/img/${team.id}`} alt={team.descripcion || ''} />
                    <AvatarFallback className="rounded-lg">{team.descripcion ? `${team.descripcion}`.toUpperCase().substring(0, 1) : ''}</AvatarFallback>
                  </Avatar>
                  {team.descripcion}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  )
}
