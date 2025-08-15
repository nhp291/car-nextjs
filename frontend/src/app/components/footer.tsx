import { IcFacebook } from '@/app/public/icons/IcFacebook';
import { IcLinkedin } from '@/app/public/icons/IcLinkedin';
import { IcDiscord } from '@/app/public/icons/IcDiscord';
import { IcGitHub } from '@/app/public/icons/IcGitHub';
import { IcLogoHeader } from '../public/icons/IcLogoHeader';

export const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-indigo-900 via-blue-800 to-blue-600 text-white shadow-inner border-t-2 border-blue-200">
            <div className="container mx-auto py-10 px-4 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
                <div className="text-left">
                    <div className="text-xl font-bold mb-2"><IcLogoHeader width="160px" height="38px" color="#3b3c98" textColor="#ffffff" /></div>
                    <div className="text-blue-100 text-sm mb-2">Nền tảng tra cứu & trải nghiệm xe hiện đại, công nghệ mới nhất 2025</div>
                    <div className="text-blue-200 text-xs">Liên hệ: <a href="mailto:support@car-nextjs.com" className="underline hover:text-blue-300">nguyenhoaiphongdev@gmail.com</a></div>
                </div>
                <nav>
                    <ul className="flex flex-wrap justify-center gap-8 text-white/90 text-base font-medium">
                        <li><a href="/privacy" className="hover:text-blue-300 transition-colors duration-200">Chính sách bảo mật</a></li>
                        <li><a href="/terms" className="hover:text-blue-300 transition-colors duration-200">Điều khoản sử dụng</a></li>
                        <li><a href="/about" className="hover:text-blue-300 transition-colors duration-200">Về chúng tôi</a></li>
                    </ul>
                </nav>
                <div className="flex gap-3 mt-2 md:mt-0">
                    <a href="https://www.facebook.com/nhp291" title="Facebook" className="hover:scale-110 transition-transform"><IcFacebook width="28px" height="28px" /></a>
                    <a href="https://www.linkedin.com/in/nguyen-hoai-phong" title="LinkedIn" className="hover:scale-110 transition-transform"><IcLinkedin width="28px" height="28px" /></a>
                    <a href="#" title="Discord" className="hover:scale-110 transition-transform"><IcDiscord width="28px" height="28px" /></a>
                    <a href="https://github.com/nhp291" title="GitHub" className="hover:scale-110 transition-transform"><IcGitHub width="28px" height="28px" /></a>
                </div>
            </div>
            <div className="w-full text-center text-blue-100 text-xs font-mono tracking-wide py-2 bg-blue-900/60 border-t border-blue-300">&copy; {new Date().getFullYear()} Car Next.js. All rights reserved.</div>
        </footer>
    );
};