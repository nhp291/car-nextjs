import { useState } from 'react';
import { usersMock } from '../mock/users.mock';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (usersMock.find(u => u.email === email)) {
            setError('Email đã tồn tại!');
            return;
        }
        setError('');
        alert('Đăng ký thành công!');
        // Thêm user vào mock hoặc localStorage nếu muốn
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100">
            <form onSubmit={handleRegister} className="bg-white/80 backdrop-blur-lg border border-blue-100 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-6">
                <h1 className="text-3xl font-extrabold text-indigo-900 mb-2 text-center">Đăng ký</h1>
                <input type="text" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Họ tên" value={name} onChange={e => setName(e.target.value)} required />
                <input type="email" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} required />
                {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                <button type="submit" className="bg-blue-600 text-white font-bold rounded-full px-8 py-2 mt-2 hover:bg-blue-700 transition">Đăng ký</button>
            </form>
        </main>
    );
} 