import { useAuth } from '@/contexts/AuthContext';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Clock,
  Plus,
  ArrowRight,
  GraduationCap,
  Star,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Kursus',
      value: '24',
      change: '+12%',
      icon: BookOpen,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Siswa Aktif',
      value: '1,284',
      change: '+23%',
      icon: Users,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      title: 'Jam Pembelajaran',
      value: '847',
      change: '+5%',
      icon: Clock,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Rating Rata-rata',
      value: '4.8',
      change: '+0.2',
      icon: Star,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  const recentActivities = [
    {
      type: 'course_created',
      title: 'Kursus "React Advanced" telah dibuat',
      time: '2 jam yang lalu',
      badge: 'Baru',
      badgeVariant: 'secondary' as const,
    },
    {
      type: 'student_enrolled',
      title: '5 siswa baru mendaftar ke "JavaScript Fundamentals"',
      time: '4 jam yang lalu',
      badge: 'Pendaftaran',
      badgeVariant: 'default' as const,
    },
    {
      type: 'course_completed',
      title: 'Maria Silva menyelesaikan "UI/UX Design"',
      time: '1 hari yang lalu',
      badge: 'Selesai',
      badgeVariant: 'secondary' as const,
    },
  ];

  const quickActions = [
    {
      title: 'Buat Kursus Baru',
      description: 'Mulai membuat kursus baru untuk siswa',
      icon: Plus,
      link: '/courses/create',
      color: 'bg-gradient-primary text-white',
      show: user?.role === 'teacher' || user?.role === 'admin',
    },
    {
      title: 'Lihat Semua Kursus',
      description: 'Jelajahi katalog kursus lengkap',
      icon: BookOpen,
      link: '/courses',
      color: 'bg-gradient-secondary text-white',
      show: true,
    },
    {
      title: 'Kelola Siswa',
      description: 'Pantau progress dan kelola siswa',
      icon: Users,
      link: '/students',
      color: 'bg-gradient-glass border border-glass-border text-foreground',
      show: user?.role === 'teacher' || user?.role === 'admin',
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 17) return 'Selamat Siang';
    return 'Selamat Malam';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {getGreeting()}, {user?.full_name}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Selamat datang di dashboard Sahasik. Mari mulai hari yang produktif!
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <div className="text-right">
            <p className="text-sm font-medium">Platform Pembelajaran</p>
            <p className="text-xs text-muted-foreground">Modern & Terintegrasi</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-success">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} dari bulan lalu
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Aksi Cepat
              </CardTitle>
              <CardDescription>
                Akses fitur utama dengan cepat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions
                  .filter(action => action.show)
                  .map((action, index) => (
                    <Link
                      key={index}
                      to={action.link}
                      className="group block"
                    >
                      <div className={`p-6 rounded-lg ${action.color} hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <action.icon className="h-6 w-6 mb-3" />
                            <h3 className="font-semibold mb-2">{action.title}</h3>
                            <p className="text-sm opacity-90 mb-3">
                              {action.description}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))
                }
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Aktivitas Terbaru
              </CardTitle>
              <CardDescription>
                Update terkini dari platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium leading-relaxed">
                        {activity.title}
                      </p>
                      <Badge variant={activity.badgeVariant} className="ml-2 text-xs">
                        {activity.badge}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
              
              <Button variant="ghost" className="w-full mt-4" asChild>
                <Link to="/activities">
                  Lihat Semua Aktivitas
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}