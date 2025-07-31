'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button, TextField } from '../components';
import { IcCarLogo } from '@/app/public/icons/IcCarLogo';
import { IcMagnifying } from '@/app/public/icons/IcMagnifying';
import { IcHeartOutline } from '@/app/public/icons/IcHeartOutline';
import { IcHeartFilled } from '@/app/public/icons/IcHeartFilled';

interface NewsArticle {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    publishDate: string;
    readTime: string;
    category: string;
    image: string;
    tags: string[];
    likes: number;
    views: number;
    isLiked: boolean;
}

const newsData: NewsArticle[] = [
    {
        id: '1',
        title: 'VinFast VF9 ra mắt tại thị trường Mỹ với công nghệ AI tiên tiến',
        excerpt: 'VinFast chính thức ra mắt mẫu SUV điện VF9 tại thị trường Mỹ với nhiều tính năng AI đột phá...',
        content: 'VinFast VF9 là mẫu SUV điện 7 chỗ ngồi đầu tiên của Việt Nam được thiết kế đặc biệt cho thị trường Mỹ. Xe được trang bị hệ thống AI thông minh, có khả năng tự lái cấp độ 3 và nhiều tính năng an toàn tiên tiến...',
        author: 'Nguyễn Văn A',
        publishDate: '2024-01-20',
        readTime: '5 phút',
        category: 'Tin tức',
        image: '/images/car.png',
        tags: ['VinFast', 'Xe điện', 'AI', 'Mỹ'],
        likes: 245,
        views: 1200,
        isLiked: false
    },
    {
        id: '2',
        title: 'Toyota ra mắt Camry 2025 với động cơ hybrid mới',
        excerpt: 'Toyota vừa giới thiệu phiên bản Camry 2025 với động cơ hybrid thế hệ mới, tiết kiệm nhiên liệu hơn 20%...',
        content: 'Camry 2025 được trang bị động cơ hybrid thế hệ 5.0 với hiệu suất nhiên liệu được cải thiện đáng kể. Xe cũng được nâng cấp hệ thống an toàn và công nghệ thông tin giải trí...',
        author: 'Trần Thị B',
        publishDate: '2024-01-18',
        readTime: '4 phút',
        category: 'Sản phẩm mới',
        image: '/images/car.png',
        tags: ['Toyota', 'Camry', 'Hybrid', '2025'],
        likes: 189,
        views: 890,
        isLiked: true
    },
    {
        id: '3',
        title: 'Công nghệ xe tự lái: Tương lai của ngành ô tô',
        excerpt: 'Công nghệ xe tự lái đang phát triển nhanh chóng với sự tham gia của nhiều hãng xe lớn...',
        content: 'Xe tự lái đang trở thành xu hướng chính trong ngành ô tô toàn cầu. Các hãng xe như Tesla, Waymo, và các OEM truyền thống đang đầu tư mạnh mẽ vào công nghệ này...',
        author: 'Lê Văn C',
        publishDate: '2024-01-15',
        readTime: '7 phút',
        category: 'Công nghệ',
        image: '/images/car.png',
        tags: ['Tự lái', 'Công nghệ', 'Tesla', 'Waymo'],
        likes: 312,
        views: 1500,
        isLiked: false
    },
    {
        id: '4',
        title: 'Honda CR-V 2024: Đánh giá chi tiết từ chuyên gia',
        excerpt: 'Honda CR-V 2024 có gì mới? Hãy cùng khám phá những cải tiến đáng chú ý của mẫu SUV này...',
        content: 'CR-V 2024 được nâng cấp toàn diện từ thiết kế đến công nghệ. Xe có không gian nội thất rộng rãi hơn, hệ thống an toàn Honda Sensing được cải tiến...',
        author: 'Phạm Thị D',
        publishDate: '2024-01-12',
        readTime: '6 phút',
        category: 'Đánh giá',
        image: '/images/car.png',
        tags: ['Honda', 'CR-V', 'Đánh giá', 'SUV'],
        likes: 156,
        views: 720,
        isLiked: false
    },
    {
        id: '5',
        title: 'Xu hướng xe điện tại Việt Nam: Cơ hội và thách thức',
        excerpt: 'Thị trường xe điện Việt Nam đang phát triển nhanh chóng với sự xuất hiện của nhiều thương hiệu mới...',
        content: 'Việt Nam đang trở thành thị trường tiềm năng cho xe điện với chính sách hỗ trợ từ Chính phủ và sự quan tâm ngày càng tăng của người tiêu dùng...',
        author: 'Vũ Hoàng E',
        publishDate: '2024-01-10',
        readTime: '8 phút',
        category: 'Phân tích',
        image: '/images/car.png',
        tags: ['Xe điện', 'Việt Nam', 'Thị trường', 'Chính sách'],
        likes: 278,
        views: 1100,
        isLiked: true
    },
    {
        id: '6',
        title: 'Mercedes-Benz EQS: Xe điện sang trọng nhất thế giới',
        excerpt: 'Mercedes-Benz EQS không chỉ là xe điện mà còn là biểu tượng của sự sang trọng và công nghệ...',
        content: 'EQS là mẫu xe điện flagship của Mercedes-Benz với thiết kế aerodynamics tối ưu, nội thất siêu sang trọng và công nghệ MBUX Hyperscreen tiên tiến...',
        author: 'Đỗ Minh F',
        publishDate: '2024-01-08',
        readTime: '5 phút',
        category: 'Luxury',
        image: '/images/car.png',
        tags: ['Mercedes', 'EQS', 'Luxury', 'Xe điện'],
        likes: 198,
        views: 950,
        isLiked: false
    }
];

export default function News() {
    const [articles, setArticles] = useState<NewsArticle[]>(newsData);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('date');

    const categories = [
        { id: 'all', name: 'Tất cả', count: newsData.length },
        { id: 'tin-tuc', name: 'Tin tức', count: 1 },
        { id: 'san-pham-moi', name: 'Sản phẩm mới', count: 1 },
        { id: 'cong-nghe', name: 'Công nghệ', count: 1 },
        { id: 'danh-gia', name: 'Đánh giá', count: 1 },
        { id: 'phan-tich', name: 'Phân tích', count: 1 },
        { id: 'luxury', name: 'Luxury', count: 1 },
    ];

    const toggleLike = (articleId: string) => {
        setArticles(articles.map(article =>
            article.id === articleId
                ? { ...article, isLiked: !article.isLiked, likes: article.isLiked ? article.likes - 1 : article.likes + 1 }
                : article
        ));
    };

    const filteredArticles = articles
        .filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesCategory = selectedCategory === 'all' || article.category.toLowerCase().includes(selectedCategory.replace('-', ' '));
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'likes':
                    return b.likes - a.likes;
                case 'views':
                    return b.views - a.views;
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'date':
                default:
                    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
            }
        });

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-16">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-4">
                        Tin tức ô tô
                    </h1>
                    <p className="text-xl text-blue-700/80 max-w-2xl mx-auto">
                        Cập nhật những tin tức mới nhất về xe hơi, công nghệ và xu hướng ngành ô tô
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex flex-col md:flex-row gap-4 flex-1">
                            <TextField
                                width="300px"
                                height="44px"
                                color="primary"
                                placeholder="Tìm kiếm tin tức..."
                                value={searchTerm}
                                onChange={setSearchTerm}
                                startIcon={<IcMagnifying width="20px" height="20px" />}
                            />

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none text-blue-900"
                            >
                                <option value="date">Mới nhất</option>
                                <option value="likes">Nhiều lượt thích</option>
                                <option value="views">Nhiều lượt xem</option>
                                <option value="title">Theo tên</option>
                            </select>
                        </div>

                        <Button color="primary" width="150px" height="44px">
                            Đăng ký nhận tin
                        </Button>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${selectedCategory === category.id
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                : 'bg-white/80 text-blue-700 hover:bg-blue-50 border border-blue-200'
                                }`}
                        >
                            {category.name} ({category.count})
                        </button>
                    ))}
                </div>

                {/* Featured Article */}
                {filteredArticles.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-indigo-900 mb-6">Bài viết nổi bật</h2>
                        <Link href={`/news/${filteredArticles[0].id}`}>
                            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <div className="grid grid-cols-1 lg:grid-cols-2">
                                    <div className="p-8">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                {filteredArticles[0].category}
                                            </span>
                                            <span className="text-blue-500 text-sm">{filteredArticles[0].readTime}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-indigo-900 mb-4">
                                            {filteredArticles[0].title}
                                        </h3>
                                        <p className="text-blue-700/80 mb-4 line-clamp-3">
                                            {filteredArticles[0].excerpt}
                                        </p>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4 text-sm text-blue-600">
                                                <span>👤 {filteredArticles[0].author}</span>
                                                <span>📅 {new Date(filteredArticles[0].publishDate).toLocaleDateString('vi-VN')}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-blue-600">
                                                <span>👁️ {filteredArticles[0].views}</span>
                                                <span>❤️ {filteredArticles[0].likes}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button color="primary" width="120px" height="40px">
                                                Đọc thêm
                                            </Button>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    toggleLike(filteredArticles[0].id);
                                                }}
                                                className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                                            >
                                                {filteredArticles[0].isLiked ?
                                                    <IcHeartFilled width="20px" height="20px" /> :
                                                    <IcHeartOutline width="20px" height="20px" />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-8">
                                        <IcCarLogo width="120px" height="120px" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.slice(1).map((article) => (
                        <Link key={article.id} href={`/news/${article.id}`}>
                            <article className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 hover:scale-105 transition-all duration-300 group cursor-pointer">
                                {/* Category and read time */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                                        {article.category}
                                    </span>
                                    <span className="text-blue-500 text-sm">{article.readTime}</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-indigo-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                    {article.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-blue-700/80 text-sm mb-4 line-clamp-3">
                                    {article.excerpt}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {article.tags.slice(0, 3).map((tag, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Author and date */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2 text-sm text-blue-600">
                                        <span>👤 {article.author}</span>
                                    </div>
                                    <span className="text-sm text-blue-500">
                                        {new Date(article.publishDate).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>

                                {/* Stats and actions */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm text-blue-600">
                                        <span>👁️ {article.views}</span>
                                        <span>❤️ {article.likes}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button color="secondary" width="80px" height="32px" className="text-xs">
                                            Đọc
                                        </Button>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                toggleLike(article.id);
                                            }}
                                            className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                                        >
                                            {article.isLiked ?
                                                <IcHeartFilled width="16px" height="16px" /> :
                                                <IcHeartOutline width="16px" height="16px" />
                                            }
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {/* Load More */}
                {filteredArticles.length > 6 && (
                    <div className="text-center mt-12">
                        <Button color="primary" width="200px" height="50px">
                            Xem thêm tin tức
                        </Button>
                    </div>
                )}

                {/* Newsletter Signup */}
                <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-4">Đăng ký nhận tin tức mới nhất</h3>
                    <p className="text-blue-100 mb-6">
                        Nhận thông báo về tin tức xe hơi mới nhất và các ưu đãi đặc biệt
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                        <TextField
                            width="100%"
                            height="44px"
                            color="secondary"
                            placeholder="Nhập email của bạn"
                            className="bg-white/20 border-white/30 text-white placeholder-white/70"
                        />
                        <Button color="accent" width="150px" height="44px">
                            Đăng ký
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
} 