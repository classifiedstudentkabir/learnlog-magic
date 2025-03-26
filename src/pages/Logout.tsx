
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/utils/auth';
import { Loader2 } from 'lucide-react';

const Logout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const performLogout = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear auth data
      auth.logout();
      
      // Redirect to login
      navigate('/login');
    };
    
    performLogout();
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">Logging you out...</p>
    </div>
  );
};

export default Logout;
