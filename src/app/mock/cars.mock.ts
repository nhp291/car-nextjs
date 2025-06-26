export type CarMock = {
    id: string;
    name: string;
    desc: string;
    image: string;
    badge: string;
    gas: string;
    tire: string;
    steering: string;
    liked: boolean;
    brand: string;
    type: string;
    price: number;
    rating: number;
    comments: { user: string; content: string; date: string; }[];
};

export const carsMock: CarMock[] = [
    {
        id: 'bugatti-chiron',
        name: 'Bugatti Chiron',
        desc: 'Siêu xe Bugatti Chiron, động cơ W16, tốc độ tối đa 420km/h, thiết kế đỉnh cao.',
        image: '/public/images/bugatti-1651718.png',
        badge: 'Supercar',
        gas: '22L/100km',
        tire: '20 inch',
        steering: 'Tự động',
        liked: false,
        brand: 'Bugatti',
        type: 'Supercar',
        price: 3000000,
        rating: 4.9,
        comments: [
            { user: 'Nguyễn Văn A', content: 'Xe quá đẹp, trải nghiệm tuyệt vời!', date: '2024-06-01' },
            { user: 'Trần Thị B', content: 'Đỉnh cao công nghệ!', date: '2024-06-02' },
        ],
    },
    {
        id: 'toyota-camry',
        name: 'Toyota Camry',
        desc: 'Sedan cao cấp, tiết kiệm nhiên liệu, nội thất sang trọng.',
        image: '/public/images/car.png',
        badge: 'Mới',
        gas: '5.8L/100km',
        tire: '18 inch',
        steering: 'Tự động',
        liked: true,
        brand: 'Toyota',
        type: 'Sedan',
        price: 1200000,
        rating: 4.7,
        comments: [
            { user: 'Lê Văn C', content: 'Rất tiết kiệm xăng!', date: '2024-06-03' },
        ],
    },
    // ... Thêm các xe khác tương tự ...
]; 