'use client';
import { useState } from 'react';
import { Button, TextField } from '../components';
import { IcCarLogo } from '@/app/public/icons/IcCarLogo';
import { IcFacebook } from '@/app/public/icons/IcFacebook';
import { IcTwitter } from '@/app/public/icons/IcTwitter';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    alert('Đăng nhập thành công!');
    setIsLoading(false);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center py-16">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Form */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <IcCarLogo width="64px" height="64px" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-900 mb-2">
                Chào mừng trở lại!
              </h1>
              <p className="text-blue-700/80">
                Đăng nhập để tiếp tục khám phá thế giới xe hơi
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <TextField
                label="Email"
                placeholder="Nhập địa chỉ email"
                value={formData.email}
                onChange={(value) => handleChange('email', value)}
                color="primary"
                required
              />

              <div>
                <label className="block text-blue-900 font-semibold mb-2">Mật khẩu</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="Nhập mật khẩu"
                    className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-400 outline-none transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => handleChange('rememberMe', e.target.checked)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-blue-700 text-sm">Ghi nhớ đăng nhập</span>
                </label>
                <Link href="/auth/forgot-password" className="text-blue-600 hover:text-blue-800 text-sm">
                  Quên mật khẩu?
                </Link>
              </div>

              <Button
                type="submit"
                color="primary"
                width="100%"
                height="50px"
                loading={isLoading}
                className="text-lg font-bold"
              >
                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-blue-200"></div>
              <span className="px-4 text-blue-500 text-sm">hoặc</span>
              <div className="flex-1 border-t border-blue-200"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors">
                <IcFacebook width="20px" height="20px" />
                Facebook
              </button>
              <button className="flex items-center justify-center gap-2 bg-sky-500 text-white px-4 py-3 rounded-xl hover:bg-sky-600 transition-colors">
                <IcTwitter width="20px" height="20px" />
                Twitter
              </button>
            </div>

            <div className="text-center">
              <p className="text-blue-700/80">
                Chưa có tài khoản?{' '}
                <Link href="/auth/register" className="text-blue-600 hover:text-blue-800 font-semibold">
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </div>

          {/* Right Side - 3D Car & Info */}
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
                <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-20 left-20 w-12 h-12 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
              </div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IcCarLogo width="64px" height="64px" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Khám phá thế giới xe hơi
                  </h2>
                  <p className="text-blue-100 text-lg">
                    Trải nghiệm công nghệ 3D hiện đại và thông tin xe chi tiết
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🚗</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Xem xe 3D</h3>
                      <p className="text-blue-100">Trải nghiệm xe với công nghệ WebGL</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📊</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">So sánh xe</h3>
                      <p className="text-blue-100">So sánh chi tiết các thông số kỹ thuật</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">❤️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Yêu thích</h3>
                      <p className="text-blue-100">Lưu trữ danh sách xe yêu thích</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📱</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Tin tức</h3>
                      <p className="text-blue-100">Cập nhật tin tức xe hơi mới nhất</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-blue-100 text-sm">Mẫu xe</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">10K+</div>
                    <div className="text-blue-100 text-sm">Người dùng</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">50K+</div>
                    <div className="text-blue-100 text-sm">Lượt xem</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 