import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Mail, 
  Shield, 
  Edit,
  Camera,
  Save,
  X,
} from 'lucide-react';

const profileSchema = z.object({
  full_name: z
    .string()
    .min(1, 'Nama wajib diisi')
    .min(2, 'Nama minimal 2 karakter'),
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: user?.full_name || '',
      email: user?.email || '',
    },
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'teacher':
        return 'default';
      case 'student':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'teacher':
        return 'Pengajar';
      case 'student':
        return 'Siswa';
      default:
        return 'User';
    }
  };

  const onSubmit = async (data: ProfileForm) => {
    try {
      // TODO: Implement API call to update profile
      console.log('Profile update:', data);
      
      toast({
        title: 'Profil berhasil diperbarui',
        description: 'Informasi profil Anda telah berhasil disimpan.',
      });
      
      setIsEditing(false);
    } catch (error) {
      toast({
        title: 'Gagal memperbarui profil',
        description: 'Terjadi kesalahan saat menyimpan perubahan.',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profil Saya"
        description="Kelola informasi profil dan pengaturan akun Anda"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center pb-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="" alt={user?.full_name} />
                    <AvatarFallback className="text-xl bg-gradient-primary text-white">
                      {user?.full_name ? getInitials(user.full_name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon" 
                    variant="outline"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{user?.full_name}</h3>
                  <p className="text-muted-foreground">{user?.email}</p>
                  <Badge 
                    variant={getRoleBadgeVariant(user?.role || 'student')}
                    className="mt-2"
                  >
                    <Shield className="h-3 w-3 mr-1" />
                    {getRoleLabel(user?.role || 'student')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Statistik</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Kursus Terdaftar</span>
                <span className="font-semibold">12</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Kursus Selesai</span>
                <span className="font-semibold">8</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Jam Pembelajaran</span>
                <span className="font-semibold">147</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Informasi Profil
                  </CardTitle>
                  <CardDescription>
                    Kelola informasi pribadi dan preferensi akun Anda
                  </CardDescription>
                </div>
                {!isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Nama Lengkap</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="full_name"
                        {...register('full_name')}
                        disabled={!isEditing}
                        className={`pl-10 ${!isEditing ? 'bg-muted/50' : ''}`}
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    {errors.full_name && (
                      <p className="text-sm text-destructive">{errors.full_name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        {...register('email')}
                        disabled={!isEditing}
                        className={`pl-10 ${!isEditing ? 'bg-muted/50' : ''}`}
                        placeholder="Masukkan email"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Role</Label>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <Badge variant={getRoleBadgeVariant(user?.role || 'student')}>
                      {getRoleLabel(user?.role || 'student')}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      (Role tidak dapat diubah)
                    </span>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex items-center space-x-2 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="hero"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Simpan Perubahan
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isSubmitting}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Batal
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Keamanan
              </CardTitle>
              <CardDescription>
                Kelola pengaturan keamanan akun Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Kata Sandi</h4>
                  <p className="text-sm text-muted-foreground">
                    Terakhir diubah 30 hari yang lalu
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Ubah Password
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Autentikasi Dua Faktor</h4>
                  <p className="text-sm text-muted-foreground">
                    Tambah lapisan keamanan ekstra untuk akun Anda
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Setup 2FA
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}