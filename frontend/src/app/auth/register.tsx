'use client';
import { useState } from 'react';
import { Button, TextField } from '../components';
import { IcCarLogo } from '@/app/public/icons/IcCarLogo';
import { IcFacebook } from '@/app/public/icons/IcFacebook';
import { IcTwitter } from '@/app/public/icons/IcTwitter';
import Link from 'next/link';

export default function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Họ và tên là bắt buộc';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Số điện thoại là bắt buộc';
        } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Mật khẩu là bắt buộc';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu không khớp';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'Bạn phải đồng ý với điều khoản sử dụng';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        alert('Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.');
        setIsLoading(false);
    };

    const handleChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
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
                                Tạo tài khoản mới
                            </h1>
                            <p className="text-blue-700/80">
                                Tham gia cộng đồng Car Next.js để khám phá thế giới xe hơi
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <TextField
                                label="Họ và tên"
                                placeholder="Nhập họ và tên đầy đủ"
                                value={formData.fullName}
                                onChange={(value) => handleChange('fullName', value)}
                                color="primary"
                                required
                            />
                            {errors.fullName && (
                                <p className="text-red-600 text-sm -mt-4">{errors.fullName}</p>
                            )}

                            <TextField
                                label="Email"
                                placeholder="Nhập địa chỉ email"
                                value={formData.email}
                                onChange={(value) => handleChange('email', value)}
                                color="primary"
                                required
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm -mt-4">{errors.email}</p>
                            )}

                            <TextField
                                label="Số điện thoại"
                                placeholder="Nhập số điện thoại"
                                value={formData.phone}
                                onChange={(value) => handleChange('phone', value)}
                                color="primary"
                                required
                            />
                            {errors.phone && (
                                <p className="text-red-600 text-sm -mt-4">{errors.phone}</p>
                            )}

                            <div>
                                <label className="block text-blue-900 font-semibold mb-2">Mật khẩu</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => handleChange('password', e.target.value)}
                                        placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
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
                                {errors.password && (
                                    <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-blue-900 font-semibold mb-2">Xác nhận mật khẩu</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                        placeholder="Nhập lại mật khẩu"
                                        className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-400 outline-none transition-all duration-200"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700"
                                    >
                                        {showConfirmPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
                                )}
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={formData.agreeToTerms}
                                        onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
                                        className="w-4 h-4 text-blue-600 mt-1"
                                    />
                                    <span className="text-blue-700 text-sm">
                                        Tôi đồng ý với{' '}
                                        <Link href="/terms" className="text-blue-600 hover:text-blue-800 underline">
                                            Điều khoản sử dụng
                                        </Link>{' '}
                                        và{' '}
                                        <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                                            Chính sách bảo mật
                                        </Link>
                                    </span>
                                </label>
                                {errors.agreeToTerms && (
                                    <p className="text-red-600 text-sm">{errors.agreeToTerms}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                color="primary"
                                width="100%"
                                height="50px"
                                loading={isLoading}
                                className="text-lg font-bold"
                            >
                                {isLoading ? 'Đang đăng ký...' : 'Đăng ký tài khoản'}
                            </Button>
            </form>

                        {/* Divider */}
                        <div className="my-8 flex items-center">
                            <div className="flex-1 border-t border-blue-200"></div>
                            <span className="px-4 text-blue-500 text-sm">hoặc</span>
                            <div className="flex-1 border-t border-blue-200"></div>
                        </div>

                        {/* Social Register */}
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
                                Đã có tài khoản?{' '}
                                <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 font-semibold">
                                    Đăng nhập ngay
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Benefits */}
                    <div className="hidden lg:block">
                        <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
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
                                        <span className="text-4xl">🎉</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                        Lợi ích khi tham gia
                                    </h2>
                                    <p className="text-green-100 text-lg">
                                        Tận hưởng trải nghiệm xe hơi tuyệt vời với nhiều tính năng độc quyền
                                    </p>
                                </div>

                                {/* Benefits */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">🎁</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">Ưu đãi đặc biệt</h3>
                                            <p className="text-green-100">Nhận thông báo về ưu đãi và khuyến mãi</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">💾</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">Lưu trữ yêu thích</h3>
                                            <p className="text-green-100">Lưu danh sách xe yêu thích của bạn</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">📊</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">So sánh nâng cao</h3>
                                            <p className="text-green-100">So sánh chi tiết nhiều xe cùng lúc</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">🔔</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">Thông báo thông minh</h3>
                                            <p className="text-green-100">Nhận thông báo về xe mới và tin tức</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">👥</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">Cộng đồng</h3>
                                            <p className="text-green-100">Tham gia thảo luận với cộng đồng</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Testimonials */}
                                <div className="mt-8 bg-white/10 rounded-2xl p-6">
                                    <p className="text-green-100 italic text-center mb-4">
                                        &quot;Car Next.js giúp tôi tìm được chiếc xe phù hợp nhất với nhu cầu và ngân sách!&quot;
                                    </p>
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-2"></div>
                                        <p className="font-semibold">Nguyễn Văn A</p>
                                        <p className="text-green-100 text-sm">Khách hàng thân thiết</p>
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