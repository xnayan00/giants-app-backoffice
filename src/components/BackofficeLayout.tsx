import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BackofficeSidebar } from "@/components/BackofficeSidebar";
import { BackofficeHeader } from "@/components/BackofficeHeader";

interface BackofficeLayoutProps {
  children: ReactNode;
}

export function BackofficeLayout({ children }: BackofficeLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string>("user");
  const [userName, setUserName] = useState<string>("Admin");
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simular verificação de autenticação
    const auth = localStorage.getItem("backoffice_auth");
    const role = localStorage.getItem("backoffice_role") || "user";
    const name = localStorage.getItem("backoffice_name") || "Admin";

    setIsAuthenticated(auth === "true");
    setUserRole(role);
    setUserName(name);
    setLoading(false);
  }, []);

  // Verificar permissões de rota
  const restrictedRoutes = ["/backoffice/dashboard", "/backoffice/usuarios", "/backoffice/logs"];
  const isRestrictedRoute = restrictedRoutes.includes(location.pathname);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/backoffice/login" replace />;
  }

  // Redirecionar se não tiver permissão
  if (isRestrictedRoute && userRole !== "membro") {
    return <Navigate to="/backoffice/eventos" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <BackofficeSidebar userRole={userRole} />
        <div className="flex-1 flex flex-col">
          <BackofficeHeader userName={userName} userRole={userRole} />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
