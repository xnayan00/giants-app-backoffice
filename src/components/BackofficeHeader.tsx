import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate, useLocation } from "react-router-dom";

interface BackofficeHeaderProps {
  userName?: string;
  userRole?: string;
}

const breadcrumbMap: Record<string, string> = {
  "/backoffice/dashboard": "Dashboard",
  "/backoffice/usuarios": "Usuários",
  "/backoffice/eventos": "Eventos",
  "/backoffice/logs": "Logs",
};

export function BackofficeHeader({ userName = "Admin", userRole = "membro" }: BackofficeHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/backoffice/login");
  };

  const breadcrumb = breadcrumbMap[location.pathname] || "Backoffice";

  return (
    <header className="h-16 bg-surface-elevated border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="flex items-center gap-2 text-sm">
          <i className="fi fi-ts-home text-muted-foreground"></i>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{breadcrumb}</span>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3 hover:bg-surface rounded-lg px-3 py-2 transition-smooth">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <i className="fi fi-ts-user text-foreground"></i>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <i className="fi fi-ts-user mr-2"></i>
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem>
            <i className="fi fi-ts-settings mr-2"></i>
            Configurações
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-400">
            <i className="fi fi-ts-sign-out-alt mr-2"></i>
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
