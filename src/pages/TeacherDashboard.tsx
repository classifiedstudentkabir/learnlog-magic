
import { useEffect, useState } from 'react';
import { 
  Users, BookOpen, CalendarDays, MessageSquare, PlusCircle 
} from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

// Mock class data
const initialClasses = [
  { id: 1, name: 'Mathematics - Grade 10', students: 32, lastUpdated: '2 hours ago' },
  { id: 2, name: 'Physics - Grade 11', students: 28, lastUpdated: '1 day ago' },
  { id: 3, name: 'Chemistry - Grade 10', students: 30, lastUpdated: '3 days ago' },
];

const TeacherDashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    classes: 0,
    attendance: 0,
    announcements: 0,
  });
  const [classes, setClasses] = useState(initialClasses);
  const [newClassName, setNewClassName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Simulate data loading
  useEffect(() => {
    const loadStats = async () => {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setStats({
        students: 90,
        classes: 3,
        attendance: 85,
        announcements: 12,
      });
    };
    
    loadStats();
  }, []);

  const handleCreateClass = () => {
    if (newClassName.trim() === '') {
      toast.error('Class name cannot be empty');
      return;
    }

    const newClass = {
      id: classes.length + 1,
      name: newClassName,
      students: 0,
      lastUpdated: 'Just now',
    };

    setClasses([...classes, newClass]);
    setNewClassName('');
    setIsDialogOpen(false);
    toast.success(`Class "${newClassName}" created successfully`);
  };

  return (
    <DashboardLayout
      userType="teacher"
      title="Teacher Dashboard"
      subtitle="Manage your classes and students"
    >
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          count={stats.students}
          title="My Students"
          icon={<Users className="w-full h-full text-white" />}
          color="#26a69a"
          link="/teacher/students"
        />
        <StatCard
          count={stats.classes}
          title="My Classes"
          icon={<BookOpen className="w-full h-full text-white" />}
          color="#4CAF50"
          link="/teacher/classes"
        />
        <StatCard
          count={stats.attendance}
          title="Attendance Rate (%)"
          icon={<CalendarDays className="w-full h-full text-white" />}
          color="#ff9800"
          link="/teacher/attendance"
        />
        <StatCard
          count={stats.announcements}
          title="Announcements"
          icon={<MessageSquare className="w-full h-full text-white" />}
          color="#e53935"
          link="/teacher/announcements"
        />
      </div>

      {/* Create Class Button */}
      <div className="flex justify-end mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Create New Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Class</DialogTitle>
              <DialogDescription>
                Enter the details for your new class. You can add students after creation.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Class Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Mathematics - Grade 10"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateClass}>Create Class</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Classes and Students */}
      <Tabs defaultValue="classes" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="classes">My Classes</TabsTrigger>
          <TabsTrigger value="recent">Recent Activities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="classes">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Your Classes</h3>
              <Separator className="mb-4" />
              
              {classes.length > 0 ? (
                <div className="space-y-4">
                  {classes.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between p-4 rounded-md border hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{cls.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {cls.students} students • Updated {cls.lastUpdated}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/teacher/classes/${cls.id}`}>Manage</a>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium">No Classes Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't created any classes yet.
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    Create Your First Class
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="recent">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Recent Activities</h3>
            <Separator className="mb-4" />
            <div className="space-y-4">
              {[
                { time: '2 hours ago', action: 'Marked attendance for Mathematics - Grade 10' },
                { time: '1 day ago', action: 'Created a new announcement for Physics - Grade 11' },
                { time: '2 days ago', action: 'Updated syllabus for Chemistry - Grade 10' },
                { time: '3 days ago', action: 'Added 2 new students to Mathematics - Grade 10' },
                { time: '1 week ago', action: 'Created Physics - Grade 11 class' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 py-2 border-b last:border-0">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Upcoming Sessions */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Upcoming Sessions</h3>
        <Separator className="mb-4" />
        <div className="space-y-4">
          {[
            { time: '9:00 AM - 10:30 AM', class: 'Mathematics - Grade 10', room: 'Room 101' },
            { time: '11:00 AM - 12:30 PM', class: 'Physics - Grade 11', room: 'Lab 3' },
            { time: '2:00 PM - 3:30 PM', class: 'Chemistry - Grade 10', room: 'Lab 2' },
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-md border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{session.class}</h4>
                  <p className="text-sm text-muted-foreground">
                    {session.time} • {session.room}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">View</Button>
                <Button size="sm">Mark Attendance</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
