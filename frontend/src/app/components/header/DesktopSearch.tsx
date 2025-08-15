'use client';

import { useState, KeyboardEvent } from "react";
import { IcMagnifying } from '@/app/public/icons/IcMagnifying';

interface DesktopSearchProps {
    isOpen: boolean;
    onClose: () => void;
    searchRef?: React.RefObject<HTMLDivElement | null>;
}

export const DesktopSearch = ({ isOpen, onClose, searchRef }: DesktopSearchProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            // Tạm thời hiển thị kết quả mẫu
            setSearchResults([
                `Kết quả tìm kiếm cho: "${searchQuery}"`,
                'Toyota Camry 2024',
                'Honda Civic 2024',
                'BMW X5 2024',
                'Mercedes C-Class 2024'
            ]);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            ref={searchRef}
            className="fixed inset-0 z-50 hidden md:flex items-start justify-center bg-black/30 backdrop-blur-sm"
        >
            <div className="bg-white/95 rounded-2xl shadow-2xl border border-blue-200 py-6 px-8 mt-20 w-full max-w-2xl mx-4 animate-slide-in-up relative">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Tìm kiếm xe, hãng xe, loại xe..."
                        className="w-full px-6 py-4 pl-16 text-black rounded-2xl border border-blue-200 focus:ring-2 focus:ring-blue-400 outline-none text-lg"
                        autoFocus
                    />
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500">
                        <IcMagnifying width="24px" height="24px" />
                    </span>
                    <button
                        onClick={handleSearch}
                        className="absolute right-16 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 text-sm font-semibold px-3 py-1 rounded-lg hover:bg-blue-50"
                    >
                        Tìm
                    </button>
                    <button
                        onClick={onClose}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 text-2xl font-bold"
                        aria-label="Đóng tìm kiếm"
                    >
                        ×
                    </button>
                </div>
                
                {/* Hiển thị kết quả tìm kiếm */}
                {searchResults.length > 0 && (
                    <div className="mt-4 border-t border-gray-200 pt-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Kết quả tìm kiếm:</h3>
                        <div className="space-y-2">
                            {searchResults.map((result, index) => (
                                <div 
                                    key={index} 
                                    className="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                                >
                                    {result}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                <div className="mt-4 text-sm text-gray-500 text-center">
                    Nhấn Enter để tìm kiếm hoặc ESC để đóng
                </div>
            </div>
        </div>
    );
};
