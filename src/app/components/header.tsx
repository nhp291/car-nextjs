'use client';

import { IcLogoHeader } from '@/app/public/icons/IcLogoHeader';
import { Button } from "./button";
import { IcFacebook } from '@/app/public/icons/IcFacebook';
import { IcTwitter } from '@/app/public/icons/IcTwitter';
import { IcLinkedin } from '@/app/public/icons/IcLinkedin';
import { IcDiscord } from '@/app/public/icons/IcDiscord';
import { IcGitHub } from '@/app/public/icons/IcGitHub';
import { IcMagnifying } from '@/app/public/icons/IcMagnifying';
import { IcHeartOutline } from '@/app/public/icons/IcHeartOutline';
import { useState } from "react";
import Link from "next/link";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const navigationItems = [
        { href: "/", label: "Trang chủ" },
        { href: "/cars", label: "Danh sách xe" },
        { href: "/compare", label: "So sánh xe" },
        { href: "/news", label: "Tin tức" },
        { href: "/favorites", label: "Yêu thích" },
        { href: "/about", label: "Giới thiệu" },
        { href: "/contact", label: "Liên hệ" },
    ];

    return (
        <header className="bg-gradient-to-r from-indigo-900 via-blue-800 to-blue-600 shadow-xl border-b-2 border-blue-200 sticky top-0 z-50">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-4 md:px-10 gap-4 md:gap-0">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <IcLogoHeader width="160px" height="38px" color="#3b3c98" textColor="#ffffff" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex flex-1 justify-center">
                    <ul className="flex gap-6 text-white font-semibold text-lg">
                        {navigationItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="hover:text-blue-300 transition-colors duration-200 relative group"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    {/* Search Button */}
                    <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                        title="Tìm kiếm"
                    >
                        <IcMagnifying
                            width="20px"
                            height="20px"
                        />
                    </button>

                    {/* Favorites Button */}
                    <Link
                        href="/favorites"
                        className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors relative"
                        title="Xe yêu thích"
                    >
                        <IcHeartOutline width="20px" height="20px" />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            3
                        </span>
                    </Link>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex gap-3">
                        <Link href="/auth/login">
                            <Button color="secondary" width="100px" height="40px" className="text-sm">
                                Đăng nhập
                            </Button>
                        </Link>
                        <Link href="/auth/register">
                            <Button color="accent" width="100px" height="40px" className="text-sm">
                                Đăng ký
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            {isSearchOpen && (
                <div className="bg-white/95 backdrop-blur-sm border-t border-blue-200 py-4 px-4 md:px-10">
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm xe, hãng xe, loại xe..."
                                className="w-full px-4 py-3 pl-12 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400 outline-none"
                                autoFocus
                            />
                            <IcMagnifying
                                width="20px"
                                height="20px"
                            />
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-blue-200">
                    <nav className="py-4 px-4">
                        <ul className="space-y-3">
                            {navigationItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="block text-indigo-900 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-blue-200 space-y-3">
                            <Link href="/auth/login">
                                <Button color="secondary" width="100%" height="40px" className="text-sm">
                        Đăng nhập
                    </Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button color="accent" width="100%" height="40px" className="text-sm">
                                    Đăng ký
                                </Button>
                            </Link>
                        </div>
                    </nav>
                </div>
            )}

            {/* Social Links */}
            <div className="w-full text-center text-blue-100 text-sm font-mono tracking-wide py-2 bg-blue-900/60 border-t border-blue-300">
                <div className="flex items-center justify-center gap-4">
                    <span>Nền tảng tra cứu & trải nghiệm xe hiện đại, công nghệ mới nhất 2024</span>
                    <div className="hidden md:flex gap-2">
                        <a href="#" title="Facebook" className="hover:scale-110 transition-transform">
                            <IcFacebook width="16px" height="16px" />
                        </a>
                        <a href="#" title="Twitter" className="hover:scale-110 transition-transform">
                            <IcTwitter width="16px" height="16px" />
                        </a>
                        <a href="#" title="LinkedIn" className="hover:scale-110 transition-transform">
                            <IcLinkedin width="16px" height="16px" />
                        </a>
                        <a href="#" title="Discord" className="hover:scale-110 transition-transform">
                            <IcDiscord width="16px" height="16px" />
                        </a>
                        <a href="#" title="GitHub" className="hover:scale-110 transition-transform">
                            <IcGitHub width="16px" height="16px" />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};
