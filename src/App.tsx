import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Scanner from "./pages/Scanner";
import Actualites from "./pages/Actualites";
import Outils from "./pages/Outils";
import Assistant from "./pages/Assistant";
import Guides from "./pages/Guides";
import Lab from "./pages/Lab";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute"; // Added
import Pricing from "./pages/Pricing";
import { AuthProvider } from './contexts/AuthContext';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/actualites" element={<Actualites />} />
            <Route path="/outils" element={<Outils />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/login" element={<Login />} />
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route path="/pricing" element={<Pricing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
