export type NewsMock = {
    id: string;
    title: string;
    desc: string;
    content: string;
    image: string;
    date: string;
    author: string;
    tags: string[];
};

export const newsMock: NewsMock[] = [
    {
        id: 'vinfast-vf9',
        title: 'VinFast ra mắt mẫu xe điện mới VF9',
        desc: 'VinFast vừa chính thức giới thiệu mẫu SUV điện VF9 với nhiều công nghệ hiện đại, phạm vi di chuyển lên đến 600km.',
        content: 'VinFast VF9 là mẫu SUV điện cỡ lớn, trang bị nhiều công nghệ thông minh, an toàn và tiện nghi...',
        image: '/public/images/car.png',
        date: '2024-06-01',
        author: 'Admin',
        tags: ['VinFast', 'Xe điện', 'SUV'],
    },
    {
        id: 'toyota-camry-2024',
        title: 'Toyota Camry 2024 có gì mới?',
        desc: 'Toyota Camry 2024 nâng cấp thiết kế, bổ sung nhiều tính năng an toàn và tiết kiệm nhiên liệu hơn.',
        content: 'Toyota Camry 2024 mang đến trải nghiệm lái mới, thiết kế trẻ trung, động cơ tiết kiệm...',
        image: '/public/images/car.png',
        date: '2024-05-20',
        author: 'Nguyễn Văn A',
        tags: ['Toyota', 'Sedan', '2024'],
    },
]; 