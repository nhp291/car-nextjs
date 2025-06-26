import { newsMock } from '../mock/news.mock';

export default function News() {
    return (
        <main className="max-w-3xl mx-auto py-16 px-4">
            <h1 className="text-4xl font-extrabold text-indigo-900 mb-6">Tin tức & Bài viết</h1>
            <div className="flex flex-col gap-8">
                {newsMock.map((item, i) => (
                    <article key={item.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-blue-700 text-xs font-semibold bg-blue-100 px-2 py-1 rounded-full">{item.date}</span>
                            <span className="text-blue-900/80 text-xs">Tác giả: {item.author}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-indigo-900 mb-2">{item.title}</h2>
                        <p className="text-blue-800 text-base mb-2">{item.desc}</p>
                        <div className="flex gap-2 mb-2 flex-wrap">
                            {item.tags.map(tag => (
                                <span key={tag} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">#{tag}</span>
                            ))}
                        </div>
                        <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-lg mb-2" />
                        <a href={`/news/${item.id}`} className="inline-block mt-2 text-blue-600 font-semibold hover:underline">Đọc tiếp &rarr;</a>
                    </article>
                ))}
            </div>
        </main>
    );
} 