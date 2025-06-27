'use client';
import { useState } from 'react';
import Link from 'next/link';
import { News } from '../mock/news.mock';
import { IcHeartFilled } from '@/app/public/icons/IcHeartFilled';
import { IcHeartOutline } from '@/app/public/icons/IcHeartOutline';
import { IcArrowRight } from '@/app/public/icons/IcArrowRight';

interface NewsCardProps {
    news: News;
    variant?: 'default' | 'featured' | 'compact';
    showFavorite?: boolean;
    onFavoriteToggle?: (newsId: string) => void;
    isFavorite?: boolean;
}

export default function NewsCard({
    news,
    variant = 'default',
    showFavorite = true,
    onFavoriteToggle,
    isFavorite = false
}: NewsCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onFavoriteToggle?.(news.id);
    };

    const getVariantClasses = () => {
        switch (variant) {
            case 'featured':
                return 'p-6 border-2 border-blue-200';
            case 'compact':
                return 'p-4';
            default:
                return 'p-6';
        }
    };

    const getImageClasses = () => {
        switch (variant) {
            case 'featured':
                return 'h-64';
            case 'compact':
                return 'h-32';
            default:
                return 'h-48';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Link href={`/news/${news.slug}`}>
            <div className={`group bg-white rounded-2xl shadow-lg hover-lift overflow-hidden border border-gray-100 ${getVariantClasses()}`}>
                {/* Image Container */}
                <div className="relative mb-4 overflow-hidden rounded-xl">
                    <div className={`w-full ${getImageClasses()} bg-gray-100 flex items-center justify-center`}>
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
                            <img
                                src={news.image}
                                alt={news.title}
                                className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                                    }`}
                                onLoad={() => setImageLoaded(true)}
                                onError={() => setImageError(true)}
                            />
                        )}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                            {news.category}
                        </span>
                    </div>

                    {/* Favorite Button */}
                    {showFavorite && (
                        <button
                            onClick={handleFavoriteClick}
                            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                        >
                            {isFavorite ? (
                                <IcHeartFilled width="20px" height="20px" />
                            ) : (
                                <IcHeartOutline width="20px" height="20px" />
                            )}
                        </button>
                    )}

                    {/* Featured Badge */}
                    {news.isFeatured && variant !== 'compact' && (
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
                                Nổi bật
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                    {/* Meta Information */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                            <img
                                src={news.author.avatar}
                                alt={news.author.name}
                                className="w-6 h-6 rounded-full"
                            />
                            <span>{news.author.name}</span>
                        </div>
                        <span>•</span>
                        <span>{formatDate(news.publishedAt)}</span>
                        <span>•</span>
                        <span>{news.readTime} phút đọc</span>
                    </div>

                    {/* Title */}
                    <h3 className={`font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 ${variant === 'featured' ? 'text-xl' : variant === 'compact' ? 'text-sm' : 'text-lg'
                        }`}>
                        {news.title}
                    </h3>

                    {/* Excerpt */}
                    {variant !== 'compact' && (
                        <p className="text-gray-600 line-clamp-3">
                            {news.excerpt}
                        </p>
                    )}

                    {/* Tags */}
                    {variant !== 'compact' && news.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {news.tags.slice(0, 3).map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                            {news.tags.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    +{news.tags.length - 3}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                            <span>{news.views.toLocaleString()} lượt xem</span>
                            <span>{news.likes} thích</span>
                            <span>{news.comments} bình luận</span>
                        </div>

                        {variant !== 'compact' && (
                            <div className="flex items-center gap-1 text-blue-600 group-hover:text-blue-700 transition-colors">
                                <span className="text-sm font-medium">Đọc thêm</span>
                                <IcArrowRight width="16px" height="16px" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

// Variant components
export function NewsCardFeatured({ news, showFavorite = true, onFavoriteToggle, isFavorite = false }: NewsCardProps) {
    return (
        <NewsCard
            news={news}
            showFavorite={showFavorite}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={isFavorite}
            variant="featured"
        />
    );
}

export function NewsCardCompact({ news, showFavorite = true, onFavoriteToggle, isFavorite = false }: NewsCardProps) {
    return (
        <NewsCard
            news={news}
            showFavorite={showFavorite}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={isFavorite}
            variant="compact"
        />
    );
} 