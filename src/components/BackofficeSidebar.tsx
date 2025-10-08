import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

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
}

export function BackofficeSidebar({ userRole = "user" }: BackofficeSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-surface-elevated text-primary font-semibold" : "text-muted-foreground hover:bg-surface-hover hover:text-foreground";

  const filteredItems = items.filter(
    (item) => !item.allowedRoles || item.allowedRoles.includes(userRole)
  );

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"}>
      <SidebarContent className="bg-surface border-r border-border">
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
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <i className={`${item.icon} text-lg`}></i>
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
