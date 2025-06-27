'use client';

import { useState, useMemo } from 'react';
import { Button, TextField, CarCard } from '../components';
import { cars } from '../mock/cars.mock';
import { IcCarLogo } from '@/app/public/icons/IcCarLogo';
import { IcMagnifying } from '@/app/public/icons/IcMagnifying';

export default function Cars() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Lọc xe theo điều kiện
    const filteredCars = useMemo(() => {
        return cars.filter(car => {
            const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.brand.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesBrand = !selectedBrand || car.brand === selectedBrand;
            const matchesCategory = !selectedCategory || car.category === selectedCategory;
            const matchesPrice = !selectedPriceRange ||
                (selectedPriceRange === 'under-500' && car.price < 500000000) ||
                (selectedPriceRange === '500-1000' && car.price >= 500000000 && car.price < 1000000000) ||
                (selectedPriceRange === '1000-2000' && car.price >= 1000000000 && car.price < 2000000000) ||
                (selectedPriceRange === 'over-2000' && car.price >= 2000000000);

            return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
        });
    }, [searchTerm, selectedBrand, selectedCategory, selectedPriceRange]);

    // Phân trang
    const paginatedCars = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredCars.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredCars, currentPage]);

    const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

    // Lấy danh sách brand và category duy nhất
    const brands = [...new Set(cars.map(car => car.brand))];
    const categories = [...new Set(cars.map(car => car.category))];

    const handleResetFilters = () => {
        setSearchTerm('');
        setSelectedBrand('');
        setSelectedCategory('');
        setSelectedPriceRange('');
        setCurrentPage(1);
    };

    return (
        <main className="max-w-7xl mx-auto py-16 px-4">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-indigo-900 mb-4">
                    Khám phá xe hơi
                </h1>
                <p className="text-xl text-blue-700/80 max-w-2xl mx-auto">
                    Tìm kiếm và so sánh các mẫu xe hơi mới nhất với đầy đủ thông tin chi tiết
                </p>
            </div>

            {/* Bộ lọc */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <TextField
                        color='accent'
                        width='100%'
                        height='44px'
                        placeholder='Tìm kiếm xe...'
                        value={searchTerm}
                        onChange={(value) => setSearchTerm(value)}
                        startIcon={<IcMagnifying width="20px" height="20px" />}
                    />

                    <select
                        className="border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-blue-900"
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                    >
                        <option value="">Tất cả hãng xe</option>
                        {brands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>

                    <select
                        className="border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-blue-900"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Tất cả loại xe</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>

                    <select
                        className="border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-blue-900"
                        value={selectedPriceRange}
                        onChange={(e) => setSelectedPriceRange(e.target.value)}
                    >
                        <option value="">Tất cả giá</option>
                        <option value="under-500">Dưới 500 triệu</option>
                        <option value="500-1000">500 triệu - 1 tỷ</option>
                        <option value="1000-2000">1 tỷ - 2 tỷ</option>
                        <option value="over-2000">Trên 2 tỷ</option>
                    </select>

                    <Button
                        width='100%'
                        height='44px'
                        color='accent'
                        onClick={handleResetFilters}
                    >
                        Đặt lại
                    </Button>
                </div>

                {/* Kết quả tìm kiếm */}
                <div className="mt-4 text-sm text-blue-700/80">
                    Tìm thấy {filteredCars.length} xe phù hợp
                </div>
            </div>

            {/* Danh sách xe */}
            {paginatedCars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedCars.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="mx-auto mb-4 opacity-50">
                        <IcCarLogo width="80px" height="80px" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">
                        Không tìm thấy xe phù hợp
                    </h3>
                    <p className="text-blue-700/80 mb-4">
                        Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                    </p>
                    <Button color="primary" onClick={handleResetFilters}>
                        Xóa bộ lọc
                    </Button>
                </div>
            )}

            {/* Phân trang */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                    <Button
                        width="40px"
                        height="40px"
                        color="secondary"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </Button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                            <Button
                                key={page}
                                width="40px"
                                height="40px"
                                color={currentPage === page ? "primary" : "secondary"}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </Button>
                        );
                    })}

                    {totalPages > 5 && (
                        <>
                            {currentPage > 3 && <span className="px-2 py-2">...</span>}
                            {currentPage > 3 && currentPage < totalPages - 2 && (
                                <Button
                                    width="40px"
                                    height="40px"
                                    color="primary"
                                >
                                    {currentPage}
                                </Button>
                            )}
                            {currentPage < totalPages - 2 && <span className="px-2 py-2">...</span>}
                            {currentPage < totalPages - 2 && (
                                <Button
                                    width="40px"
                                    height="40px"
                                    color="secondary"
                                    onClick={() => setCurrentPage(totalPages)}
                                >
                                    {totalPages}
                                </Button>
                            )}
                        </>
                    )}

                    <Button
                        width="40px"
                        height="40px"
                        color="secondary"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </Button>
                </div>
            )}
        </main>
    );
} 