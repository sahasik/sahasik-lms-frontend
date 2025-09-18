import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Navigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Username wajib diisi'),
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),
  password: z
    .string()
    .min(1, 'Kata sandi wajib diisi')
    .min(6, 'Kata sandi minimal 6 karakter'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.username, data.email, data.password);
    } catch (error) {
      // Error is handled in AuthContext
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-12 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Sahasik</h1>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Selamat Datang Kembali
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Platform pembelajaran modern untuk meningkatkan kemampuan Anda
          </p>
          <div className="space-y-4 text-white/80">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Akses ribuan kursus berkualitas</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Belajar dari instruktur terbaik</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Dapatkan sertifikat completion</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Sahasik</h1>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Masuk</CardTitle>
              <CardDescription>
                Masukkan email dan kata sandi untuk mengakses akun Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="admin"
                    {...register('username')}
                    className={errors.username ? 'border-destructive' : ''}
                  />
                  {errors.username && (
                    <p className="text-sm text-destructive">{errors.username.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@pesantren.com"
                    {...register('email')}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Kata Sandi</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Masukkan kata sandi"
                      {...register('password')}
                      className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  variant="hero"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Memproses...
                    </>
                  ) : (
                    'Masuk'
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Demo: admin / admin@pesantren.com / Admin123!@#
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}