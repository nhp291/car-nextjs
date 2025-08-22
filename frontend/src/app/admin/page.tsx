'use client';
import { useState, useEffect } from 'react';
import { Button, TextField } from '../components';
import { IcCarLogo } from '@/components/icons/IcCarLogo';
import { IcMagnifying } from '@/components/icons/IcMagnifying';

interface Car {
    id: string;
    name: string;
    brand: string;
    type: string;
    price: string;
    status: 'active' | 'inactive' | 'pending';
    views: number;
    likes: number;
    createdAt: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'moderator';
    status: 'active' | 'inactive';
    joinDate: string;
    lastLogin: string;
}

interface Stats {
    totalCars: number;
    totalUsers: number;
    totalViews: number;
    totalLikes: number;
    activeCars: number;
    newUsersThisMonth: number;
}

export default function Admin() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [cars, setCars] = useState<Car[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [stats, setStats] = useState<Stats>({
        totalCars: 0,
        totalUsers: 0,
        totalViews: 0,
        totalLikes: 0,
        activeCars: 0,
        newUsersThisMonth: 0
    });

    // Mock data
    useEffect(() => {
        const mockCars: Car[] = [
            {
                id: '1',
                name: 'Toyota Camry',
                brand: 'Toyota',
                type: 'Sedan',
                price: '1.2 tỷ',
                status: 'active',
                views: 1250,
                likes: 89,
                createdAt: '2024-01-15'
            },
            {
                id: '2',
                name: 'Honda CR-V',
                brand: 'Honda',
                type: 'SUV',
                price: '1.5 tỷ',
                status: 'active',
                views: 980,
                likes: 67,
                createdAt: '2024-01-10'
            },
            {
                id: '3',
                name: 'VinFast VF8',
                brand: 'VinFast',
                type: 'Electric SUV',
                price: '2.1 tỷ',
                status: 'pending',
                views: 2100,
                likes: 145,
                createdAt: '2024-01-20'
            },
            {
                id: '4',
                name: 'Mercedes C300',
                brand: 'Mercedes',
                type: 'Luxury Sedan',
                price: '3.2 tỷ',
                status: 'inactive',
                views: 750,
                likes: 32,
                createdAt: '2024-01-05'
            }
        ];

        const mockUsers: User[] = [
            {
                id: '1',
                name: 'Nguyễn Văn A',
                email: 'nguyenvana@email.com',
                role: 'admin',
                status: 'active',
                joinDate: '2023-12-01',
                lastLogin: '2024-01-20'
            },
            {
                id: '2',
                name: 'Trần Thị B',
                email: 'tranthib@email.com',
                role: 'moderator',
                status: 'active',
                joinDate: '2024-01-05',
                lastLogin: '2024-01-19'
            },
            {
                id: '3',
                name: 'Lê Văn C',
                email: 'levanc@email.com',
                role: 'user',
                status: 'active',
                joinDate: '2024-01-10',
                lastLogin: '2024-01-18'
            },
            {
                id: '4',
                name: 'Phạm Thị D',
                email: 'phamthid@email.com',
                role: 'user',
                status: 'inactive',
                joinDate: '2024-01-01',
                lastLogin: '2024-01-15'
            }
        ];

        setCars(mockCars);
        setUsers(mockUsers);

        // Calculate stats
        setStats({
            totalCars: mockCars.length,
            totalUsers: mockUsers.length,
            totalViews: mockCars.reduce((sum, car) => sum + car.views, 0),
            totalLikes: mockCars.reduce((sum, car) => sum + car.likes, 0),
            activeCars: mockCars.filter(car => car.status === 'active').length,
            newUsersThisMonth: mockUsers.filter(user => new Date(user.joinDate).getMonth() === new Date().getMonth()).length
        });
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-700';
            case 'inactive': return 'bg-red-100 text-red-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin': return 'bg-purple-100 text-purple-700';
            case 'moderator': return 'bg-blue-100 text-blue-700';
            case 'user': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-4">
                        Admin Dashboard
                    </h1>
                    <p className="text-xl text-blue-700/80 max-w-2xl mx-auto">
                        Quản lý hệ thống Car Next.js - Thống kê, quản lý xe và người dùng
                    </p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {[
                        { id: 'dashboard', name: 'Dashboard', icon: '📊' },
                        { id: 'cars', name: 'Quản lý xe', icon: '🚗' },
                        { id: 'users', name: 'Quản lý người dùng', icon: '👥' },
                        { id: 'analytics', name: 'Phân tích', icon: '📈' },
                        { id: 'settings', name: 'Cài đặt', icon: '⚙️' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                : 'bg-white/80 text-blue-700 hover:bg-blue-50 border border-blue-200'
                                }`}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl text-center">
                                <div className="text-3xl font-bold text-indigo-900 mb-2">{stats.totalCars}</div>
                                <div className="text-blue-700/80 text-sm">Tổng số xe</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl text-center">
                                <div className="text-3xl font-bold text-green-600 mb-2">{stats.activeCars}</div>
                                <div className="text-blue-700/80 text-sm">Xe đang hoạt động</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalUsers}</div>
                                <div className="text-blue-700/80 text-sm">Tổng người dùng</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-2">{stats.newUsersThisMonth}</div>
                                <div className="text-blue-700/80 text-sm">Người dùng mới</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl text-center">
                                <div className="text-3xl font-bold text-orange-600 mb-2">{stats.totalViews}</div>
                                <div className="text-blue-700/80 text-sm">Lượt xem</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl text-center">
                                <div className="text-3xl font-bold text-red-600 mb-2">{stats.totalLikes}</div>
                                <div className="text-blue-700/80 text-sm">Lượt thích</div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
                                <h3 className="text-xl font-bold text-indigo-900 mb-6">Xe mới thêm gần đây</h3>
                                <div className="space-y-4">
                                    {cars.slice(0, 5).map((car) => (
                                        <div key={car.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <IcCarLogo width="32px" height="32px" />
                                                <div>
                                                    <div className="font-semibold text-indigo-900">{car.name}</div>
                                                    <div className="text-sm text-blue-700/80">{car.brand}</div>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(car.status)}`}>
                                                {car.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
                                <h3 className="text-xl font-bold text-indigo-900 mb-6">Người dùng mới</h3>
                                <div className="space-y-4">
                                    {users.slice(0, 5).map((user) => (
                                        <div key={user.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                                            <div>
                                                <div className="font-semibold text-indigo-900">{user.name}</div>
                                                <div className="text-sm text-blue-700/80">{user.email}</div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
                                                {user.role}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cars Management Tab */}
                {activeTab === 'cars' && (
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                            <h2 className="text-2xl font-bold text-indigo-900">Quản lý xe</h2>
                            <div className="flex gap-4">
                                <TextField
                                    width="300px"
                                    height="44px"
                                    color="primary"
                                    placeholder="Tìm kiếm xe..."
                                    startIcon={<IcMagnifying width="20px" height="20px" />}
                                />
                                <Button color="primary" width="150px" height="44px">
                                    + Thêm xe mới
                                </Button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                                        <th className="px-6 py-4 text-left font-bold">Xe</th>
                                        <th className="px-6 py-4 text-left font-bold">Hãng</th>
                                        <th className="px-6 py-4 text-left font-bold">Loại</th>
                                        <th className="px-6 py-4 text-left font-bold">Giá</th>
                                        <th className="px-6 py-4 text-left font-bold">Trạng thái</th>
                                        <th className="px-6 py-4 text-left font-bold">Lượt xem</th>
                                        <th className="px-6 py-4 text-left font-bold">Lượt thích</th>
                                        <th className="px-6 py-4 text-left font-bold">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cars.map((car) => (
                                        <tr key={car.id} className="border-b border-blue-100 hover:bg-blue-50/50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <IcCarLogo width="32px" height="32px" />
                                                    <span className="font-semibold text-indigo-900">{car.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-blue-700">{car.brand}</td>
                                            <td className="px-6 py-4 text-blue-700">{car.type}</td>
                                            <td className="px-6 py-4 font-semibold text-green-600">{car.price}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(car.status)}`}>
                                                    {car.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-blue-700">{car.views.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-blue-700">{car.likes}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <Button color="secondary" width="80px" height="32px" className="text-xs">
                                                        Sửa
                                                    </Button>
                                                    <Button color="accent" width="80px" height="32px" className="text-xs">
                                                        Xóa
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Users Management Tab */}
                {activeTab === 'users' && (
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                            <h2 className="text-2xl font-bold text-indigo-900">Quản lý người dùng</h2>
                            <div className="flex gap-4">
                                <TextField
                                    width="300px"
                                    height="44px"
                                    color="primary"
                                    placeholder="Tìm kiếm người dùng..."
                                    startIcon={<IcMagnifying width="20px" height="20px" />}
                                />
                                <Button color="primary" width="150px" height="44px">
                                    + Thêm người dùng
                                </Button>
                            </div>
                        </div>

            <div className="overflow-x-auto">
                            <table className="w-full">
                    <thead>
                                    <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                                        <th className="px-6 py-4 text-left font-bold">Tên</th>
                                        <th className="px-6 py-4 text-left font-bold">Email</th>
                                        <th className="px-6 py-4 text-left font-bold">Vai trò</th>
                                        <th className="px-6 py-4 text-left font-bold">Trạng thái</th>
                                        <th className="px-6 py-4 text-left font-bold">Ngày tham gia</th>
                                        <th className="px-6 py-4 text-left font-bold">Đăng nhập cuối</th>
                                        <th className="px-6 py-4 text-left font-bold">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b border-blue-100 hover:bg-blue-50/50">
                                            <td className="px-6 py-4 font-semibold text-indigo-900">{user.name}</td>
                                            <td className="px-6 py-4 text-blue-700">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-blue-700">{new Date(user.joinDate).toLocaleDateString('vi-VN')}</td>
                                            <td className="px-6 py-4 text-blue-700">{new Date(user.lastLogin).toLocaleDateString('vi-VN')}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <Button color="secondary" width="80px" height="32px" className="text-xs">
                                                        Sửa
                                                    </Button>
                                                    <Button color="accent" width="80px" height="32px" className="text-xs">
                                                        Xóa
                                                    </Button>
                                                </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                    </div>
                )}

                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
                        <h2 className="text-2xl font-bold text-indigo-900 mb-6">Phân tích dữ liệu</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-blue-50 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-indigo-900 mb-4">Thống kê lượt xem</h3>
                                <div className="space-y-3">
                                    {cars.map((car) => (
                                        <div key={car.id} className="flex items-center justify-between">
                                            <span className="text-blue-700">{car.name}</span>
                                            <span className="font-semibold text-indigo-900">{car.views}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-green-50 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-indigo-900 mb-4">Thống kê lượt thích</h3>
                                <div className="space-y-3">
                                    {cars.map((car) => (
                                        <div key={car.id} className="flex items-center justify-between">
                                            <span className="text-green-700">{car.name}</span>
                                            <span className="font-semibold text-indigo-900">{car.likes}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
                        <h2 className="text-2xl font-bold text-indigo-900 mb-6">Cài đặt hệ thống</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-indigo-900">Cài đặt chung</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-blue-900 font-semibold mb-2">Tên website</label>
                                        <TextField
                                            width="100%"
                                            height="44px"
                                            color="primary"
                                            value="Car Next.js"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-blue-900 font-semibold mb-2">Email liên hệ</label>
                                        <TextField
                                            width="100%"
                                            height="44px"
                                            color="primary"
                                            value="admin@car-nextjs.com"
                                        />
                                    </div>
                                    <Button color="primary" width="150px" height="44px">
                                        Lưu cài đặt
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-indigo-900">Bảo mật</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                                        <span className="text-blue-900">Xác thực 2 yếu tố</span>
                                        <input type="checkbox" className="w-5 h-5" />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                                        <span className="text-blue-900">Ghi log hoạt động</span>
                                        <input type="checkbox" className="w-5 h-5" defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                                        <span className="text-blue-900">Backup tự động</span>
                                        <input type="checkbox" className="w-5 h-5" defaultChecked />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            )}
            </div>
        </main>
    );
} 