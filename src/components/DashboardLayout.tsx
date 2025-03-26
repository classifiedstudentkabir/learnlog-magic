
import { ReactNode } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  userType: 'admin' | 'teacher' | 'student';
  title: string;
  subtitle?: string;
}

export const DashboardLayout = ({ 
  children, 
  userType, 
  title, 
  subtitle 
}: DashboardLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="h-full flex">
      <Sidebar userType={userType} />
      <main 
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          isMobile ? "ml-0" : "ml-64"
        )}
      >
        <Header 
          userType={userType} 
          title={title} 
          subtitle={subtitle} 
        />
        <div className="flex-1 container px-4 sm:px-6 lg:px-8 py-6 animate-fadeIn">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
