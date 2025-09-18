import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Plus, 
  Filter, 
  BookOpen,
  Clock,
  Users,
  Star,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Courses() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - in real app this would come from API
  const courses = [
    {
      id: '1',
      title: 'React Fundamentals',
      description: 'Pelajari dasar-dasar React untuk membangun aplikasi web modern',
      category: 'Programming',
      teacher_id: 'teacher1',
      teacherName: 'Ahmad Fauzi',
      students: 124,
      duration: '8 jam',
      rating: 4.8,
      level: 'Pemula',
      price: 299000,
      thumbnail: '/api/placeholder/300/200',
      created_at: '2024-01-15',
    },
    {
      id: '2',
      title: 'UI/UX Design Mastery',
      description: 'Menguasai prinsip design yang user-friendly dan menarik',
      category: 'Design',
      teacher_id: 'teacher2',
      teacherName: 'Sari Dewi',
      students: 89,
      duration: '12 jam',
      rating: 4.9,
      level: 'Menengah',
      price: 599000,
      thumbnail: '/api/placeholder/300/200',
      created_at: '2024-01-10',
    },
    {
      id: '3',
      title: 'Digital Marketing Strategy',
      description: 'Strategi pemasaran digital untuk meningkatkan bisnis online',
      category: 'Marketing',
      teacher_id: 'teacher3',
      teacherName: 'Budi Santoso',
      students: 156,
      duration: '6 jam',
      rating: 4.7,
      level: 'Pemula',
      price: 199000,
      thumbnail: '/api/placeholder/300/200',
      created_at: '2024-01-08',
    },
  ];

  const categories = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'Programming', label: 'Programming' },
    { value: 'Design', label: 'Design' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Business', label: 'Business' },
  ];

  const canManageCourses = user?.role === 'teacher' || user?.role === 'admin';

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case 'Pemula':
        return 'secondary';
      case 'Menengah':
        return 'default';
      case 'Lanjut':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kursus"
        description="Jelajahi dan kelola kursus pembelajaran"
      >
        {canManageCourses && (
          <Button asChild variant="hero">
            <Link to="/courses/create">
              <Plus className="h-4 w-4 mr-2" />
              Buat Kursus
            </Link>
          </Button>
        )}
      </PageHeader>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari kursus..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="aspect-video bg-gradient-primary rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-hero flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-white/80" />
              </div>
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="bg-white/90 text-foreground">
                  {course.category}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Badge variant={getLevelBadgeVariant(course.level)}>
                  {course.level}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <div className="space-y-2">
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                  <Link to={`/courses/${course.id}`}>
                    {course.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-sm line-clamp-2">
                  {course.description}
                </CardDescription>
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
                <span className="font-medium">{course.teacherName}</span>
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-warning fill-current mr-1" />
                  <span>{course.rating}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{course.students} siswa</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-primary">
                    {formatPrice(course.price)}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/courses/${course.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    {canManageCourses && (
                      <>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/courses/${course.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  {user?.role === 'student' ? 'Daftar Kursus' : 'Lihat Detail'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Tidak ada kursus ditemukan</h3>
          <p className="text-muted-foreground mb-4">
            Coba ubah filter atau kata kunci pencarian Anda
          </p>
          {canManageCourses && (
            <Button asChild variant="hero">
              <Link to="/courses/create">
                <Plus className="h-4 w-4 mr-2" />
                Buat Kursus Pertama
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}