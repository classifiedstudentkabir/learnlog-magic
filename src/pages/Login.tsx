
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/components/LoginForm';
import { cn } from '@/lib/utils';

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const userType = localStorage.getItem('userType');
    if (userType) {
      navigate(`/${userType}`);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <div 
        className={cn(
          "relative w-full max-w-md bg-white rounded-xl shadow-xl",
          "border border-border/30 overflow-hidden",
          "animate-fadeIn"
        )}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />
        
        <LoginForm />
      </div>
      
      <p className="mt-8 text-center text-sm text-muted-foreground">
        © 2024 Student Management System v3.0.2
      </p>
    </div>
  );
};

export default Login;
