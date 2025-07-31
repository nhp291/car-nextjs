'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Car } from '../mock/cars.mock';
import { IcHeartFilled } from '@/app/public/icons/IcHeartFilled';
import { IcHeartOutline } from '@/app/public/icons/IcHeartOutline';
import { IcSteeringWheel } from '@/app/public/icons/IcSteeringWheel';
import { IcTire } from '@/app/public/icons/IcTire';
import { IcGas } from '@/app/public/icons/IcGas';

interface CarCardProps {
    car: Car;
    showFavorite?: boolean;
    onFavoriteToggle?: (carId: string) => void;
    isFavorite?: boolean;
    variant?: 'default' | 'compact' | 'featured';
}

export default function CarCard({
    car,
    showFavorite = true,
    onFavoriteToggle,
    isFavorite = false,
    variant = 'default'
}: CarCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onFavoriteToggle?.(car.id);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(price);
    };

    const getVariantClasses = () => {
        switch (variant) {
            case 'compact':
                return 'p-4';
            case 'featured':
                return 'p-6 border-2 border-blue-200';
            default:
                return 'p-6';
        }
    };

    const getImageClasses = () => {
        switch (variant) {
            case 'compact':
                return 'h-32';
            case 'featured':
                return 'h-48';
            default:
                return 'h-40';
        }
    };

    return (
        <Link href={`/cars/${car.slug}`}>
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all border border-gray-100 flex flex-col h-full">
                {/* Image Container */}
                <div className="relative flex items-center justify-center h-48 bg-gray-100 rounded-t-2xl overflow-hidden">
                    {!imageLoaded && !imageError && (
                        <div className="animate-pulse bg-gray-200 w-full h-full"></div>
                    )}
                    {imageError ? (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                        </div>
                    ) : (
                        <Image
                            src={car.image}
                            alt={car.name}
                            fill
                            className={`object-contain h-40 w-full transition-transform duration-300 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                                }`}
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                        />
                    )}
                    {/* Favorite Button */}
                    {showFavorite && (
                        <button
                            onClick={handleFavoriteClick}
                            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                        >
                            {isFavorite ? (
                                <IcHeartFilled width="20px" height="20px" />
                            ) : (
                                <IcHeartOutline width="20px" height="20px" />
                            )}
                        </button>
                    )}
                    {/* Badge */}
                    {car.isNew && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                            Mới
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 gap-2">
                    {/* Brand and Name */}
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {car.name}
                        </h3>
                        <p className="text-sm text-gray-500">{car.brand}</p>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mt-1">
                        <span className="text-xl font-bold text-blue-600">
                            {formatPrice(car.price)}
                        </span>
                        {car.originalPrice && car.originalPrice > car.price && (
                            <span className="text-sm text-gray-400 line-through">
                                {formatPrice(car.originalPrice)}
                            </span>
                        )}
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 mt-2">
                        <div className="flex items-center gap-1">
                            <IcGas width="16px" height="16px" />
                            <span>{car.fuelType}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <IcTire width="16px" height="16px" />
                            <span>{car.transmission}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <IcSteeringWheel width="16px" height="16px" />
                            <span>{car.driveType}</span>
                        </div>
                    </div>

                    {/* Features */}
                    {variant !== 'compact' && car.features && car.features.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {car.features.slice(0, 3).map((feature, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                >
                                    {feature}
                                </span>
                            ))}
                            {car.features.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    +{car.features.length - 3}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Rating */}
                    {car.rating && (
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(car.rating!) ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">
                                {car.rating.toFixed(1)} ({car.reviewCount || 0} đánh giá)
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}

// Compact variant for lists
export function CarCardCompact({ car, showFavorite = true, onFavoriteToggle, isFavorite = false }: CarCardProps) {
    return (
        <CarCard
            car={car}
            showFavorite={showFavorite}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={isFavorite}
            variant="compact"
        />
    );
}

// Featured variant for hero sections
export function CarCardFeatured({ car, showFavorite = true, onFavoriteToggle, isFavorite = false }: CarCardProps) {
    return (
        <CarCard
            car={car}
            showFavorite={showFavorite}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={isFavorite}
            variant="featured"
        />
    );
} 