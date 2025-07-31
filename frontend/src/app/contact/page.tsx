'use client';
import { useState } from 'react';
import { Button, TextField } from '../components';
import { IcCarLogo } from '@/app/public/icons/IcCarLogo';
import { IcFacebook } from '@/app/public/icons/IcFacebook';
import { IcTwitter } from '@/app/public/icons/IcTwitter';
import { IcLinkedin } from '@/app/public/icons/IcLinkedin';
import { IcDiscord } from '@/app/public/icons/IcDiscord';
import { IcGitHub } from '@/app/public/icons/IcGitHub';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setIsSubmitting(false);
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-16">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-4">
                        Liên hệ với chúng tôi
                    </h1>
                    <p className="text-xl text-blue-700/80 max-w-2xl mx-auto">
                        Bạn có câu hỏi hoặc cần tư vấn? Hãy để lại thông tin và chúng tôi sẽ liên hệ lại sớm nhất!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-indigo-900 mb-6">Gửi tin nhắn</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField
                                    className='text-[#334155]'
                                    label="Họ và tên"
                                    placeholder="Nhập họ và tên"
                                    value={formData.name}
                                    onChange={(value) => handleChange('name', value)}
                                />
                                <TextField
                                    className='text-[#334155]'
                                    label="Số điện thoại"
                                    placeholder="Nhập số điện thoại"
                                    value={formData.phone}
                                    onChange={(value) => handleChange('phone', value)}
                                />
                            </div>

                            <TextField
                                className='text-[#334155]'
                                label="Email"
                                placeholder="Nhập địa chỉ email"
                                value={formData.email}
                                onChange={(value) => handleChange('email', value)}
                            />

                            <TextField
                                className='text-[#334155]'
                                label="Tiêu đề"
                                placeholder="Nhập tiêu đề tin nhắn"
                                value={formData.subject}
                                onChange={(value) => handleChange('subject', value)}
                            />

                            <div>
                                <label className="block text-blue-900 font-semibold mb-2">Nội dung</label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => handleChange('message', e.target.value)}
                                    placeholder="Nhập nội dung tin nhắn..."
                                    className="w-full h-32 px-4 py-3 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-400 outline-none transition-all duration-200 resize-none text-[#334155]"
                                />
                            </div>

                            <Button
                                type="submit"
                                color="primary"
                                width="100%"
                                height="50px"
                                loading={isSubmitting}
                                className="text-lg font-bold"
                            >
                                {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
                            </Button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        {/* Company Info */}
                        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
                            <div className="flex items-center gap-4 mb-6">
                                <IcCarLogo width="48px" height="48px" />
                                <div>
                                    <h3 className="text-2xl font-bold text-indigo-900">Car Next.js</h3>
                                    <p className="text-blue-700/80">Nền tảng tra cứu xe hiện đại</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600">📍</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-indigo-900">Địa chỉ</p>
                                        <p className="text-blue-700/80">123 Đường ABC, Quận 1, TP.HCM</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600">📞</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-indigo-900">Điện thoại</p>
                                        <p className="text-blue-700/80">+84 123 456 789</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                        <span className="text-purple-600">✉️</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-indigo-900">Email</p>
                                        <p className="text-blue-700/80">support@car-nextjs.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                        <span className="text-orange-600">🕒</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-indigo-900">Giờ làm việc</p>
                                        <p className="text-blue-700/80">Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
                            <h3 className="text-xl font-bold text-indigo-900 mb-4">Theo dõi chúng tôi</h3>
                            <div className="flex gap-4">
                                <a href="#" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                    <IcFacebook width="24px" height="24px" />
                                </a>
                                <a href="#" className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                    <IcTwitter width="24px" height="24px" />
                                </a>
                                <a href="#" className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                    <IcLinkedin width="24px" height="24px" />
                                </a>
                                <a href="#" className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                    <IcDiscord width="24px" height="24px" />
                                </a>
                                <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                    <IcGitHub width="24px" height="24px" />
                                </a>
                            </div>
                        </div>

                        {/* FAQ */}
                        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
                            <h3 className="text-xl font-bold text-indigo-900 mb-4">Câu hỏi thường gặp</h3>
                            <div className="space-y-3">
                                <details className="group">
                                    <summary className="cursor-pointer font-semibold text-blue-900 hover:text-indigo-600 transition-colors">
                                        Làm thế nào để so sánh xe?
                                    </summary>
                                    <p className="mt-2 text-blue-700/80 text-sm">
                                        Bạn có thể sử dụng tính năng so sánh xe trong trang "So sánh" để đối chiếu các thông số kỹ thuật.
                                    </p>
                                </details>
                                <details className="group">
                                    <summary className="cursor-pointer font-semibold text-blue-900 hover:text-indigo-600 transition-colors">
                                        Có thể xem xe 3D không?
                                    </summary>
                                    <p className="mt-2 text-blue-700/80 text-sm">
                                        Có! Chúng tôi cung cấp tính năng xem xe 3D với công nghệ WebGL hiện đại.
                                    </p>
                                </details>
                                <details className="group">
                                    <summary className="cursor-pointer font-semibold text-blue-900 hover:text-indigo-600 transition-colors">
                                        Thông tin xe có cập nhật không?
                                    </summary>
                                    <p className="mt-2 text-blue-700/80 text-sm">
                                        Thông tin xe được cập nhật thường xuyên từ các hãng xe và đại lý chính thức.
                                    </p>
                                </details>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
} 