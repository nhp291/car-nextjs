import { notFound } from 'next/navigation';
import Link from 'next/link';
import { IcArrowRight } from '@/app/public/icons/IcArrowRight';
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
        content: `VinFast VF9 là mẫu SUV điện 7 chỗ ngồi đầu tiên của Việt Nam được thiết kế đặc biệt cho thị trường Mỹ. Xe được trang bị hệ thống AI thông minh, có khả năng tự lái cấp độ 3 và nhiều tính năng an toàn tiên tiến.

Đây là một bước tiến quan trọng của VinFast trong việc mở rộng thị trường quốc tế, đặc biệt là thị trường Mỹ - một trong những thị trường xe điện lớn nhất thế giới.

## Công nghệ AI đột phá

VF9 được trang bị hệ thống AI thông minh với khả năng:
- Tự lái cấp độ 3 (Level 3 Autonomous Driving)
- Nhận diện khuôn mặt và giọng nói
- Hệ thống cảnh báo va chạm thông minh
- Tối ưu hóa tuyến đường dựa trên AI

## Thiết kế hiện đại

Xe có thiết kế hiện đại với:
- Kích thước: 5,120mm x 2,000mm x 1,750mm
- Không gian nội thất rộng rãi cho 7 người
- Hệ thống đèn LED thông minh
- Cửa sổ trời toàn cảnh

## Hiệu suất ấn tượng

- Động cơ điện mạnh mẽ
- Tốc độ tối đa: 200 km/h
- Tầm hoạt động: 600 km (theo chuẩn EPA)
- Thời gian sạc nhanh: 10-80% trong 35 phút

VinFast VF9 không chỉ là một chiếc xe điện thông thường mà còn là biểu tượng của sự đổi mới và công nghệ tiên tiến của Việt Nam trên trường quốc tế.`,
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
        content: `Toyota Camry 2025 được trang bị động cơ hybrid thế hệ 5.0 với hiệu suất nhiên liệu được cải thiện đáng kể. Xe cũng được nâng cấp hệ thống an toàn và công nghệ thông tin giải trí.

## Động cơ hybrid thế hệ mới

Camry 2025 sử dụng động cơ hybrid thế hệ 5.0 với những cải tiến:
- Hiệu suất nhiên liệu tăng 20% so với thế hệ trước
- Công suất tổng hợp: 225 mã lực
- Mô-men xoắn: 221 Nm
- Hộp số e-CVT được tối ưu hóa

## Thiết kế mới

- Grille mới với thiết kế aggressive hơn
- Đèn LED matrix thông minh
- Cản trước và sau được thiết kế lại
- Bánh xe mới 18-inch

## Công nghệ an toàn

- Toyota Safety Sense 3.0
- Hệ thống cảnh báo va chạm trước
- Hỗ trợ giữ làn đường
- Phát hiện người đi bộ và xe đạp

## Nội thất cao cấp

- Màn hình cảm ứng 12.3-inch
- Hệ thống âm thanh JBL Premium
- Ghế da cao cấp với massage
- Không gian cabin rộng rãi hơn

Camry 2025 sẽ được bán tại Việt Nam vào quý 2 năm 2025 với giá dự kiến từ 1.2 tỷ đồng.`,
        author: 'Trần Thị B',
        publishDate: '2024-01-18',
        readTime: '4 phút',
        category: 'Sản phẩm mới',
        image: '/images/car.png',
        tags: ['Toyota', 'Camry', 'Hybrid', '2025'],
        likes: 189,
        views: 890,
        isLiked: true
    }
];

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const article = newsData.find(a => a.id === id);

    if (!article) return notFound();

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-16">
            <div className="max-w-4xl mx-auto px-4">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-blue-700 mb-8">
                    <Link href="/news" className="hover:text-blue-900">
                        Tin tức
                    </Link>
                    <IcArrowRight width="16px" height="16px" />
                    <span className="text-blue-900 font-medium">{article.title}</span>
                </nav>

                {/* Article Header */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                            {article.category}
                        </span>
                        <span className="text-blue-500 text-sm">{article.readTime}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-6">
                        {article.title}
                    </h1>

                    <p className="text-xl text-blue-700/80 mb-6 leading-relaxed">
                        {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4 text-sm text-blue-600">
                            <span>👤 {article.author}</span>
                            <span>📅 {new Date(article.publishDate).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-blue-600">
                            <span>👁️ {article.views}</span>
                            <span>❤️ {article.likes}</span>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, index) => (
                            <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Article Content */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8">
                    <div className="prose prose-lg max-w-none">
                        <div className="whitespace-pre-line text-blue-900 leading-relaxed">
                            {article.content}
                        </div>
                    </div>
                </div>

                {/* Related Articles */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
                    <h2 className="text-2xl font-bold text-indigo-900 mb-6">Bài viết liên quan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {newsData.filter(a => a.id !== article.id).slice(0, 2).map((relatedArticle) => (
                            <Link key={relatedArticle.id} href={`/news/${relatedArticle.id}`}>
                                <div className="p-4 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer">
                                    <h3 className="font-bold text-indigo-900 mb-2 line-clamp-2">
                                        {relatedArticle.title}
                                    </h3>
                                    <p className="text-blue-700/80 text-sm line-clamp-2">
                                        {relatedArticle.excerpt}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2 text-xs text-blue-600">
                                        <span>{relatedArticle.author}</span>
                                        <span>•</span>
                                        <span>{new Date(relatedArticle.publishDate).toLocaleDateString('vi-VN')}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
} 