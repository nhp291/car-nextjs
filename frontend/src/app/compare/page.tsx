'use client';

import { useState, useEffect } from 'react';
import { cars, Car } from '@/lib/mocks/cars.mock';
import { IcCarLogo } from '@/components/icons/IcCarLogo';
import { IcMagnifying } from '@/components/icons/IcMagnifying';
import { IcHeartFilled } from '@/components/icons/IcHeartFilled';
import { IcClose } from '@/components/icons/IcClose';
import Image from 'next/image';

export default function ComparePage() {
    const [selectedCars, setSelectedCars] = useState<Car[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const filteredCars = cars.filter(car =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addCarToCompare = (car: Car) => {
        if (selectedCars.length < 3 && !selectedCars.find(c => c.id === car.id)) {
            setSelectedCars([...selectedCars, car]);
        }
    };

    const removeCarFromCompare = (carId: string) => {
        setSelectedCars(selectedCars.filter(car => car.id !== carId));
    };

    const clearAll = () => {
        setSelectedCars([]);
    };

    const getComparisonValue = (car: Car, property: keyof Car) => {
        const value = car[property];
        if (typeof value === 'number') {
            return value.toLocaleString();
        }
        return value;
    };

    const getComparisonWinner = (property: keyof Car, higherIsBetter = true) => {
        if (selectedCars.length < 2) return null;
        
        const values = selectedCars.map(car => {
            const value = car[property];
            return typeof value === 'number' ? value : 0;
        });
        
        if (higherIsBetter) {
            const maxValue = Math.max(...values);
            return values.indexOf(maxValue);
        } else {
            const minValue = Math.min(...values);
            return values.indexOf(minValue);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-white/50 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                <IcCarLogo width="24px" height="24px" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">So sánh xe</h1>
                                <p className="text-slate-600">Chọn tối đa 3 xe để so sánh</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            {selectedCars.length > 0 && (
                                <button
                                    onClick={clearAll}
                                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    Xóa tất cả
                                </button>
                            )}
                            
                            <button
                                onClick={() => setShowSearch(!showSearch)}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                            >
                                <IcMagnifying width="20px" height="20px" />
                                <span className="ml-2">Thêm xe</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Modal */}
            {showSearch && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
                        <div className="p-6 border-b border-slate-200">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-slate-900">Chọn xe để so sánh</h2>
                                <button
                                    onClick={() => setShowSearch(false)}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <IcClose width="20px" height="20px" />
                                </button>
                            </div>
                            
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm xe..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <IcMagnifying width="20px" height="20px" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            </div>
                        </div>
                        
                        <div className="p-6 max-h-96 overflow-y-auto">
                            <div className="grid gap-4">
                                {filteredCars.map((car) => (
                                    <div
                                        key={car.id}
                                        onClick={() => {
                                            addCarToCompare(car);
                                            setShowSearch(false);
                                        }}
                                        className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-all duration-300 hover:shadow-md"
                                    >
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-100">
                                            <Image
                                                src={car.image}
                                                alt={car.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-slate-900">{car.name}</h3>
                                            <p className="text-slate-600 text-sm">{car.brand}</p>
                                            <p className="text-blue-600 font-medium">{car.price.toLocaleString()} VNĐ</p>
                                        </div>
                                        <div className="text-slate-400">
                                            <IcCarLogo width="20px" height="20px" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {selectedCars.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-20">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <IcCarLogo width="64px" height="64px" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Chưa có xe nào được chọn</h2>
                        <p className="text-slate-600 mb-8 max-w-md mx-auto">
                            Chọn ít nhất 2 xe để bắt đầu so sánh và tìm ra lựa chọn tốt nhất cho bạn
                        </p>
                        <button
                            onClick={() => setShowSearch(true)}
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-semibold"
                        >
                            <IcMagnifying width="20px" height="20px" className="inline mr-2" />
                            Thêm xe để so sánh
                        </button>
                    </div>
                ) : (
                    /* Comparison Table */
                    <div className="space-y-8">
                        {/* Selected Cars Header */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {selectedCars.map((car, index) => (
                                <div key={car.id} className="bg-white rounded-2xl shadow-lg border border-white/50 overflow-hidden">
                                    <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200">
                                        <Image
                                            src={car.image}
                                            alt={car.name}
                                            fill
                                            className="object-cover"
                                        />
                                        <button
                                            onClick={() => removeCarFromCompare(car.id)}
                                            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                                        >
                                            <IcClose width="16px" height="16px" />
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{car.name}</h3>
                                        <p className="text-slate-600 mb-4">{car.brand}</p>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Giá:</span>
                                                <span className="font-semibold text-blue-600">{car.price.toLocaleString()} VNĐ</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Năm:</span>
                                                <span className="font-semibold">{car.year}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Loại:</span>
                                                <span className="font-semibold">{car.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Comparison Table */}
                        <div className="bg-white rounded-2xl shadow-lg border border-white/50 overflow-hidden">
                            <div className="p-6 border-b border-slate-200">
                                <h2 className="text-2xl font-bold text-slate-900">Chi tiết so sánh</h2>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <tbody>
                                        {[
                                            { key: 'price', label: 'Giá', higherIsBetter: false },
                                            { key: 'year', label: 'Năm sản xuất', higherIsBetter: true },
                                            { key: 'category', label: 'Loại xe', higherIsBetter: null },
                                            { key: 'brand', label: 'Thương hiệu', higherIsBetter: null },
                                        ].map(({ key, label, higherIsBetter }) => (
                                            <tr key={key} className="border-b border-slate-100">
                                                <td className="px-6 py-4 bg-slate-50 font-semibold text-slate-700 min-w-[200px]">
                                                    {label}
                                                </td>
                                                {selectedCars.map((car, index) => {
                                                    const winner = higherIsBetter !== null ? getComparisonWinner(key as keyof Car, higherIsBetter) : null;
                                                    const isWinner = winner === index;
                                                    
                                                    return (
                                                        <td key={car.id} className={`px-6 py-4 ${isWinner ? 'bg-green-50' : ''}`}>
                                                            <div className="flex items-center justify-between">
                                                                <span className={isWinner ? 'font-semibold text-green-700' : 'text-slate-700'}>
                                                                    {getComparisonValue(car, key as keyof Car)}
                                                                </span>
                                                                {isWinner && (
                                                                    <span className="text-green-500 text-lg">🏆</span>
                                                                )}
                                                            </div>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">💡 Gợi ý lựa chọn</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white rounded-xl p-4 border border-white/50">
                                    <h4 className="font-semibold text-slate-900 mb-2">Giá tốt nhất</h4>
                                    <p className="text-slate-600 text-sm">
                                        {(() => {
                                            const winner = getComparisonWinner('price', false);
                                            return winner !== null ? selectedCars[winner].name : 'Chưa đủ dữ liệu';
                                        })()}
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-white/50">
                                    <h4 className="font-semibold text-slate-900 mb-2">Mới nhất</h4>
                                    <p className="text-slate-600 text-sm">
                                        {(() => {
                                            const winner = getComparisonWinner('year', true);
                                            return winner !== null ? selectedCars[winner].name : 'Chưa đủ dữ liệu';
                                        })()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
