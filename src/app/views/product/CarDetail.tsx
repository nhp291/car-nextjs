'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button, Car3DViewer } from '../../components';
import { formatCurrency, formatDate } from '../../utils';
import { IcCarLogo } from '@/app/public/icons/IcCarLogo';
import { IcGas } from '@/app/public/icons/IcGas';
import { IcTire } from '@/app/public/icons/IcTire';
import { IcSteeringWheel } from '@/app/public/icons/IcSteeringWheel';
import { IcHeartOutline } from '@/app/public/icons/IcHeartOutline';
import { IcHeartFilled } from '@/app/public/icons/IcHeartFilled';
import { IcArrowRight } from '@/app/public/icons/IcArrowRight';
import { Car } from '../../mock/cars.mock';

interface CarDetailProps {
    car: Car & {
        badge?: string;
        liked?: boolean;
        comments?: Array<{
            id: string;
            user: string;
            content: string;
            rating?: number;
            date: string;
        }>;
        tireSize?: string;
        type?: string;
        discount?: number;
        maintenance?: string;
        engineType?: string;
        engineSize?: string;
        length?: string;
        width?: string;
        height?: string;
        groundClearance?: string;
    };
}

export default function CarDetail({ car }: CarDetailProps) {
    const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');
    const [isLiked, setIsLiked] = useState(car.liked || false);
    const [comments, setComments] = useState(car.comments || []);
    const [user, setUser] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(5);

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user.trim() || !content.trim()) return;
        const newComment = {
            id: Date.now().toString(),
            user,
            content,
            rating,
            date: new Date().toISOString(),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user)}&background=random`
        };
        setComments([newComment, ...comments]);
        setUser('');
        setContent('');
        setRating(5);
    };

    const averageRating = comments.length > 0
        ? comments.reduce((acc: number, comment: { rating?: number }) => acc + (comment.rating || 5), 0) / comments.length
        : 0;

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
        ));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto py-8 px-4">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-blue-700 mb-6">
                    <button onClick={() => window.history.back()} className="hover:text-blue-900">← Quay lại</button>
                    <IcArrowRight width="16px" height="16px" />
                    <span className="text-blue-900 font-medium">{car.brand}</span>
                    <IcArrowRight width="16px" height="16px" />
                    <span className="text-blue-900 font-medium">{car.name}</span>
                </nav>

                {/* Header */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Hình ảnh */}
                        <div className="relative">
                            <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                                <Image
                                    src={car.image}
                                    alt={car.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <button
                                        onClick={() => setIsLiked(!isLiked)}
                                        className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 transition-transform"
                                    >
                                        {isLiked ?
                                            <IcHeartFilled width="24px" height="24px" /> :
                                            <IcHeartOutline width="24px" height="24px" />
                                        }
                                    </button>
                                </div>
                                <div className="absolute top-4 left-4">
                                    <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg">
                                        {car.badge || 'Mới'}
                                    </span>
                                </div>
                            </div>
                            {/* 3D Viewer Nissan GTR */}
                            <div className="mt-6">
                                <Car3DViewer />
                            </div>
                        </div>
                        {/* Thông tin */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <IcCarLogo width="40px" height="40px" />
                                    <div>
                                        <h1 className="text-3xl font-bold text-indigo-900">{car.name}</h1>
                                        <p className="text-blue-600 font-medium">{car.brand}</p>
                                    </div>
                                </div>
                                <p className="text-blue-700/80 text-lg mb-6 leading-relaxed">{car.description}</p>
                                {/* Đánh giá */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center gap-2">
                                        {renderStars(averageRating)}
                                        <span className="text-lg font-semibold text-indigo-900">{averageRating.toFixed(1)}</span>
                                    </div>
                                    <span className="text-blue-600">({comments.length} đánh giá)</span>
                                </div>
                                {/* Thông số cơ bản */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                                        <IcGas width="24px" height="24px" />
                                        <div>
                                            <p className="text-sm text-blue-600">Tiêu thụ</p>
                                            <p className="font-semibold text-indigo-900">{car.fuelConsumption}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                                        <IcTire width="24px" height="24px" />
                                        <div>
                                            <p className="text-sm text-blue-600">Lốp xe</p>
                                            <p className="font-semibold text-indigo-900">{car.tireSize || '-'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                                        <IcSteeringWheel width="24px" height="24px" />
                                        <div>
                                            <p className="text-sm text-blue-600">Lái xe</p>
                                            <p className="font-semibold text-indigo-900">{car.transmission}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                                        <IcCarLogo width="24px" height="24px" />
                                        <div>
                                            <p className="text-sm text-blue-600">Loại xe</p>
                                            <p className="font-semibold text-indigo-900">{car.category}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Giá và CTA */}
                            <div className="border-t pt-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-sm text-blue-600">Giá từ</p>
                                        <p className="text-3xl font-bold text-indigo-900">{formatCurrency(car.price)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-green-600 font-medium">Tiết kiệm {formatCurrency(car.discount || 0)}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button color="primary" width="100%" height="48px">Liên hệ tư vấn</Button>
                                    <Button color="secondary" width="100%" height="48px">Đặt lịch lái thử</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Tabs */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="flex border-b">
                        {[
                            { id: 'overview', label: 'Tổng quan' },
                            { id: 'specs', label: 'Thông số kỹ thuật' },
                            { id: 'reviews', label: 'Đánh giá' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as 'overview' | 'specs' | 'reviews')}
                                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === tab.id
                                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                    : 'text-gray-600 hover:text-blue-600'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="p-8">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-indigo-900 mb-4">Tổng quan</h3>
                                <p className="text-blue-700/80 leading-relaxed">{car.description}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold text-indigo-900 mb-3">Điểm nổi bật</h4>
                                        <ul className="space-y-2">
                                            {car.features?.map((feature: string, index: number) => (
                                                <li key={index} className="flex items-center gap-2 text-blue-700">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-indigo-900 mb-3">Thông tin bảo hành</h4>
                                        <div className="space-y-2 text-blue-700">
                                            <p>• Bảo hành chính hãng {car.warranty || '3 năm'}</p>
                                            <p>• Bảo dưỡng miễn phí {car.maintenance || '5 lần đầu'}</p>
                                            <p>• Hỗ trợ 24/7</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'specs' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-indigo-900 mb-4">Thông số kỹ thuật</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="font-semibold text-indigo-900 mb-4">Động cơ</h4>
                                        <div className="space-y-3">
                                            <div className="flex justify-between py-2 border-b border-gray-100">
                                                <span className="text-blue-700">Loại động cơ</span>
                                                <span className="font-medium text-indigo-900">{car.engineType || 'Turbo'}</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-gray-100">
                                                <span className="text-blue-700">Dung tích</span>
                                                <span className="font-medium text-indigo-900">{car.engineSize || '2.0L'}</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-gray-100">
                                                <span className="text-blue-700">Công suất</span>
                                                <span className="font-medium text-indigo-900">{car.power || '150 HP'}</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-gray-100">
                                                <span className="text-blue-700">Mô-men xoắn</span>
                                                <span className="font-medium text-indigo-900">{car.torque || '200 Nm'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-indigo-900 mb-4">Kích thước</h4>
                                        <div className="space-y-3">
                                            <div className="flex justify-between py-2 border-b border-gray-100">
                                                <span className="text-blue-700">Chiều dài</span>
                                                <span className="font-medium text-indigo-900">{car.length || '4.7m'}</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-gray-100">
                                                <span className="text-blue-700">Chiều rộng</span>
                                                <span className="font-medium text-indigo-900">{car.width || '1.8m'}</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-gray-100">
                                                <span className="text-blue-700">Chiều cao</span>
                                                <span className="font-medium text-indigo-900">{car.height || '1.5m'}</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-gray-100">
                                                <span className="text-blue-700">Khoảng sáng gầm</span>
                                                <span className="font-medium text-indigo-900">{car.groundClearance || '180mm'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-bold text-indigo-900">Đánh giá & Bình luận</h3>
                                    <div className="flex items-center gap-2">
                                        {renderStars(averageRating)}
                                        <span className="text-lg font-semibold text-indigo-900">{averageRating.toFixed(1)}/5</span>
                                    </div>
                                </div>
                                {/* Form đánh giá */}
                                <form onSubmit={handleAddComment} className="bg-blue-50 rounded-2xl p-6">
                                    <h4 className="font-semibold text-indigo-900 mb-4">Viết đánh giá</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <input
                                            value={user}
                                            onChange={e => setUser(e.target.value)}
                                            className="border border-blue-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
                                            placeholder="Tên của bạn"
                                            required
                                        />
                                        <div className="flex items-center gap-2">
                                            <span className="text-blue-700">Đánh giá:</span>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                        className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    >
                                                        ★
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <textarea
                                        value={content}
                                        onChange={e => setContent(e.target.value)}
                                        className="w-full border border-blue-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                                        rows={3}
                                        placeholder="Chia sẻ trải nghiệm của bạn..."
                                        required
                                    />
                                    <div className="mt-4 flex justify-end">
                                        <Button color="primary" type="submit">Gửi đánh giá</Button>
                                    </div>
                                </form>
                                {/* Danh sách đánh giá */}
                                <div className="space-y-4">
                                    {comments.length === 0 ? (
                                        <div className="text-center py-8 text-blue-700">Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá!</div>
                                    ) : (
                                        comments.map((comment: { id: string; user: string; content: string; rating?: number; date: string }) => (
                                            <div key={comment.id} className="bg-gray-50 rounded-xl p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold">
                                                        {comment.user.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className="font-semibold text-indigo-900">{comment.user}</span>
                                                            <div className="flex gap-1">
                                                                {renderStars(comment.rating || 5)}
                                                            </div>
                                                            <span className="text-sm text-blue-600">{formatDate(comment.date)}</span>
                                                        </div>
                                                        <p className="text-blue-700/80 leading-relaxed">{comment.content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 