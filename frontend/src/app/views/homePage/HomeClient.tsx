'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { news } from '@/lib/mocks/news.mock';
import { HeroSearchBar } from '../../components/SearchBar';
import CarCard, { CarCardFeatured } from '../../components/CarCard';
import { IcArrowDown } from '@/components/icons/IcArrowDown';
import { IcHeartFilled } from '@/components/icons/IcHeartFilled';
import { IcCarLogo } from '@/components/icons/IcCarLogo';
import { IcMagnifying } from '@/components/icons/IcMagnifying';
import { cars, Car } from '@/lib/mocks/cars.mock';
import Car3DViewer from '@/components/3d/Car3DViewer';
import { IcLogoHeader } from '@/components/icons/IcLogoHeader';

export default function HomeClient() {
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [favorites, setFavorites] = useState<string[]>([]);
    const [is3DSupported, setIs3DSupported] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const categories = ['Tất cả', 'Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Pickup', 'Van', 'Supercar'];

    useEffect(() => {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            setIs3DSupported(false);
        }
        
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    const handleFavoriteToggle = (carId: string) => {
        setFavorites(prev =>
            prev.includes(carId)
                ? prev.filter(id => id !== carId)
                : [...prev, carId]
        );
    };

    const filteredCars = selectedCategory === 'Tất cả' ? cars : cars.filter((car: Car) => car.category === selectedCategory);

    const featuredCars = cars.filter((car: Car) => car.isNew || car.category === 'Supercar').slice(0, 3);
    const latestNews = news.slice(0, 3);

    const Car3DFallback = () => (
        
        <div className="w-full mx-auto h-[700px] md:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative">
            {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div> */}
            
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-40 h-40 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center">
                    <div className="relative mb-8">
                        <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                            <IcCarLogo width="120px" height="120px" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">Trải nghiệm xe 3D</h3>
                    <p className="text-blue-100 mb-6 max-w-md mx-auto">
                        Khám phá xe hơi với công nghệ 3D hiện đại. Xoay, zoom và tương tác với mô hình xe thực tế.
                    </p>
                    
                    <div className="flex flex-wrap gap-3 justify-center">
                        <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/20">
                            🎮 Kéo để xoay
                        </div>
                        <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/20">
                            🔍 Cuộn để zoom
                        </div>
                        <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/20">
                            ✨ 4K chất lượng
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating element */}
            <div className="absolute top-8 left-8 bg-green-500/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-green-400 border border-green-500/30">
                ⚡ Hiệu suất caos
            </div>
            
            <div className="absolute bottom-8 right-8 bg-blue-500/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-blue-400 border border-blue-500/30">
                🚗 4 mẫu xe
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse delay-3000"></div>
                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/30 rounded-full animate-float-slow"></div>
                <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-400/30 rounded-full animate-float-slow delay-1000"></div>
                <div className="absolute bottom-1/4 right-1/4 w-5 h-5 bg-indigo-400/30 rounded-full animate-float-slow delay-2000"></div>
            </div>

            <section className="relative z-10 md:px-6 max-w-7xl mx-auto pt-10 pb-10">
                <div className="flex flex-col lg:flex-row gap-10 items-center justify-center w-full animate-fade-in">

                    <div className="flex-1 w-full max-w-2xl flex flex-col items-start justify-center gap-10 bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-12 transition-all duration-700 hover:shadow-[0_20px_80px_rgba(80,80,200,0.3)] hover:scale-[1.02] hover:from-white/95 hover:to-white/70">
                        <div className="flex items-center justify-center w-full">
                            <div className="relative">
                                <IcLogoHeader width="200px" height="100px" />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-xl animate-pulse"></div>
                            </div>
                        </div>
                        
                        <div className="text-center w-full">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight mb-6">
                                Nền tảng tra cứu & trải nghiệm xe hiện đại
                            </h1>
                            <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-relaxed mb-4">
                                Công nghệ mới nhất 2025
                            </p>
                            <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    Trực tuyến
                                </span>
                                <span>•</span>
                                <span>10,000+ xe</span>
                                <span>•</span>
                                <span>4K chất lượng</span>
                            </div>
                        </div>
                        
                        <div className="w-full">
                            <HeroSearchBar cars={cars} />
                        </div>

                        {/* Stats */}
                        <div className="w-full grid grid-cols-3 gap-4 pt-4">
                            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                                <div className="text-2xl font-bold text-blue-600">500+</div>
                                <div className="text-xs text-slate-600">Mẫu xe</div>
                            </div>
                            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                                <div className="text-2xl font-bold text-green-600">50K+</div>
                                <div className="text-xs text-slate-600">Người dùng</div>
                            </div>
                            <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                                <div className="text-2xl font-bold text-purple-600">4.9★</div>
                                <div className="text-xs text-slate-600">Đánh giá</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - 3D Viewer with loading state */}
                    <div className="flex-1 flex items-center justify-center">
                        {isLoading ? (
                            <div className="w-full max-w-4xl mx-auto h-[500px] md:h-[650px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative flex items-center justify-center">
                                {/* Animated background elements */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
                                    <div className="absolute top-20 right-20 w-40 h-40 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                                    <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
                                </div>
                                
                                <div className="text-center relative z-10">
                                    <div className="relative mb-8">
                                        {/* Animated background circles */}
                                        <div className="absolute inset-0 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
                                        <div className="absolute inset-0 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                                        <div className="absolute inset-0 w-32 h-32 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
                                        
                                        {/* Main spinner */}
                                        <div className="relative w-32 h-32 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                        <div className="absolute inset-0 w-32 h-32 border-4 border-purple-400 border-b-transparent rounded-full animate-spin mx-auto" style={{ animationDelay: '-0.5s' }}></div>
                                        
                                        {/* Center icon */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                                                <IcCarLogo width="32px" height="32px" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold text-white">Đang khởi tạo 3D</h3>
                                        <p className="text-blue-200 text-lg">Chuẩn bị trải nghiệm tuyệt vời...</p>
                                        
                                        {/* Progress indicators */}
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                        
                                        {/* Feature highlights */}
                                        <div className="flex flex-wrap gap-3 justify-center mt-6">
                                            <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs border border-white/20">
                                                🎮 Tương tác 3D
                                            </div>
                                            <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs border border-white/20">
                                                🔍 Zoom & Xoay
                                            </div>
                                            <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs border border-white/20">
                                                ✨ 4K chất lượng
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : is3DSupported ? (
                            <div className="w-[700px] md:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative flex items-center justify-center">
                                <Car3DViewer />
                            </div>
                        ) : (
                            <div className="w-[700px] md:h-[700px] rounded-3xl overflow-hidden shadow-2xl relative flex items-center justify-center">
                                <Car3DFallback />
                            </div>
                        )}
                    </div>
                </div>

                {/* Enhanced Scroll Down Icon */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
                    <div className="p-3 rounded-full bg-white/90 backdrop-blur-md shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 border border-white/50 group">
                        <IcArrowDown width="28px" height="28px" />
                    </div>
                </div>
            </section>

            {/* Enhanced Category Filter Section */}
            <section className="relative z-10 py-12 bg-white/80 backdrop-blur-md border-t border-white/50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Lọc theo danh mục</h3>
                        <p className="text-slate-600">Chọn loại xe bạn quan tâm</p>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 font-medium ${
                                    selectedCategory === category
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 transform scale-105'
                                        : 'bg-white/90 text-slate-700 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 hover:shadow-md'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Featured Cars Section */}
            <section className="relative z-10 py-20 bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            Nổi bật
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Xe nổi bật
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Khám phá những mẫu xe mới nhất và được yêu thích nhất với công nghệ hiện đại
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCars.map((car: Car, index) => (
                            <div 
                                key={car.id} 
                                className="transform transition-all duration-700 hover:scale-105"
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <CarCardFeatured
                                    car={car}
                                    isFavorite={favorites.includes(car.id)}
                                    onFavoriteToggle={handleFavoriteToggle}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced All Cars Section */}
            <section className="relative z-10 py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Tất cả xe hơi
                        </h2>
                        <div className="flex items-center justify-center gap-4 text-lg text-slate-600 mb-4">
                            <span className="px-4 py-2 bg-slate-100 rounded-full">
                                {filteredCars.length} xe được tìm thấy
                            </span>
                            {selectedCategory !== 'Tất cả' && (
                                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                                    {selectedCategory}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredCars.map((car: Car) => (
                            <CarCard
                                key={car.id}
                                car={car}
                                isFavorite={favorites.includes(car.id)}
                                onFavoriteToggle={handleFavoriteToggle}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Latest News Section */}
            <section className="relative z-10 py-20 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
                            📰 Tin mới
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Tin tức mới nhất
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Cập nhật những tin tức mới nhất về xe hơi và công nghệ
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestNews.map((article, index) => (
                            <div 
                                key={article.id} 
                                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 group transform hover:scale-105"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        priority={false}
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-full shadow-lg">
                                            {article.category}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                <div className="p-8">
                                    <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
                                        <span>{new Date(article.publishedAt).toLocaleDateString('vi-VN')}</span>
                                        <span>•</span>
                                        <span>{article.readTime} phút đọc</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-slate-900 mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                                        {article.title}
                                    </h3>

                                    <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                                        {article.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={article.author.avatar}
                                                alt={article.author.name}
                                                width={40}
                                                height={40}
                                                className="rounded-full border-2 border-white shadow-md"
                                            />
                                            <span className="text-sm font-medium text-slate-700">{article.author.name}</span>
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-slate-500">
                                            <span className="flex items-center gap-1">
                                                👁️ {article.views}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                ❤️ {article.likes}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Features Section */}
            <section className="relative z-10 py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Tại sao chọn <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'>NextSpark</span>?
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Những tính năng độc đáo giúp bạn có trải nghiệm tốt nhất
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <div className="text-center p-8 group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg animate-glow-pulse">
                                <IcCarLogo width="40px" height="40px" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">
                                Xem xe 3D
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                Trải nghiệm xe hơi với công nghệ 3D hiện đại, xem từ mọi góc độ với chất lượng cao
                            </p>
                        </div>

                        <div className="text-center p-8 group bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
                            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg animate-glow-pulse">
                                <IcMagnifying width="40px" height="40px" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">
                                Tìm kiếm thông minh
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                Tìm kiếm xe hơi nhanh chóng với bộ lọc thông minh và gợi ý chính xác
                            </p>
                        </div>

                        <div className="text-center p-8 group bg-gradient-to-br from-purple-50 to-violet-50 rounded-3xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg animate-glow-pulse">
                                <IcHeartFilled width="40px" height="40px" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">
                                Yêu thích & So sánh
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                Lưu xe yêu thích và so sánh các mẫu xe một cách dễ dàng và trực quan
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced CTA Section */}
            <section className="relative z-10 py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                <div className="relative max-w-5xl mx-auto text-center px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Sẵn sàng khám phá xe hơi?
                    </h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Tham gia cùng hàng nghìn người dùng đã tin tưởng NextSpark
                    </p>
                    
                    <div className="flex justify-center mb-10">
                        <div className="relative">
                            <IcLogoHeader width="240px" height="240px" />
                            <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="px-10 py-4 bg-white text-blue-600 font-bold text-lg rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl">
                            Bắt đầu ngay
                        </button>
                        <button className="px-10 py-4 border-3 border-white text-white font-bold text-lg rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl">
                            Tìm hiểu thêm
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}



