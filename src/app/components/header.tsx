'use client';

import { IcLogoHeader } from "../public/icons/IcLogoHeader";
import { Button } from "./button";
import { IcFacebook } from "../public/icons/IcFacebook";
import { IcTwitter } from "../public/icons/IcTwitter";
import { IcLinkedin } from "../public/icons/IcLinkedin";
import { IcDiscord } from "../public/icons/IcDiscord";
import { IcGitHub } from "../public/icons/IcGitHub";

export const Header = () => {
    return (
        <header className="bg-gradient-to-r from-indigo-900 via-blue-800 to-blue-600 shadow-xl border-b-2 border-blue-200 sticky top-0 z-50">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-6 px-4 md:px-10 gap-2 md:gap-0">
                <a href="/" className="flex items-center gap-3 group">
                    <IcLogoHeader width="160px" height="38px" color="#3b3c98" textColor="#ffffff" />
                </a>
                <nav className="flex-1 flex justify-center mt-2 md:mt-0">
                    <ul className="flex gap-8 text-white font-semibold text-lg">
                        <li><a href="/" className="hover:text-blue-300 transition-colors duration-200">Trang chủ</a></li>
                        <li><a href="/about" className="hover:text-blue-300 transition-colors duration-200">Giới thiệu</a></li>
                        <li><a href="/contact" className="hover:text-blue-300 transition-colors duration-200">Liên hệ</a></li>
                        <li><a href="#catalogue" className="hover:text-blue-300 transition-colors duration-200">Catalogue</a></li>
                    </ul>
                </nav>
                <div className="flex flex-col items-end gap-2">
                    <Button color="accent" width="130px" height="44px" loading={false} disabled={false} onClick={() => alert('Sign Up Clicked')}>
                        Đăng nhập
                    </Button>
                    <div className="flex gap-2 mt-1">
                        <a href="#" title="Facebook" className="hover:scale-110 transition-transform"><IcFacebook width="28px" height="28px" /></a>
                        <a href="#" title="Twitter" className="hover:scale-110 transition-transform"><IcTwitter width="28px" height="28px" /></a>
                        <a href="#" title="LinkedIn" className="hover:scale-110 transition-transform"><IcLinkedin width="28px" height="28px" /></a>
                        <a href="#" title="Discord" className="hover:scale-110 transition-transform"><IcDiscord width="28px" height="28px" /></a>
                        <a href="#" title="GitHub" className="hover:scale-110 transition-transform"><IcGitHub width="28px" height="28px" /></a>
                    </div>
                </div>
            </div>
            <div className="w-full text-center text-blue-100 text-sm font-mono tracking-wide py-1 bg-blue-900/60 border-t border-blue-300">Nền tảng tra cứu & trải nghiệm xe hiện đại, công nghệ mới nhất 2024</div>
        </header>
    );
};
