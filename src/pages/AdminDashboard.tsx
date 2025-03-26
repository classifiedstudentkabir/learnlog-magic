
import { useEffect, useState } from 'react';
import { 
  Users, UserCheck, BookOpen, FileText, CalendarDays 
} from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data for charts
const attendanceData = [
  { name: 'Monday', students: 85, teachers: 95 },
  { name: 'Tuesday', students: 90, teachers: 100 },
  { name: 'Wednesday', students: 80, teachers: 90 },
  { name: 'Thursday', students: 85, teachers: 95 },
  { name: 'Friday', students: 75, teachers: 90 },
];

const subjectPerformanceData = [
  { subject: 'Math', attendance: 85, performance: 78 },
  { subject: 'Science', attendance: 75, performance: 80 },
  { subject: 'Language', attendance: 90, performance: 85 },
  { subject: 'History', attendance: 65, performance: 70 },
  { subject: 'Art', attendance: 95, performance: 90 },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    staff: 0,
    courses: 0,
    subjects: 0,
  });

  // Simulate data loading
  useEffect(() => {
    const loadStats = async () => {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setStats({
        students: 420,
        staff: 35,
        courses: 12,
        subjects: 28,
      });
    };
    
    loadStats();
  }, []);

  return (
    <DashboardLayout
      userType="admin"
      title="Administrative Dashboard"
      subtitle="Overview of your school statistics"
    >
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          count={stats.students}
          title="Total Students"
          icon={<Users className="w-full h-full text-white" />}
          color="#26a69a"
          link="/admin/students"
        />
        <StatCard
          count={stats.staff}
          title="Total Staff"
          icon={<UserCheck className="w-full h-full text-white" />}
          color="#4CAF50"
          link="/admin/staff"
        />
        <StatCard
          count={stats.courses}
          title="Total Courses"
          icon={<BookOpen className="w-full h-full text-white" />}
          color="#ff9800"
          link="/admin/courses"
        />
        <StatCard
          count={stats.subjects}
          title="Total Subjects"
          icon={<FileText className="w-full h-full text-white" />}
          color="#e53935"
          link="/admin/subjects"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Weekly Attendance</h2>
            <CalendarDays className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px',
                    border: '1px solid #f0f0f0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }} 
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#26a69a"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 1 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="teachers"
                  stroke="#4CAF50"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 1 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Subject Performance</h2>
            <BookOpen className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="subject" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px',
                    border: '1px solid #f0f0f0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }} 
                />
                <Legend />
                <Bar
                  dataKey="attendance"
                  name="Attendance %"
                  fill="#26a69a"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="performance"
                  name="Performance %"
                  fill="#ff9800"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Recent Activities</h2>
        </div>
        <div className="space-y-4">
          {[
            { time: '2 hours ago', action: 'New student John Doe was registered' },
            { time: '3 hours ago', action: 'Teacher Mark Johnson updated Math course syllabus' },
            { time: '5 hours ago', action: 'Attendance records were updated for Science class' },
            { time: '1 day ago', action: 'New announcement posted for all students' },
            { time: '2 days ago', action: 'System maintenance performed' },
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
    </DashboardLayout>
  );
};

export default AdminDashboard;
