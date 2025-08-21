'use client';
import { useState, useEffect, useRef } from 'react';
import { IcMagnifying } from '@/components/icons/IcMagnifying';
import { IcClose } from '@/components/icons/IcClose';
import { Car } from '@/lib/mocks/cars.mock';

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
    onSelect?: (car: Car) => void;
    cars?: Car[];
    showSuggestions?: boolean;
    className?: string;
    variant?: 'default' | 'hero' | 'header';
}

export default function SearchBar({
    placeholder = 'Tìm kiếm xe...',
    onSearch,
    onSelect,
    cars = [],
    showSuggestions = true,
    className = '',
    variant = 'default'
}: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [suggestions, setSuggestions] = useState<Car[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    const getVariantClasses = () => {
        switch (variant) {
            case 'hero':
                return 'bg-white/90 backdrop-blur-sm shadow-2xl border-0';
            case 'header':
                return 'bg-gray-100 border-gray-200';
            default:
                return 'bg-white border-gray-300';
        }
    };

    const getInputClasses = () => {
        const baseClasses = 'w-full px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200';

        switch (variant) {
            case 'hero':
                return `${baseClasses} text-lg`;
            case 'header':
                return `${baseClasses} text-sm`;
            default:
                return baseClasses;
        }
    };

    useEffect(() => {
        if (query.trim() === '') {
            setSuggestions([]);
            setSelectedIndex(-1);
            return;
        }

        const filtered = cars.filter(car =>
            car.name.toLowerCase().includes(query.toLowerCase()) ||
            car.brand.toLowerCase().includes(query.toLowerCase()) ||
            car.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8);

        setSuggestions(filtered);
        setSelectedIndex(-1);
    }, [query, cars]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node) &&
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node)
            ) {
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < suggestions.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev > 0 ? prev - 1 : suggestions.length - 1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
                    handleSelect(suggestions[selectedIndex]);
                } else {
                    handleSearch();
                }
                break;
            case 'Escape':
                setIsFocused(false);
                setQuery('');
                setSuggestions([]);
                break;
        }
    };

    const handleSearch = () => {
        if (query.trim()) {
            onSearch?.(query.trim());
            setIsFocused(false);
        }
    };

    const handleSelect = (car: Car) => {
        onSelect?.(car);
        setQuery(car.name);
        setIsFocused(false);
        setSuggestions([]);
    };

    const handleClear = () => {
        setQuery('');
        setSuggestions([]);
        setSelectedIndex(-1);
        inputRef.current?.focus();
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className={`relative ${className}`}>
            {/* Search Input */}
            <div className={`relative rounded-2xl border ${getVariantClasses()}`}>
                <div className="flex items-center">
                    <div className="flex-shrink-0 pl-4">
                        <IcMagnifying width="20px" height="20px" />
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className={`${getInputClasses()} bg-transparent`}
                    />
                    {query && (
                        <button
                            onClick={handleClear}
                            className="flex-shrink-0 pr-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <IcClose width="20px" height="20px" />
                        </button>
                    )}
                    {variant === 'hero' && (
                        <button
                            onClick={handleSearch}
                            className="flex-shrink-0 px-6 py-3 bg-blue-600 text-white font-medium rounded-r-2xl hover:bg-blue-700 transition-colors"
                        >
                            Tìm kiếm
                        </button>
                    )}
                </div>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && isFocused && suggestions.length > 0 && (
                <div
                    ref={suggestionsRef}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto"
                >
                    {suggestions.map((car, index) => (
                        <div
                            key={car.id}
                            onClick={() => handleSelect(car)}
                            className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${index === selectedIndex
                                ? 'bg-blue-50 border-l-4 border-blue-500'
                                : 'hover:bg-gray-50'
                                } ${index === 0 ? 'rounded-t-2xl' : ''} ${index === suggestions.length - 1 ? 'rounded-b-2xl' : ''
                                }`}
                        >
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 truncate">{car.name}</h4>
                                <p className="text-sm text-gray-500">{car.brand}</p>
                                <p className="text-sm text-gray-400">{car.category}</p>
                            </div>
                            <div className="flex-shrink-0 text-right">
                                <p className="font-bold text-blue-600">{formatPrice(car.price)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Recent Searches */}
            {showSuggestions && isFocused && query === '' && (
                <div
                    ref={suggestionsRef}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-4"
                >
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Tìm kiếm gần đây</h4>
                    <div className="space-y-2">
                        {['Toyota Camry', 'Honda CR-V', 'BMW X5', 'Mercedes C-Class'].map((term, index) => (
                            <button
                                key={index}
                                onClick={() => setQuery(term)}
                                className="flex items-center gap-3 w-full p-2 text-left text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <IcMagnifying width="16px" height="16px" />
                                <span className="text-sm">{term}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// Specialized variants
export function HeroSearchBar({ onSearch, cars }: { onSearch?: (query: string) => void; cars?: Car[] }) {
    return (
        <SearchBar
            placeholder="Tìm kiếm xe hơi, thương hiệu, hoặc danh mục..."
            onSearch={onSearch}
            cars={cars}
            variant="hero"
            className="w-full max-w-4xl mx-auto"
        />
    );
}

export function HeaderSearchBar({ onSearch, cars }: { onSearch?: (query: string) => void; cars?: Car[] }) {
    return (
        <SearchBar
            placeholder="Tìm kiếm..."
            onSearch={onSearch}
            cars={cars}
            variant="header"
            className="w-full max-w-md"
        />
    );
} 