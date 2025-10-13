import { matchPath, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import SymbolWhite from "@/assets/symbol-white.svg";
import LogoHorizontalWhite from "@/assets/logo-horizontal-white.svg";
import PatternBg2 from "@/assets/pattern-bg-2.png";

interface SidebarItem {
  title: string;
  url: string;
  icon: string;
  allowedRoles?: string[];
}

const items: SidebarItem[] = [
  { title: "Dashboard", url: "/backoffice/dashboard", icon: "chart-pie-alt", allowedRoles: ["membro"] },
  { title: "Usuários", url: "/backoffice/usuarios", icon: "users", allowedRoles: ["membro"] },
  { title: "Eventos", url: "/backoffice/eventos", icon: "calendar" },
  { title: "Logs", url: "/backoffice/logs", icon: "search-alt", allowedRoles: ["membro"] },
];

interface BackofficeSidebarProps {
  userRole?: string;
  userName?: string;
}

export function BackofficeSidebar({ userRole = "user", userName = "Admin" }: BackofficeSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const collapsed = state === "collapsed";

  const getNavCls = (path: string) =>
    location.pathname === path ? "bg-[#2b2b2b] text-primary font-semibold" : "text-muted-foreground hover:bg-surface-hover hover:text-foreground";

  const filteredItems = items.filter(
    (item) => !item.allowedRoles || item.allowedRoles.includes(userRole)
  );

  function checkIsActive(path: string) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { pathname } = useLocation()
  
      return matchPath({ path, end: false }, pathname)
    }

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-surface flex flex-col" style={{backgroundImage: `url(${PatternBg2})`, backgroundSize: '300px', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom right'}}>
        <div className="flex-grow">
          <div className="group-data-[collapsible=icon]:!p-2 p-6">
            <div className="flex items-center group-data-[collapsible=icon]:!justify-center gap-3">
              {!collapsed ? (
                <img src={LogoHorizontalWhite} alt="Símbolo Giants" width="500px"/>
              ) : (
                <img src={SymbolWhite} alt="Logotipo Giants" width="50px" />
              )}
            </div>
          </div>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <NavLink to={item.url} end className={`p-6 transition-all duration-300 ${getNavCls(item.url)}`}>
                        <i className={`flex align-center fi fi-${checkIsActive(item.url) ? "ss-" : "ts-"}${item.icon} text-lg`}></i>
                        {!collapsed && <span className="ml-3">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* User button at the bottom */}
        <div className="p-4 group-data-[collapsible=icon]:px-[4px]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`flex items-center gap-3 hover:bg-surface-elevated bg-surface-elevated group-data-[collapsible=icon]:bg-transparent rounded-lg px-3 py-2 transition-smooth w-full ${collapsed ? 'justify-center' : ''}`}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <i className="fi fi-ts-circle-user text-white flex align-center justify-center text-2xl"></i>
                </div>
                {!collapsed && (
                  <div className="text-left flex-grow">
                    <p className="text-sm font-medium text-foreground">{userName}</p>
                    <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="w-48 mb-2">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/backoffice/login')} className="text-red-400">
                <i className="fi fi-ts-sign-out-alt mr-2"></i>
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
