import { NavLink, useLocation, useNavigate } from "react-router-dom";
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

interface SidebarItem {
  title: string;
  url: string;
  icon: string;
  allowedRoles?: string[];
}

const items: SidebarItem[] = [
  { title: "Dashboard", url: "/backoffice/dashboard", icon: "fi fi-ts-apps", allowedRoles: ["membro"] },
  { title: "Usuários", url: "/backoffice/usuarios", icon: "fi fi-ts-users", allowedRoles: ["membro"] },
  { title: "Eventos", url: "/backoffice/eventos", icon: "fi fi-ts-calendar" },
  { title: "Logs", url: "/backoffice/logs", icon: "fi fi-ts-time-past", allowedRoles: ["membro"] },
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
    location.pathname === path ? "bg-surface-elevated text-primary font-semibold" : "text-muted-foreground hover:bg-surface-hover hover:text-foreground";

  const filteredItems = items.filter(
    (item) => !item.allowedRoles || item.allowedRoles.includes(userRole)
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-surface border-r border-border flex flex-col">
        <div className="flex-grow">
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <i className="fi fi-ts-apps text-primary-foreground text-lg"></i>
              </div>
              {!collapsed && (
                <div>
                  <h1 className="text-lg font-bold text-foreground">Backoffice</h1>
                  <p className="text-xs text-muted-foreground">Admin Panel</p>
                </div>
              )}
            </div>
          </div>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <NavLink to={item.url} end className={getNavCls(item.url)}>
                        <i className={`${item.icon} text-lg`}></i>
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
        <div className="p-4 border-t border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`flex items-center gap-3 hover:bg-surface rounded-lg px-3 py-2 transition-smooth w-full ${collapsed ? 'justify-center' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <i className="fi fi-ts-user text-foreground"></i>
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
