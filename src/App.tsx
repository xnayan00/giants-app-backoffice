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
import Backoffice from "./pages/Backoffice";
import NotFound from "./pages/NotFound";

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
          
          {/* Desktop Route - Backoffice */}
          <Route path="/backoffice" element={<Backoffice />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
