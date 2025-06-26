'use client';
import Image from 'next/image';
import logo from '../app/public/images/hero-bg.png';
import car from '../app/public/images/hero.png';
import { Button, TextField } from './components';
import { IcCarLogo } from './public/icons/IcCarLogo';
import { IcGas } from './public/icons/IcGas';
import { IcTire } from './public/icons/IcTire';
import { IcSteeringWheel } from './public/icons/IcSteeringWheel';
import { IcHeartOutline } from './public/icons/IcHeartOutline';
import { IcHeartFilled } from './public/icons/IcHeartFilled';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const carsData = [
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

function removeVietnameseTones(str: string) {
  return str.normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

const Car3DViewer = dynamic(() => import('./components/Car3DViewer'), { ssr: false });

export default function Home() {
  const [search, setSearch] = useState('');
  const cars = carsData.filter(car => {
    const name = removeVietnameseTones(car.name.toLowerCase());
    const keyword = removeVietnameseTones(search.toLowerCase());
    return name.includes(keyword);
  });

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 pb-10">
      {/* Hero section */}
      <div className="relative w-full flex flex-col md:flex-row items-center justify-center overflow-hidden gap-8 md:gap-0 py-10 md:py-20">
        <div className="flex-1 flex flex-col items-center justify-center z-10">
          <div className="backdrop-blur-xl bg-white/40 border border-blue-200 rounded-3xl shadow-2xl p-8 md:p-12 max-w-xl w-full flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 drop-shadow-lg mb-3 text-center">Welcome to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Car Next.js</span></h1>
            <p className="text-lg md:text-xl text-blue-900/80 font-medium mb-6 text-center">Nền tảng tra cứu & trải nghiệm xe hiện đại, công nghệ mới nhất 2024</p>
            <div className="flex flex-col md:flex-row gap-4 mt-2 justify-center w-full">
              <a
                className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 hover:scale-105 transition-transform shadow-lg font-bold text-lg text-center"
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                🚀 Deploy now
              </a>
              <a
                className="rounded-full border-2 border-blue-600 text-blue-700 px-8 py-3 hover:bg-blue-50 transition-colors shadow-lg font-bold text-lg text-center"
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                📚 Read our docs
              </a>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center z-10">
          <div className="w-full max-w-lg">
            <Car3DViewer />
          </div>
        </div>
        <Image
          src={logo}
          alt="Hero background"
          fill
          style={{ objectFit: 'cover', opacity: 0.18 }}
          priority
          className="absolute top-0 left-0 w-full h-full z-0"
        />
      </div>
      {/* Catalogue section */}
      <section id="catalogue" className="max-w-6xl mx-auto mt-16 px-4">
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-indigo-900 mb-1">Car Catalogue</div>
            <div className="text-blue-800/80 text-lg">Khám phá các mẫu xe nổi bật, phù hợp với bạn!</div>
          </div>
          <div className="flex flex-wrap gap-4">
            <TextField
              width='300px'
              height='44px'
              color='primary'
              label='Tìm kiếm xe'
              placeholder='Tìm kiếm theo tên xe...'
              value={search}
              onChange={setSearch}
              startIcon={<IcCarLogo width="20px" height="20px" />}
            />
            <Button width='150px' height='44px' color='accent'>
              <span className="flex items-center gap-2">Tìm kiếm</span>
            </Button>
          </div>
        </div>
        {/* Catalogue cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cars.map((car, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-lg border border-blue-100 rounded-2xl shadow-2xl p-7 flex flex-col items-center hover:scale-105 hover:shadow-3xl transition-transform duration-200 cursor-pointer group relative">
              <div className="absolute top-4 right-4">
                <button className="hover:scale-125 transition-transform">
                  {car.liked ? <IcHeartFilled width="28px" height="28px" /> : <IcHeartOutline width="28px" height="28px" />}
                </button>
              </div>
              <div className="mb-2 animate-bounce-slow group-hover:animate-none">{car.icon}</div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold text-indigo-900">{car.name}</span>
                <span className="bg-gradient-to-r from-blue-200 to-indigo-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow-md animate-pulse group-hover:animate-none">{car.badge}</span>
              </div>
              <div className="text-blue-700/80 text-sm mb-3 text-center min-h-[40px]">{car.desc}</div>
              <div className="flex gap-4 text-xs text-blue-900/80 mb-4">
                <span className="flex items-center gap-1"><IcGas width="18px" height="18px" /> {car.gas}</span>
                <span className="flex items-center gap-1"><IcTire width="18px" height="18px" /> {car.tire}</span>
                <span className="flex items-center gap-1"><IcSteeringWheel width="18px" height="18px" /> {car.steering}</span>
              </div>
              <Button color="primary" width="120px" height="38px" className="mt-2 hover:scale-105 transition-transform">Xem chi tiết</Button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
