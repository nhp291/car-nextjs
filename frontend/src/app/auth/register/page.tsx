'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/validations';
import { useApi } from '@/lib/hooks/useApi';
import { API_ENDPOINTS } from '@/lib/constants';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const { execute, loading } = useApi();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      
      const response = await execute(API_ENDPOINTS.auth.register, {
        method: 'POST',
        body: {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
        },
      });

      if (response) {
        toast.success('Đăng ký thành công!');
        router.push('/auth/login');
      }
    } catch (error: any) {
      toast.error(error.message || 'Đăng ký thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Đăng ký
            </CardTitle>
            <p className="text-gray-600">
              Tạo tài khoản mới để trải nghiệm CarHub
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên
                </label>
                <Input
                  id="name"
                  type="text"
                  {...register('name')}
                  placeholder="Nhập họ và tên"
                  className={`text-gray-700 ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="Nhập email"
                  className={`text-gray-700 ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại (tùy chọn)
                </label>
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  placeholder="Nhập số điện thoại"
                  className={`text-gray-700 ${errors.phone ? 'border-red-500' : ''}`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  placeholder="Nhập mật khẩu"
                  className={`text-gray-700 ${errors.password ? 'border-red-500' : ''}`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Xác nhận mật khẩu
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword')}
                  placeholder="Nhập lại mật khẩu"
                  className={`text-gray-700 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                disabled={loading || isLoading}
              >
                {loading || isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Đã có tài khoản?{' '}
                <Link 
                  href="/auth/login" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Đăng nhập
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 