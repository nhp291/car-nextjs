'use client';

import Image from 'next/image';
import { useState } from 'react';
import { news } from '../../mock/news.mock';
import { HeroSearchBar } from '../../components/SearchBar';
import CarCard, { CarCardFeatured } from '../../components/CarCard';
import { IcArrowDown } from '../../public/icons/IcArrowDown';
import { IcHeartFilled } from '../../public/icons/IcHeartFilled';
import { IcCarLogo } from '../../public/icons/IcCarLogo';
import { IcMagnifying } from '../../public/icons/IcMagnifying';
import { cars, Car } from '../../mock/cars.mock';
import Car3DViewer from '../../components/Car3DViewer';

export default function HomeClient() {
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [favorites, setFavorites] = useState<string[]>([]);

    const categories = ['Tất cả', 'Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Pickup', 'Van', 'Supercar'];

    const handleFavoriteToggle = (carId: string) => {
        setFavorites(prev =>
            prev.includes(carId)
                ? prev.filter(id => id !== carId)
                : [...prev, carId]
        );
    };

    const filteredCars = selectedCategory === 'Tất cả'
        ? cars
        : cars.filter((car: Car) => car.category === selectedCategory);

    const featuredCars = cars.filter((car: Car) => car.isNew || car.category === 'Supercar').slice(0, 3);
    const latestNews = news.slice(0, 3);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
            <section className="relative z-10 px-2 md:px-4 max-w-7xl mx-auto pt-6">
                <div className="flex flex-col md:flex-row gap-10 items-center justify-center w-full animate-fade-in">
                    <div className="flex-1 w-full max-w-xl flex flex-col items-start justify-center gap-8 bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 p-10 transition-all duration-300 hover:shadow-[0_8px_40px_0_rgba(80,80,200,0.15)]">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-700 mb-2 drop-shadow-2xl">Car Next.js</h1>
                        <p className="text-lg md:text-xl text-blue-900/80 font-medium mb-2">Nền tảng tra cứu & trải nghiệm xe hiện đại, công nghệ mới nhất 2025</p>
                        <HeroSearchBar cars={cars} />
                    </div>
                    <div className="flex-1 w-full max-w-3xl flex items-center justify-center">
                        <div className="w-full flex items-center justify-center">
                            <Car3DViewer />
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
                    <IcArrowDown width="24px" height="24px" />
                </div>
            </section>

            <section className="py-8 bg-white/80 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${selectedCategory === category
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-white/80 text-gray-700 hover:bg-blue-50 border border-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-white to-blue-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Xe nổi bật
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Khám phá những mẫu xe mới nhất và được yêu thích nhất với công nghệ hiện đại
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCars.map((car: Car) => (
                            <CarCardFeatured
                                key={car.id}
                                car={car}
                                isFavorite={favorites.includes(car.id)}
                                onFavoriteToggle={handleFavoriteToggle}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Tất cả xe hơi
                        </h2>
                        <p className="text-lg text-gray-600">
                            {filteredCars.length} xe được tìm thấy
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

            <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Tin tức mới nhất
                        </h2>
                        <p className="text-lg text-gray-600">
                            Cập nhật những tin tức mới nhất về xe hơi và công nghệ
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestNews.map((article) => (
                            <div key={article.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift">
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-300 hover:scale-110"
                                        priority={false}
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                        <span>{new Date(article.publishedAt).toLocaleDateString('vi-VN')}</span>
                                        <span>•</span>
                                        <span>{article.readTime} phút đọc</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                        {article.title}
                                    </h3>

                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {article.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Image
                                                src={article.author.avatar}
                                                alt={article.author.name}
                                                width={32}
                                                height={32}
                                                className="rounded-full"
                                            />
                                            <span className="text-sm text-gray-700">{article.author.name}</span>
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span>{article.views} lượt xem</span>
                                            <span>{article.likes} thích</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Tại sao chọn Car Next.js?
                        </h2>
                        <p className="text-lg text-gray-600">
                            Những tính năng độc đáo giúp bạn có trải nghiệm tốt nhất
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <IcCarLogo width="32px" height="32px" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Xem xe 3D
                            </h3>
                            <p className="text-gray-600">
                                Trải nghiệm xe hơi với công nghệ 3D hiện đại, xem từ mọi góc độ
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <IcMagnifying width="32px" height="32px" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Tìm kiếm thông minh
                            </h3>
                            <p className="text-gray-600">
                                Tìm kiếm xe hơi nhanh chóng với bộ lọc thông minh và gợi ý
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <IcHeartFilled width="32px" height="32px" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Yêu thích & So sánh
                            </h3>
                            <p className="text-gray-600">
                                Lưu xe yêu thích và so sánh các mẫu xe một cách dễ dàng
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Sẵn sàng khám phá xe hơi?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Tham gia cùng hàng nghìn người dùng đã tin tưởng Car Next.js
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                            Bắt đầu ngay
                        </button>
                        <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                            Tìm hiểu thêm
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}



