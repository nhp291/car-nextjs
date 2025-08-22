'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/lib/validations';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useApi } from '@/lib/hooks/useApi';
import { API_ENDPOINTS } from '@/lib/constants';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { execute, loading, error } = useApi<{ token: string; user: Record<string, unknown> }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await execute(API_ENDPOINTS.auth.login, {
        method: 'POST',
        body: data,
      });

      if (result) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        toast.success('Đăng nhập thành công!');
        onSuccess?.();
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Đăng nhập thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto text-gray-700 shadow-xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Đăng nhập
        </CardTitle>
        <CardDescription className="text-gray-600">
          Chào mừng bạn trở lại với CarHub
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Mật khẩu
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
                {...register('password')}
                className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="mx-auto flex justify-center w-center bg-blue-600 text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang đăng nhập...
              </>
            ) : (
              'Đăng nhập'
            )}
          </Button>

          <div className="text-center">
            <span className="text-sm text-gray-600">Chưa có tài khoản? </span>
            <Link 
              href="/auth/register" 
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Đăng ký ngay
            </Link>
          </div>
          
          {onSwitchToRegister && (
            <div className="text-center">
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Chuyển sang đăng ký
              </button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
} 