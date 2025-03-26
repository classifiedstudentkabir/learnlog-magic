
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, GraduationCap, BookOpen, 
  Calendar, FileText, MessageSquare, LogOut, Menu, X,
  ChevronRight, User, UserCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

type SidebarProps = {
  userType: 'admin' | 'teacher' | 'student';
}

export const Sidebar = ({ userType }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Conditional navigation items based on user type
  const getNavItems = () => {
    const baseItems = [
      { 
        name: 'Dashboard', 
        path: `/${userType}`, 
        icon: <LayoutDashboard className="h-5 w-5" />
      },
      { 
        name: 'Profile', 
        path: `/${userType}/profile`, 
        icon: <User className="h-5 w-5" /> 
      },
    ];

    const adminItems = [
      { 
        name: 'Manage Students', 
        path: '/admin/students', 
        icon: <Users className="h-5 w-5" />
      },
      { 
        name: 'Manage Staff', 
        path: '/admin/staff', 
        icon: <UserCheck className="h-5 w-5" />
      },
      { 
        name: 'Manage Courses', 
        path: '/admin/courses', 
        icon: <BookOpen className="h-5 w-5" />
      },
      { 
        name: 'Manage Subjects', 
        path: '/admin/subjects', 
        icon: <FileText className="h-5 w-5" />
      },
      { 
        name: 'Manage Sessions', 
        path: '/admin/sessions', 
        icon: <Calendar className="h-5 w-5" />
      },
    ];

    const teacherItems = [
      { 
        name: 'My Classes', 
        path: '/teacher/classes', 
        icon: <BookOpen className="h-5 w-5" />
      },
      { 
        name: 'Manage Attendance', 
        path: '/teacher/attendance', 
        icon: <Calendar className="h-5 w-5" />
      },
      { 
        name: 'Announcements', 
        path: '/teacher/announcements', 
        icon: <MessageSquare className="h-5 w-5" />
      },
    ];

    const studentItems = [
      { 
        name: 'My Courses', 
        path: '/student/courses', 
        icon: <BookOpen className="h-5 w-5" />
      },
      { 
        name: 'Attendance', 
        path: '/student/attendance', 
        icon: <Calendar className="h-5 w-5" />
      },
      { 
        name: 'Announcements', 
        path: '/student/announcements', 
        icon: <MessageSquare className="h-5 w-5" />
      },
    ];

    switch (userType) {
      case 'admin':
        return [...baseItems, ...adminItems];
      case 'teacher':
        return [...baseItems, ...teacherItems];
      case 'student':
        return [...baseItems, ...studentItems];
      default:
        return baseItems;
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile menu toggle */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="bg-sidebar-background text-sidebar-foreground rounded-full shadow-md hover:shadow-lg transition-all"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "h-full bg-sidebar-background flex flex-col w-64 fixed top-0 left-0 z-40 transition-transform duration-300 ease-in-out",
          isMobile && !isOpen && "-translate-x-full",
          isMobile && isOpen && "translate-x-0",
          !isMobile && "translate-x-0"
        )}
      >
        {/* Header */}
        <div className="border-b border-sidebar-border/30 px-6 py-4">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="h-6 w-6 text-sidebar-primary" />
            <h1 className="text-xl font-semibold text-sidebar-foreground">
              Student MS
            </h1>
          </div>
          <p className="text-xs text-sidebar-foreground/70 capitalize">
            {userType} Panel
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "sidebar-nav-item",
                    location.pathname === item.path && "active"
                  )}
                  onClick={isMobile ? toggleSidebar : undefined}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  <ChevronRight className="h-4 w-4 ml-auto opacity-60" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border/30 p-4">
          <Link
            to="/logout"
            className="sidebar-nav-item"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Link>
          <div className="mt-4 pt-4 border-t border-sidebar-border/30">
            <p className="text-xs text-sidebar-foreground/50">
              © 2024 Student Management System
            </p>
            <p className="text-xs text-sidebar-foreground/50 mt-1">
              Version 3.0.2
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
