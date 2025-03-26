
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, GraduationCap, User, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { toast } from 'sonner';

// Form schema
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Create the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Handle login
  const handleLogin = async (values: z.infer<typeof formSchema>, userType: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in a real app, this would be an API call
      // These credential checks are just for demo purposes
      if (userType === 'admin' && values.username === 'admin' && values.password === 'password') {
        localStorage.setItem('userType', 'admin');
        localStorage.setItem('username', values.username);
        navigate('/admin');
        toast.success('Welcome back, Admin!');
      } else if (userType === 'teacher' && values.username === 'teacher' && values.password === 'password') {
        localStorage.setItem('userType', 'teacher');
        localStorage.setItem('username', values.username);
        navigate('/teacher');
        toast.success('Welcome back, Teacher!');
      } else if (userType === 'student' && values.username === 'student' && values.password === 'password') {
        localStorage.setItem('userType', 'student');
        localStorage.setItem('username', values.username);
        navigate('/student');
        toast.success('Welcome back, Student!');
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="flex flex-col items-center space-y-4 mb-8">
        <GraduationCap className="h-12 w-12 text-primary" />
        <h1 className="text-2xl font-bold text-center">Student Management System</h1>
        <p className="text-sm text-muted-foreground text-center">
          Log in to access your dashboard
        </p>
      </div>

      <Tabs defaultValue="student" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="student" className="gap-2">
            <GraduationCap className="h-4 w-4" />
            <span>Student</span>
          </TabsTrigger>
          <TabsTrigger value="teacher" className="gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Teacher</span>
          </TabsTrigger>
          <TabsTrigger value="admin" className="gap-2">
            <User className="h-4 w-4" />
            <span>Admin</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="student">
          <LoginPanel 
            form={form} 
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isLoading={isLoading}
            onSubmit={(values) => handleLogin(values, 'student')}
          />
          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">Demo credentials:</p>
            <p className="font-mono text-xs mt-1">username: student, password: password</p>
          </div>
        </TabsContent>

        <TabsContent value="teacher">
          <LoginPanel 
            form={form} 
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isLoading={isLoading}
            onSubmit={(values) => handleLogin(values, 'teacher')}
          />
          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">Demo credentials:</p>
            <p className="font-mono text-xs mt-1">username: teacher, password: password</p>
          </div>
        </TabsContent>

        <TabsContent value="admin">
          <LoginPanel 
            form={form} 
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isLoading={isLoading}
            onSubmit={(values) => handleLogin(values, 'admin')}
          />
          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">Demo credentials:</p>
            <p className="font-mono text-xs mt-1">username: admin, password: password</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface LoginPanelProps {
  form: any;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  isLoading: boolean;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

const LoginPanel = ({ 
  form, 
  showPassword, 
  setShowPassword, 
  isLoading, 
  onSubmit 
}: LoginPanelProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your username" 
                  {...field} 
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
