'use client';
import { useState, useEffect } from 'react';
import { Button, TextField } from '../components';
import { IcCarLogo } from '@/app/public/icons/IcCarLogo';
import { IcGas } from '@/app/public/icons/IcGas';
import { IcTire } from '@/app/public/icons/IcTire';
import { IcSteeringWheel } from '@/app/public/icons/IcSteeringWheel';
import { IcHeartFilled } from '@/app/public/icons/IcHeartFilled';
import { IcMagnifying } from '@/app/public/icons/IcMagnifying';
import { IcClose } from '@/app/public/icons/IcClose';
import Link from 'next/link';

interface FavoriteCar {
    id: string;
    name: string;
    brand: string;
    type: string;
    price: string;
    rating: number;
    gas: string;
    tire: string;
    steering: string;
    image: string;
    badge: string;
    addedDate: string;
    notes?: string;
}

export default function Favorites() {
    const [favorites, setFavorites] = useState<FavoriteCar[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [sortBy, setSortBy] = useState('date');

    // Mock data - in real app this would come from localStorage or API
    useEffect(() => {
        const mockFavorites: FavoriteCar[] = [
            {
                id: 'toyota-camry',
                name: 'Toyota Camry',
                brand: 'Toyota',
                type: 'Sedan',
                price: '1.2 tỷ',
                rating: 4.8,
                gas: '5.8L/100km',
                tire: '18 inch',
                steering: 'Tự động',
                image: '/public/images/car.png',
                badge: 'Mới',
                addedDate: '2024-01-15',
                notes: 'Xe gia đình tốt, tiết kiệm nhiên liệu'
            },
            {
                id: 'honda-cr-v',
                name: 'Honda CR-V',
                brand: 'Honda',
                type: 'SUV',
                price: '1.5 tỷ',
                rating: 4.6,
                gas: '6.2L/100km',
                tire: '19 inch',
                steering: 'Tự động',
                image: '/public/images/car.png',
                badge: 'Hot',
                addedDate: '2024-01-10',
                notes: 'SUV đa dụng, phù hợp gia đình'
            },
            {
                id: 'vinfast-vf8',
                name: 'VinFast VF8',
                brand: 'VinFast',
                type: 'Electric SUV',
                price: '2.1 tỷ',
                rating: 4.9,
                gas: '0L/100km',
                tire: '20 inch',
                steering: 'Tự động',
                image: '/public/images/car.png',
                badge: 'Electric',
                addedDate: '2024-01-05',
                notes: 'Xe điện thông minh, công nghệ Việt'
            },
            {
                id: 'mercedes-c300',
                name: 'Mercedes C300',
                brand: 'Mercedes',
                type: 'Luxury Sedan',
                price: '3.2 tỷ',
                rating: 4.9,
                gas: '7.1L/100km',
                tire: '19 inch',
                steering: 'Tự động',
                image: '/public/images/car.png',
                badge: 'Luxury',
                addedDate: '2024-01-01',
                notes: 'Xe sang cao cấp, nội thất đỉnh cao'
            }
        ];
        setFavorites(mockFavorites);
    }, []);

    const removeFromFavorites = (carId: string) => {
        setFavorites(favorites.filter(car => car.id !== carId));
    };

    const filteredAndSortedFavorites = favorites
        .filter(car => {
            const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.brand.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === 'all' || car.type.toLowerCase().includes(filterType.toLowerCase());
            return matchesSearch && matchesType;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price':
                    return parseFloat(a.price.replace(/[^\d]/g, '')) - parseFloat(b.price.replace(/[^\d]/g, ''));
                case 'rating':
                    return b.rating - a.rating;
                case 'date':
                default:
                    return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
            }
        });

    const getTypeCount = (type: string) => {
        return favorites.filter(car => car.type.toLowerCase().includes(type.toLowerCase())).length;
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-16">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-4">
                        Xe yêu thích
                    </h1>
                    <p className="text-xl text-blue-700/80 max-w-2xl mx-auto">
                        Quản lý danh sách xe yêu thích của bạn và dễ dàng so sánh, tìm kiếm
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-xl">
                        <div className="text-3xl font-bold text-indigo-900 mb-2">{favorites.length}</div>
                        <div className="text-blue-700/80">Tổng số xe</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-xl">
                        <div className="text-3xl font-bold text-green-600 mb-2">{getTypeCount('sedan')}</div>
                        <div className="text-blue-700/80">Sedan</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-xl">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{getTypeCount('suv')}</div>
                        <div className="text-blue-700/80">SUV</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-xl">
                        <div className="text-3xl font-bold text-purple-600 mb-2">{getTypeCount('electric')}</div>
                        <div className="text-blue-700/80">Điện</div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex flex-col md:flex-row gap-4 flex-1">
                            <TextField
                                className=' text-[#334155]'
                                width="300px"
                                height="44px"
                                color="primary"
                                placeholder="Tìm kiếm xe yêu thích..."
                                value={searchTerm}
                                onChange={setSearchTerm}
                                startIcon={<IcMagnifying width="20px" height="20px" />}
                            />

                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-4 py-2 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none text-blue-900"
                            >
                                <option value="all">Tất cả loại xe</option>
                                <option value="sedan">Sedan</option>
                                <option value="suv">SUV</option>
                                <option value="electric">Điện</option>
                                <option value="luxury">Luxury</option>
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none text-blue-900"
                            >
                                <option value="date">Sắp xếp theo ngày thêm</option>
                                <option value="name">Sắp xếp theo tên</option>
                                <option value="price">Sắp xếp theo giá</option>
                                <option value="rating">Sắp xếp theo đánh giá</option>
                            </select>
                        </div>

                        <Link href="/compare">
                            <Button color="primary" width="150px" height="44px">
                                So sánh xe
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Favorites List */}
                {filteredAndSortedFavorites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredAndSortedFavorites.map((car) => (
                            <div key={car.id} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 hover:scale-105 transition-all duration-300 group relative">
                                {/* Remove button */}
                                <button
                                    onClick={() => removeFromFavorites(car.id)}
                                    className="absolute top-4 right-4 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <IcClose width="16px" height="16px" />
                                </button>

                                {/* Car icon and badge */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <IcCarLogo width="40px" height="40px" />
                                        <div>
                                            <h3 className="font-bold text-indigo-900">{car.name}</h3>
                                            <p className="text-sm text-blue-700/80">{car.brand}</p>
                                        </div>
                                    </div>
                                    <span className="bg-gradient-to-r from-blue-200 to-indigo-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                                        {car.badge}
                                    </span>
                                </div>

                                {/* Price and rating */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xl font-bold text-green-600">{car.price}</span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-500">★</span>
                                        <span className="font-semibold text-blue-700">{car.rating}</span>
                                    </div>
                                </div>

                                {/* Car specs */}
                                <div className="flex gap-4 text-xs text-blue-900/80 mb-4">
                                    <span className="flex items-center gap-1">
                                        <IcGas width="16px" height="16px" /> {car.gas}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <IcTire width="16px" height="16px" /> {car.tire}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <IcSteeringWheel width="16px" height="16px" /> {car.steering}
                                    </span>
                                </div>

                                {/* Type badge */}
                                <div className="mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${car.type.includes('Electric') ? 'bg-green-100 text-green-700' :
                                        car.type.includes('Luxury') ? 'bg-purple-100 text-purple-700' :
                                            car.type.includes('SUV') ? 'bg-blue-100 text-blue-700' :
                                                'bg-gray-100 text-gray-700'
                                        }`}>
                                        {car.type}
                                    </span>
                                </div>

                                {/* Notes */}
                                {car.notes && (
                                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-blue-700/80 italic">&quot;{car.notes}&quot;</p>
                                    </div>
                                )}

                                {/* Added date */}
                                <div className="text-xs text-blue-500/60 mb-4">
                                    Đã thêm: {new Date(car.addedDate).toLocaleDateString('vi-VN')}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Link href={`/cars/${car.id}`} className="flex-1">
                                        <Button color="primary" width="100%" height="38px">
                                            Xem chi tiết
                                        </Button>
                                    </Link>
                                    <Button color="secondary" width="80px" height="38px">
                                        <IcHeartFilled width="20px" height="20px" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <IcHeartFilled width="48px" height="48px" />
                        </div>
                        <h3 className="text-2xl font-bold text-indigo-900 mb-2">
                            {favorites.length === 0 ? 'Chưa có xe yêu thích' : 'Không tìm thấy xe phù hợp'}
                        </h3>
                        <p className="text-blue-700/80 mb-6">
                            {favorites.length === 0
                                ? 'Hãy khám phá các mẫu xe và thêm vào danh sách yêu thích của bạn'
                                : 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm'
                            }
                        </p>
                        <Link href="/cars">
                            <Button color="primary" width="200px" height="50px">
                                Khám phá xe ngay
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Export/Share Section */}
                {favorites.length > 0 && (
                    <div className="mt-12 bg-white/60 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
                        <h3 className="text-xl font-bold text-indigo-900 mb-4">Chia sẻ danh sách</h3>
                        <div className="flex flex-wrap gap-4">
                            <Button color="accent" width="150px" height="44px">
                                📧 Xuất PDF
                            </Button>
                            <Button color="secondary" width="150px" height="44px">
                                📱 Chia sẻ
                            </Button>
                            <Button color="primary" width="150px" height="44px">
                                💾 Sao lưu
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
} 