import { useState } from 'react';
import { carsMock, CarMock } from '../mock/cars.mock';

export default function AdminCars() {
    const [cars, setCars] = useState<CarMock[]>(carsMock);
    const [showForm, setShowForm] = useState(false);
    const [editCar, setEditCar] = useState<CarMock | null>(null);

    const handleDelete = (id: string) => {
        if (window.confirm('Bạn chắc chắn muốn xóa xe này?')) {
            setCars(cars.filter(c => c.id !== id));
        }
    };

    const handleEdit = (car: CarMock) => {
        setEditCar(car);
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditCar(null);
        setShowForm(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const newCar: CarMock = {
            id: formData.get('id') as string,
            name: formData.get('name') as string,
            desc: formData.get('desc') as string,
            image: formData.get('image') as string,
            badge: formData.get('badge') as string,
            gas: formData.get('gas') as string,
            tire: formData.get('tire') as string,
            steering: formData.get('steering') as string,
            liked: false,
            brand: formData.get('brand') as string,
            type: formData.get('type') as string,
            price: Number(formData.get('price')),
            rating: Number(formData.get('rating')),
            comments: [],
        };
        if (editCar) {
            setCars(cars.map(c => c.id === newCar.id ? newCar : c));
        } else {
            setCars([...cars, newCar]);
        }
        setShowForm(false);
        setEditCar(null);
    };

    return (
        <main className="max-w-5xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-extrabold text-indigo-900 mb-6">Quản lý xe (Admin)</h1>
            <button className="mb-4 bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700" onClick={handleAdd}>Thêm xe mới</button>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow-lg">
                    <thead>
                        <tr className="bg-blue-100 text-blue-900">
                            <th className="p-2">Tên xe</th>
                            <th className="p-2">Hãng</th>
                            <th className="p-2">Loại</th>
                            <th className="p-2">Giá</th>
                            <th className="p-2">Badge</th>
                            <th className="p-2">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map(car => (
                            <tr key={car.id} className="border-b hover:bg-blue-50">
                                <td className="p-2 font-semibold">{car.name}</td>
                                <td className="p-2">{car.brand}</td>
                                <td className="p-2">{car.type}</td>
                                <td className="p-2">{car.price.toLocaleString()} $</td>
                                <td className="p-2">{car.badge}</td>
                                <td className="p-2 flex gap-2">
                                    <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500" onClick={() => handleEdit(car)}>Sửa</button>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(car.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showForm && (
                <form onSubmit={handleSave} className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg flex flex-col gap-4 relative">
                        <button type="button" className="absolute top-2 right-2 text-xl" onClick={() => setShowForm(false)}>×</button>
                        <h2 className="text-2xl font-bold mb-2">{editCar ? 'Sửa xe' : 'Thêm xe mới'}</h2>
                        <input name="id" className="border rounded-lg px-4 py-2" placeholder="ID (slug)" defaultValue={editCar?.id || ''} required />
                        <input name="name" className="border rounded-lg px-4 py-2" placeholder="Tên xe" defaultValue={editCar?.name || ''} required />
                        <input name="desc" className="border rounded-lg px-4 py-2" placeholder="Mô tả" defaultValue={editCar?.desc || ''} required />
                        <input name="image" className="border rounded-lg px-4 py-2" placeholder="Đường dẫn ảnh" defaultValue={editCar?.image || ''} required />
                        <input name="badge" className="border rounded-lg px-4 py-2" placeholder="Badge" defaultValue={editCar?.badge || ''} required />
                        <input name="gas" className="border rounded-lg px-4 py-2" placeholder="Tiêu thụ nhiên liệu" defaultValue={editCar?.gas || ''} required />
                        <input name="tire" className="border rounded-lg px-4 py-2" placeholder="Lốp" defaultValue={editCar?.tire || ''} required />
                        <input name="steering" className="border rounded-lg px-4 py-2" placeholder="Vô lăng" defaultValue={editCar?.steering || ''} required />
                        <input name="brand" className="border rounded-lg px-4 py-2" placeholder="Hãng" defaultValue={editCar?.brand || ''} required />
                        <input name="type" className="border rounded-lg px-4 py-2" placeholder="Loại xe" defaultValue={editCar?.type || ''} required />
                        <input name="price" type="number" className="border rounded-lg px-4 py-2" placeholder="Giá" defaultValue={editCar?.price || ''} required />
                        <input name="rating" type="number" step="0.1" className="border rounded-lg px-4 py-2" placeholder="Đánh giá" defaultValue={editCar?.rating || ''} required />
                        <button type="submit" className="bg-blue-600 text-white font-bold rounded-full px-8 py-2 mt-2 hover:bg-blue-700 transition">Lưu</button>
                    </div>
                </form>
            )}
        </main>
    );
} 