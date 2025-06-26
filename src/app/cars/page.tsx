import { Button, TextField } from '../components';
import { IcCarLogo } from '../public/icons/IcCarLogo';
import { IcGas } from '../public/icons/IcGas';
import { IcTire } from '../public/icons/IcTire';
import { IcSteeringWheel } from '../public/icons/IcSteeringWheel';
import { IcHeartOutline } from '../public/icons/IcHeartOutline';
import { IcHeartFilled } from '../public/icons/IcHeartFilled';

const cars = [
    {
        name: 'Toyota Camry',
        desc: 'Sedan cao cấp, tiết kiệm nhiên liệu, nội thất sang trọng.',
        icon: <IcCarLogo width="40px" height="40px" />,
        badge: 'Mới',
        gas: '5.8L/100km',
        tire: '18 inch',
        steering: 'Tự động',
        liked: true,
    },
    {
        name: 'Honda CR-V',
        desc: 'SUV đa dụng, mạnh mẽ, phù hợp gia đình.',
        icon: <IcCarLogo width="40px" height="40px" />,
        badge: 'Hot',
        gas: '6.2L/100km',
        tire: '19 inch',
        steering: 'Tự động',
        liked: false,
    },
    {
        name: 'VinFast VF8',
        desc: 'Xe điện thông minh, công nghệ Việt, bảo hành 10 năm.',
        icon: <IcCarLogo width="40px" height="40px" />,
        badge: 'Electric',
        gas: '0L/100km',
        tire: '20 inch',
        steering: 'Tự động',
        liked: false,
    },
    {
        name: 'Mazda CX-5',
        desc: 'SUV thể thao, thiết kế trẻ trung, vận hành êm ái.',
        icon: <IcCarLogo width="40px" height="40px" />,
        badge: 'Best Seller',
        gas: '6.5L/100km',
        tire: '19 inch',
        steering: 'Tự động',
        liked: true,
    },
    {
        name: 'Mercedes C300',
        desc: 'Xe sang Đức, động cơ mạnh mẽ, nội thất đỉnh cao.',
        icon: <IcCarLogo width="40px" height="40px" />,
        badge: 'Luxury',
        gas: '7.1L/100km',
        tire: '19 inch',
        steering: 'Tự động',
        liked: false,
    },
    {
        name: 'Kia Seltos',
        desc: 'SUV đô thị, giá tốt, nhiều công nghệ an toàn.',
        icon: <IcCarLogo width="40px" height="40px" />,
        badge: 'Value',
        gas: '6.0L/100km',
        tire: '17 inch',
        steering: 'Tự động',
        liked: false,
    },
];

export default function Cars() {
    return (
        <main className="max-w-6xl mx-auto py-16 px-4">
            <h1 className="text-4xl font-extrabold text-indigo-900 mb-6">Danh sách xe nổi bật</h1>
            <div className="flex flex-wrap gap-4 mb-8">
                <TextField color='accent' width='260px' height='44px' placeholder='Tìm kiếm theo tên xe...' startIcon={<IcCarLogo width="20px" height="20px" />} />
                <select className="border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-blue-900">
                    <option>Hãng xe</option>
                    <option>Toyota</option>
                    <option>Honda</option>
                    <option>VinFast</option>
                    <option>Mazda</option>
                    <option>Mercedes</option>
                    <option>Kia</option>
                </select>
                <select className="border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-blue-900">
                    <option>Loại xe</option>
                    <option>SUV</option>
                    <option>Sedan</option>
                    <option>Electric</option>
                </select>
                <Button width='120px' height='44px' color='accent'>Lọc</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {cars.map((car, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-transform duration-200 cursor-pointer group relative">
                        <div className="absolute top-4 right-4">
                            <button className="hover:scale-125 transition-transform">
                                {car.liked ? <IcHeartFilled width="28px" height="28px" /> : <IcHeartOutline width="28px" height="28px" />}
                            </button>
                        </div>
                        <div className="mb-2">{car.icon}</div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg font-bold text-indigo-900">{car.name}</span>
                            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">{car.badge}</span>
                        </div>
                        <div className="text-blue-700/80 text-sm mb-3 text-center min-h-[40px]">{car.desc}</div>
                        <div className="flex gap-4 text-xs text-blue-900/80 mb-4">
                            <span className="flex items-center gap-1"><IcGas width="18px" height="18px" /> {car.gas}</span>
                            <span className="flex items-center gap-1"><IcTire width="18px" height="18px" /> {car.tire}</span>
                            <span className="flex items-center gap-1"><IcSteeringWheel width="18px" height="18px" /> {car.steering}</span>
                        </div>
                        <Button color="primary" width="120px" height="38px" className="mt-2">Xem chi tiết</Button>
                    </div>
                ))}
            </div>
            {/* Phân trang */}
            <div className="flex justify-center mt-10 gap-2">
                <Button width="40px" height="40px" color="secondary">1</Button>
                <Button width="40px" height="40px" color="secondary">2</Button>
                <Button width="40px" height="40px" color="secondary">3</Button>
                <Button width="40px" height="40px" color="secondary">...</Button>
            </div>
        </main>
    );
} 