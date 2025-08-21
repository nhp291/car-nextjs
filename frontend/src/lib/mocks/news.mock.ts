export interface News {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    images?: string[];
    author: {
        id: string;
        name: string;
        avatar: string;
        bio?: string;
    };
    category: string;
    tags: string[];
    publishedAt: string;
    updatedAt: string;
    readTime: number; // minutes
    views: number;
    likes: number;
    comments: number;
    isFeatured: boolean;
    isPublished: boolean;
    seo: {
        title?: string;
        description?: string;
        keywords?: string[];
    };
}

export const news: News[] = [
    {
        id: 'vinfast-vf9-launch',
        slug: 'vinfast-vf9-launch',
        title: 'VinFast ra mắt mẫu xe điện mới VF9 - SUV điện cỡ lớn đầu tiên của Việt Nam',
        excerpt: 'VinFast vừa chính thức giới thiệu mẫu SUV điện VF9 với nhiều công nghệ hiện đại, phạm vi di chuyển lên đến 600km và thiết kế sang trọng.',
        content: `
      <p>VinFast VF9 là mẫu SUV điện cỡ lớn đầu tiên được phát triển bởi hãng xe Việt Nam, đánh dấu bước tiến quan trọng trong lộ trình chuyển đổi sang xe điện của VinFast.</p>
      
      <h3>Thông số kỹ thuật nổi bật</h3>
      <ul>
        <li>Động cơ điện kép với công suất tổng 402 mã lực</li>
        <li>Pin lithium-ion 92 kWh cho phạm vi di chuyển 600km</li>
        <li>Tốc độ tối đa 200 km/h</li>
        <li>Gia tốc 0-100 km/h trong 6.5 giây</li>
        <li>Sạc nhanh DC lên đến 150 kW</li>
      </ul>
      
      <h3>Thiết kế và nội thất</h3>
      <p>VF9 sở hữu thiết kế hiện đại với kích thước 5,120 x 2,000 x 1,756 mm, tạo không gian nội thất rộng rãi cho 7 hành khách. Nội thất được trang bị màn hình cảm ứng 15.6 inch, hệ thống âm thanh cao cấp và nhiều tính năng tiện nghi khác.</p>
      
      <h3>Công nghệ an toàn</h3>
      <p>VinFast VF9 được trang bị đầy đủ các tính năng an toàn tiên tiến bao gồm:</p>
      <ul>
        <li>Hệ thống hỗ trợ lái xe thông minh</li>
        <li>Cảm biến 360 độ</li>
        <li>Hệ thống phanh khẩn cấp tự động</li>
        <li>Giám sát điểm mù</li>
        <li>Hỗ trợ giữ làn đường</li>
      </ul>
      
      <p>VinFast VF9 dự kiến sẽ được bán ra thị trường vào cuối năm 2024 với giá khởi điểm từ 1.2 tỷ đồng.</p>
    `,
        image: '/images/car.png',
        images: [
            '/images/car.png',
            '/images/hero.png'
        ],
        author: {
            id: 'admin',
            name: 'Admin',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            bio: 'Chuyên gia phân tích xe hơi'
        },
        category: 'Tin tức',
        tags: ['VinFast', 'Xe điện', 'SUV', 'Việt Nam', '2024'],
        publishedAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        readTime: 8,
        views: 15420,
        likes: 892,
        comments: 156,
        isFeatured: true,
        isPublished: true,
        seo: {
            title: 'VinFast VF9 - SUV điện cỡ lớn đầu tiên của Việt Nam',
            description: 'VinFast ra mắt mẫu SUV điện VF9 với phạm vi di chuyển 600km, công suất 402 mã lực và nhiều công nghệ hiện đại.',
            keywords: ['VinFast', 'VF9', 'SUV điện', 'xe điện Việt Nam', '2024']
        }
    },
    {
        id: 'toyota-camry-2025-review',
        slug: 'toyota-camry-2025-review',
        title: 'Đánh giá Toyota Camry 2025: Nâng cấp toàn diện với thiết kế mới và công nghệ tiên tiến',
        excerpt: 'Toyota Camry 2025 mang đến những cải tiến đáng kể về thiết kế, hiệu suất và công nghệ, tiếp tục khẳng định vị thế sedan cao cấp hàng đầu.',
        content: `
      <p>Toyota Camry 2025 là thế hệ mới nhất của dòng sedan huyền thoại, được nâng cấp toàn diện từ thiết kế đến công nghệ để đáp ứng nhu cầu ngày càng cao của khách hàng.</p>
      
      <h3>Thiết kế mới</h3>
      <p>Camry 2025 sở hữu thiết kế hiện đại hơn với lưới tản nhiệt mới, đèn LED ma trận và đường nét thể thao. Kích thước tổng thể được tối ưu hóa để tăng không gian nội thất.</p>
      
      <h3>Động cơ và hiệu suất</h3>
      <ul>
        <li>Động cơ 2.5L Hybrid với công suất 218 mã lực</li>
        <li>Hộp số CVT thông minh</li>
        <li>Tiêu thụ nhiên liệu chỉ 4.1L/100km</li>
        <li>Gia tốc 0-100 km/h trong 7.5 giây</li>
      </ul>
      
      <h3>Công nghệ mới</h3>
      <p>Camry 2025 được trang bị Toyota Safety Sense 3.0 với các tính năng:</p>
      <ul>
        <li>Hỗ trợ giữ làn đường nâng cao</li>
        <li>Phát hiện người đi bộ và xe đạp</li>
        <li>Hỗ trợ đỗ xe tự động</li>
        <li>Kết nối smartphone không dây</li>
      </ul>
      
      <h3>Nội thất cao cấp</h3>
      <p>Nội thất Camry 2025 được thiết kế sang trọng với chất liệu cao cấp, màn hình cảm ứng 12.3 inch và hệ thống âm thanh JBL 9 loa.</p>
      
      <p>Với những cải tiến này, Toyota Camry 2025 tiếp tục là lựa chọn hàng đầu trong phân khúc sedan cao cấp.</p>
    `,
        image: '/images/hero.png',
        images: [
            '/images/hero.png',
            '/images/car.png'
        ],
        author: {
            id: 'nguyen-van-a',
            name: 'Nguyễn Văn A',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            bio: 'Chuyên gia đánh giá xe hơi'
        },
        category: 'Đánh giá',
        tags: ['Toyota', 'Camry', 'Sedan', '2025', 'Hybrid'],
        publishedAt: '2024-01-10T14:30:00Z',
        updatedAt: '2024-01-10T14:30:00Z',
        readTime: 12,
        views: 8920,
        likes: 456,
        comments: 89,
        isFeatured: true,
        isPublished: true,
        seo: {
            title: 'Đánh giá Toyota Camry 2025 - Nâng cấp toàn diện',
            description: 'Đánh giá chi tiết Toyota Camry 2025 với thiết kế mới, động cơ hybrid và công nghệ an toàn tiên tiến.',
            keywords: ['Toyota Camry', '2025', 'sedan', 'hybrid', 'đánh giá']
        }
    },
    {
        id: 'bmw-i7-electric-luxury',
        slug: 'bmw-i7-electric-luxury',
        title: 'BMW i7: Sedan điện sang trọng định nghĩa lại khái niệm xe hạng sang',
        excerpt: 'BMW i7 không chỉ là chiếc sedan điện mà còn là tuyên ngôn về tương lai của xe hạng sang, kết hợp hoàn hảo giữa công nghệ và xa xỉ.',
        content: `
      <p>BMW i7 đại diện cho tầm nhìn tương lai của BMW về xe hạng sang điện, kết hợp giữa hiệu suất vượt trội và sự sang trọng đỉnh cao.</p>
      
      <h3>Thiết kế độc đáo</h3>
      <p>BMW i7 sở hữu thiết kế độc đáo với đèn pha ma trận LED, lưới tản nhiệt khổng lồ và đường nét hiện đại. Kích thước 5,391 x 1,950 x 1,544 mm tạo không gian nội thất rộng rãi.</p>
      
      <h3>Hiệu suất ấn tượng</h3>
      <ul>
        <li>Động cơ điện kép với công suất 544 mã lực</li>
        <li>Mô-men xoắn 745 Nm</li>
        <li>Gia tốc 0-100 km/h trong 4.7 giây</li>
        <li>Tốc độ tối đa 240 km/h</li>
        <li>Pin 101.7 kWh cho phạm vi 625km</li>
      </ul>
      
      <h3>Nội thất xa xỉ</h3>
      <p>Nội thất BMW i7 được thiết kế như một phòng khách di động với:</p>
      <ul>
        <li>Màn hình cảm ứng 31.3 inch cho hàng ghế sau</li>
        <li>Hệ thống âm thanh Bowers & Wilkins 4D</li>
        <li>Ghế massage với 18 chế độ</li>
        <li>Hệ thống chiếu sáng ambient</li>
        <li>Kết nối 5G</li>
      </ul>
      
      <h3>Công nghệ tiên tiến</h3>
      <p>BMW i7 được trang bị iDrive 8.0 với trợ lý ảo, hệ thống lái tự động cấp độ 3 và nhiều tính năng an toàn tiên tiến.</p>
      
      <p>Với giá khởi điểm từ 6.5 tỷ đồng, BMW i7 định nghĩa lại khái niệm xe hạng sang điện.</p>
    `,
        image: '/images/car.png',
        images: [
            '/images/car.png',
            '/images/hero.png'
        ],
        author: {
            id: 'tran-thi-b',
            name: 'Trần Thị B',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            bio: 'Chuyên gia xe hạng sang'
        },
        category: 'Xe hạng sang',
        tags: ['BMW', 'i7', 'Xe điện', 'Hạng sang', 'Sedan'],
        publishedAt: '2024-01-08T09:15:00Z',
        updatedAt: '2024-01-08T09:15:00Z',
        readTime: 10,
        views: 12340,
        likes: 678,
        comments: 134,
        isFeatured: false,
        isPublished: true,
        seo: {
            title: 'BMW i7 - Sedan điện hạng sang tương lai',
            description: 'Khám phá BMW i7 - sedan điện hạng sang với công nghệ tiên tiến và nội thất xa xỉ.',
            keywords: ['BMW i7', 'xe điện', 'hạng sang', 'sedan', 'luxury']
        }
    }
];

// Helper functions
export const getNewsBySlug = (slug: string): News | undefined => {
    return news.find(article => article.slug === slug);
};

export const getNewsByCategory = (category: string): News[] => {
    return news.filter(article => article.category.toLowerCase() === category.toLowerCase());
};

export const getFeaturedNews = (): News[] => {
    return news.filter(article => article.isFeatured);
};

export const getLatestNews = (limit: number = 5): News[] => {
    return news
        .filter(article => article.isPublished)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, limit);
};

export const searchNews = (query: string): News[] => {
    const lowercaseQuery = query.toLowerCase();
    return news.filter(article =>
        article.title.toLowerCase().includes(lowercaseQuery) ||
        article.excerpt.toLowerCase().includes(lowercaseQuery) ||
        article.content.toLowerCase().includes(lowercaseQuery) ||
        article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
};

export const getPopularNews = (limit: number = 5): News[] => {
    return news
        .filter(article => article.isPublished)
        .sort((a, b) => b.views - a.views)
        .slice(0, limit);
};

export const getNewsByAuthor = (authorId: string): News[] => {
    return news.filter(article => article.author.id === authorId);
}; 