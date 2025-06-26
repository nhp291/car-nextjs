import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../../components';
import { IcCarLogo } from '../../public/icons/IcCarLogo';
import { IcGas } from '../../public/icons/IcGas';
import { IcTire } from '../../public/icons/IcTire';
import { IcSteeringWheel } from '../../public/icons/IcSteeringWheel';
import { IcHeartOutline } from '../../public/icons/IcHeartOutline';
import { IcHeartFilled } from '../../public/icons/IcHeartFilled';
import type { CarMock } from '../../mock/cars.mock';

export default function CarDetail({ car }: { car: CarMock }) {
    const [comments, setComments] = useState(car.comments);
    const [user, setUser] = useState('');
    const [content, setContent] = useState('');

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user.trim() || !content.trim()) return;
        setComments([
            { user, content, date: new Date().toISOString().slice(0, 10) },
            ...comments,
        ]);
        setUser('');
        setContent('');
    };

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <Button color="secondary" width="110px" height="38px" className="mb-6" onClick={() => window.history.back()}>
                ← Quay lại
            </Button>
            <div className="bg-white/80 backdrop-blur-lg border border-blue-100 rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 flex flex-col items-center">
                    <div className="mb-4 w-full flex justify-center">
                        <Image src={car.image} alt={car.name} width={360} height={220} className="rounded-xl shadow-lg object-cover" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-bold text-indigo-900">{car.name}</span>
                        <span className="bg-gradient-to-r from-blue-200 to-indigo-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow-md animate-pulse">{car.badge}</span>
                    </div>
                    <div className="flex gap-2 mb-3">
                        <IcCarLogo width="32px" height="32px" />
                        <Button color="secondary" width="38px" height="38px" className="rounded-full p-0">
                            {car.liked ? <IcHeartFilled width="24px" height="24px" /> : <IcHeartOutline width="24px" height="24px" />}
                        </Button>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    <div className="text-blue-700/90 text-base mb-2">{car.desc}</div>
                    <div className="flex gap-6 text-base text-blue-900/80 mb-4">
                        <span className="flex items-center gap-2"><IcGas width="22px" height="22px" /> {car.gas}</span>
                        <span className="flex items-center gap-2"><IcTire width="22px" height="22px" /> {car.tire}</span>
                        <span className="flex items-center gap-2"><IcSteeringWheel width="22px" height="22px" /> {car.steering}</span>
                    </div>
                    <Button color="primary" width="180px" height="44px" className="mt-2">Liên hệ tư vấn</Button>
                </div>
            </div>
            {/* Đánh giá & bình luận */}
            <div className="mt-10">
                <h2 className="text-xl font-bold text-indigo-900 mb-3">Đánh giá & Bình luận</h2>
                <form onSubmit={handleAddComment} className="flex flex-col md:flex-row gap-3 mb-6">
                    <input value={user} onChange={e => setUser(e.target.value)} className="border rounded-lg px-4 py-2 flex-1" placeholder="Tên của bạn" required />
                    <input value={content} onChange={e => setContent(e.target.value)} className="border rounded-lg px-4 py-2 flex-1" placeholder="Nội dung bình luận" required />
                    <Button color="accent" width="120px" height="44px" type="submit">Gửi</Button>
                </form>
                <div className="flex flex-col gap-4">
                    {comments.length === 0 && <div className="text-blue-700">Chưa có bình luận nào.</div>}
                    {comments.map((c, i) => (
                        <div key={i} className="bg-blue-50 rounded-lg p-4 shadow flex flex-col md:flex-row md:items-center gap-2">
                            <span className="font-bold text-blue-900">{c.user}</span>
                            <span className="text-xs text-blue-500">{c.date}</span>
                            <span className="text-blue-900/90">{c.content}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 