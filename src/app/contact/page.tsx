export default function Contact() {
    return (
        <main className="max-w-3xl mx-auto py-16 px-4">
            <h1 className="text-4xl font-extrabold text-indigo-900 mb-4">Liên hệ với Car Next.js</h1>
            <p className="text-lg text-blue-900/80 mb-8">Bạn có câu hỏi, góp ý hoặc muốn hợp tác? Hãy gửi thông tin cho chúng tôi!</p>
            <form className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 mb-8">
                <div>
                    <label className="block text-blue-900 font-semibold mb-1">Họ và tên</label>
                    <input type="text" className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Nhập họ tên..." required />
                </div>
                <div>
                    <label className="block text-blue-900 font-semibold mb-1">Email</label>
                    <input type="email" className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Nhập email..." required />
                </div>
                <div>
                    <label className="block text-blue-900 font-semibold mb-1">Nội dung</label>
                    <textarea className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none" rows={4} placeholder="Nhập nội dung..." required />
                </div>
                <button type="submit" className="bg-blue-600 text-white font-bold rounded-full px-8 py-2 mt-2 hover:bg-blue-700 transition">Gửi liên hệ</button>
            </form>
            <div className="mb-4">
                <h2 className="text-xl font-bold text-blue-800 mb-2">Thông tin liên hệ</h2>
                <p className="text-blue-900/90">Email: <a href="mailto:support@car-nextjs.com" className="underline text-blue-600 hover:text-blue-800">support@car-nextjs.com</a></p>
                <p className="text-blue-900/90">Địa chỉ: 123 Đường Số 1, Quận 1, TP.HCM</p>
                <p className="text-blue-900/90">Điện thoại: 0123 456 789</p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg border border-blue-100">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.502234833635!2d106.7004233153342!3d10.776374292322073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c1b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2zMTIzIMSQxrDhu51uZyBTxqFuLCBRdeG6rW4gMSwgUFAuIEjDoCBDaMOtbmgsIFRow6BuaCBwaOG7kSBjaMOtbmg!5e0!3m2!1svi!2s!4v1680000000000!5m2!1svi!2s"
                    width="100%" height="300" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Map"></iframe>
            </div>
        </main>
    );
} 