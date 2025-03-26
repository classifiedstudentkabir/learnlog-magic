
import { useEffect, useState } from 'react';
import { 
  BookOpen, CalendarDays, MessageSquare, CheckCircle
} from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';

// Mock course data
const myCourses = [
  { id: 1, name: 'Mathematics', teacher: 'Mr. Johnson', attendance: 90, lastClass: '2 hours ago' },
  { id: 2, name: 'Physics', teacher: 'Ms. Smith', attendance: 85, lastClass: '1 day ago' },
  { id: 3, name: 'Chemistry', teacher: 'Dr. Brown', attendance: 75, lastClass: '3 days ago' },
];

// Mock announcement data
const announcements = [
  { id: 1, title: 'Final Exam Schedule', course: 'All Courses', date: '2 days ago', content: 'The final examination schedule has been posted. Please check your email for detailed information.' },
  { id: 2, title: 'Assignment Deadline Extended', course: 'Mathematics', date: '4 days ago', content: 'The deadline for the calculus assignment has been extended to next Monday.' },
  { id: 3, title: 'Lab Session Rescheduled', course: 'Chemistry', date: '1 week ago', content: 'Tomorrow\'s lab session will be held in Lab 3 instead of Lab 2.' },
];

const StudentDashboard = () => {
  const [attendanceRate, setAttendanceRate] = useState(0);
  const [courses, setCourses] = useState(myCourses);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setAttendanceRate(85);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleMarkAttendance = (courseId: number) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, attendance: 100, lastClass: 'Just now' } 
        : course
    ));
    
    toast.success('Attendance marked successfully!');
  };

  return (
    <DashboardLayout
      userType="student"
      title="Student Dashboard"
      subtitle="View your courses and attendance"
    >
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-[#26a69a]/10 flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-[#26a69a]" />
            </div>
            <h3 className="text-2xl font-bold">{courses.length}</h3>
            <p className="text-muted-foreground">Enrolled Courses</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-[#ff9800]/10 flex items-center justify-center mb-4">
              <CalendarDays className="h-8 w-8 text-[#ff9800]" />
            </div>
            <div className="mb-2">
              <h3 className="text-2xl font-bold">{attendanceRate}%</h3>
            </div>
            <Progress value={attendanceRate} className="w-full h-2 mb-2" />
            <p className="text-muted-foreground">Overall Attendance</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-[#e53935]/10 flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-[#e53935]" />
            </div>
            <h3 className="text-2xl font-bold">{announcements.length}</h3>
            <p className="text-muted-foreground">New Announcements</p>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Your Enrolled Courses</h3>
            <p className="text-sm text-muted-foreground mb-4">You can mark your attendance for today's classes.</p>
            <Separator className="mb-6" />
            
            <div className="space-y-6">
              {courses.map((course) => (
                <div key={course.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{course.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {course.attendance === 100 ? 'Present Today' : 'Attendance Required'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {course.teacher} • Last class: {course.lastClass}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 ml-16 md:ml-0">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="w-full md:w-28">
                            <Progress value={course.attendance} className="h-2" />
                            <p className="text-xs text-center mt-1">{course.attendance}% Attendance</p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Your attendance rate for this course</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <Button 
                      size="sm" 
                      className="gap-2"
                      disabled={course.attendance === 100}
                      onClick={() => handleMarkAttendance(course.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                      {course.attendance === 100 ? 'Marked Present' : 'Mark as Present'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="announcements">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Recent Announcements</h3>
            <p className="text-sm text-muted-foreground mb-4">Important updates from your courses and administration.</p>
            <Separator className="mb-6" />
            
            <div className="space-y-6">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{announcement.title}</h4>
                    <Badge variant="outline">{announcement.course}</Badge>
                  </div>
                  <p className="text-sm mb-3">{announcement.content}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">Posted {announcement.date}</p>
                    <Button variant="link" size="sm" className="h-auto p-0">
                      Read more
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Schedule */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Today's Schedule</h3>
        <p className="text-sm text-muted-foreground mb-4">Your scheduled classes for today.</p>
        <Separator className="mb-6" />
        
        <div className="space-y-4">
          {[
            { time: '9:00 AM - 10:30 AM', course: 'Mathematics', teacher: 'Mr. Johnson', room: 'Room 101', status: 'completed' },
            { time: '11:00 AM - 12:30 PM', course: 'Physics', teacher: 'Ms. Smith', room: 'Lab 3', status: 'current' },
            { time: '2:00 PM - 3:30 PM', course: 'Chemistry', teacher: 'Dr. Brown', room: 'Lab 2', status: 'upcoming' },
          ].map((session, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between p-4 rounded-md border ${
                session.status === 'current' ? 'border-primary bg-primary/5' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  session.status === 'completed' ? 'bg-green-100' :
                  session.status === 'current' ? 'bg-primary/20' :
                  'bg-muted'
                }`}>
                  {session.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <CalendarDays className={`h-5 w-5 ${
                      session.status === 'current' ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{session.course}</h4>
                    {session.status === 'current' && (
                      <Badge variant="default" className="text-xs">Now</Badge>
                    )}
                    {session.status === 'completed' && (
                      <Badge variant="outline" className="text-xs text-green-600 border-green-200 bg-green-50">Completed</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {session.time} • {session.teacher} • {session.room}
                  </p>
                </div>
              </div>
              {session.status === 'current' && (
                <Button 
                  size="sm" 
                  className="gap-2"
                  onClick={() => {
                    toast.success(`Attendance marked for ${session.course}`);
                  }}
                >
                  <CheckCircle className="h-4 w-4" />
                  Mark Attendance
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default StudentDashboard;
