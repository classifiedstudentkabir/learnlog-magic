
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/utils/auth';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    if (auth.isAuthenticated()) {
      const userType = auth.getUserType();
      navigate(`/${userType}`);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <div className="w-full max-w-md mx-auto text-center space-y-6 animate-fadeIn">
        <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Student Management System</h1>
        <p className="text-muted-foreground">
          A comprehensive platform for managing student records, attendance, and class information.
        </p>
        <Button size="lg" onClick={() => navigate('/login')} className="gap-2">
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
