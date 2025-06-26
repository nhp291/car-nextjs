import { Button } from '../components';
import { IcCarLogo } from '../public/icons/IcCarLogo';
import { IcHeartFilled } from '../public/icons/IcHeartFilled';

const favoriteCars = [
    {
        name: 'Toyota Camry',
        desc: 'Sedan cao cấp, tiết kiệm nhiên liệu, nội thất sang trọng.',
        icon: <IcCarLogo width="40px" height="40px" />,
        badge: 'Mới',
    },
    {
        name: 'Mazda CX-5',
        desc: 'SUV thể thao, thiết kế trẻ trung, vận hành êm ái.',
        icon: <IcCarLogo width="40px" height="40px" />,
        badge: 'Best Seller',
    },
];

export default function Favorites() {
    return (
        <main className="max-w-4xl mx-auto py-16 px-4">
            <h1 className="text-4xl font-extrabold text-indigo-900 mb-6">Xe bạn yêu thích</h1>
            {favoriteCars.length === 0 ? (
                <div className="text-blue-800 text-lg">Bạn chưa có xe nào trong danh sách yêu thích.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {favoriteCars.map((car, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-transform duration-200 cursor-pointer group relative">
                            <div className="absolute top-4 right-4">
                                <IcHeartFilled width="28px" height="28px" />
                            </div>
                            <div className="mb-2">{car.icon}</div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg font-bold text-indigo-900">{car.name}</span>
                                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">{car.badge}</span>
                            </div>
                            <div className="text-blue-700/80 text-sm mb-3 text-center min-h-[40px]">{car.desc}</div>
                            <Button color="primary" width="120px" height="38px" className="mt-2">Xem chi tiết</Button>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
} 