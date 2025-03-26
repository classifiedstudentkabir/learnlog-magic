
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "@/utils/auth";

// Pages
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const isAuth = auth.isAuthenticated();
      setIsAuthenticated(isAuth);
      setUserType(auth.getUserType());
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-primary/20 h-12 w-12 mb-4"></div>
          <div className="h-4 bg-primary/20 rounded-full w-24 mb-2.5"></div>
          <div className="h-2 bg-primary/10 rounded-full w-16"></div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={
              isAuthenticated ? <Navigate to={`/${userType}`} /> : <Login />
            } />
            <Route path="/logout" element={<Logout />} />

            {/* Protected Routes */}
            <Route path="/admin" element={
              userType === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />
            } />
            <Route path="/teacher" element={
              userType === 'teacher' ? <TeacherDashboard /> : <Navigate to="/login" />
            } />
            <Route path="/student" element={
              userType === 'student' ? <StudentDashboard /> : <Navigate to="/login" />
            } />

            {/* Catch-all route */}
            <Route path="/" element={
              isAuthenticated ? <Navigate to={`/${userType}`} /> : <Navigate to="/login" />
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
