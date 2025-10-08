import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MobileDetector } from "@/components/MobileDetector";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Eventos from "./pages/Eventos";
import Palestras from "./pages/Palestras";
import Network from "./pages/Network";
import Profile from "./pages/Profile";
import BackofficeLogin from "./pages/BackofficeLogin";
import BackofficeDashboard from "./pages/BackofficeDashboard";
import BackofficeUsuarios from "./pages/BackofficeUsuarios";
import BackofficeEventos from "./pages/BackofficeEventos";
import BackofficeLogs from "./pages/BackofficeLogs";
import NotFound from "./pages/NotFound";
import { BackofficeLayout } from "./components/BackofficeLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          {/* Mobile Routes - Protected by MobileDetector */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={
            <MobileDetector>
              <Login />
            </MobileDetector>
          } />
          <Route path="/dashboard" element={
            <MobileDetector>
              <Dashboard />
            </MobileDetector>
          } />
          <Route path="/eventos" element={
            <MobileDetector>
              <Eventos />
            </MobileDetector>
          } />
          <Route path="/palestras" element={
            <MobileDetector>
              <Palestras />
            </MobileDetector>
          } />
          <Route path="/network" element={
            <MobileDetector>
              <Network />
            </MobileDetector>
          } />
          <Route path="/profile" element={
            <MobileDetector>
              <Profile />
            </MobileDetector>
          } />
          
          {/* Backoffice Routes */}
          <Route path="/backoffice/login" element={<BackofficeLogin />} />
          <Route path="/backoffice/dashboard" element={
            <BackofficeLayout>
              <BackofficeDashboard />
            </BackofficeLayout>
          } />
          <Route path="/backoffice/usuarios" element={
            <BackofficeLayout>
              <BackofficeUsuarios />
            </BackofficeLayout>
          } />
          <Route path="/backoffice/eventos" element={
            <BackofficeLayout>
              <BackofficeEventos />
            </BackofficeLayout>
          } />
          <Route path="/backoffice/logs" element={
            <BackofficeLayout>
              <BackofficeLogs />
            </BackofficeLayout>
          } />
          <Route path="/backoffice" element={<Navigate to="/backoffice/login" replace />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
