export default function About() {
    return (
        <main className="max-w-3xl mx-auto py-16 px-4">
            <h1 className="text-4xl font-extrabold text-indigo-900 mb-4">Giới thiệu về Car Next.js</h1>
            <p className="text-lg text-blue-900/80 mb-6">Car Next.js là nền tảng tra cứu & trải nghiệm xe hiện đại, giúp bạn dễ dàng tìm kiếm, so sánh và khám phá các mẫu xe nổi bật trên thị trường.</p>
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-2">Sứ mệnh</h2>
                <p className="text-base text-blue-800/90">Mang đến trải nghiệm tra cứu xe nhanh chóng, minh bạch, cập nhật công nghệ mới nhất, giúp người dùng lựa chọn chiếc xe phù hợp nhất với nhu cầu.</p>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-2">Đội ngũ phát triển</h2>
                <ul className="list-disc pl-6 text-blue-900/90">
                    <li>Nguyễn Văn A - Frontend Developer</li>
                    <li>Trần Thị B - Backend Developer</li>
                    <li>Lê Văn C - UI/UX Designer</li>
                    <li>Và các cộng sự khác...</li>
                </ul>
            </section>
            <section>
                <h2 className="text-2xl font-bold text-blue-800 mb-2">Liên hệ hợp tác</h2>
                <p className="text-base text-blue-800/90">Email: <a href="mailto:support@car-nextjs.com" className="underline text-blue-600 hover:text-blue-800">support@car-nextjs.com</a></p>
            </section>
        </main>
    );
} 