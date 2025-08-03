'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { IcLogoHeader } from '@/app/public/icons/IcLogoHeader';
import { Button } from "./button";
import { IcFacebook } from '@/app/public/icons/IcFacebook';
import { IcTwitter } from '@/app/public/icons/IcTwitter';
import { IcLinkedin } from '@/app/public/icons/IcLinkedin';
import { IcDiscord } from '@/app/public/icons/IcDiscord';
import { IcGitHub } from '@/app/public/icons/IcGitHub';
import { IcMagnifying } from '@/app/public/icons/IcMagnifying';
import { IcHeartOutline } from '@/app/public/icons/IcHeartOutline';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    // Disable scroll when menu/search open (mobile only)
    useEffect(() => {
        if ((isMenuOpen || isSearchOpen) && window.innerWidth < 768) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen, isSearchOpen]);

    // Click outside to close menu/search (mobile only)
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (window.innerWidth >= 768) return;
            if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsMenuOpen(false);
            }
            if (isSearchOpen && searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsSearchOpen(false);
            }
        }
        if ((isMenuOpen || isSearchOpen) && window.innerWidth < 768) {
            document.addEventListener('mousedown', handleClick);
        }
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isMenuOpen, isSearchOpen]);

    const navigationItems = [
        { href: "/", label: "Trang chủ" },
        { href: "/cars", label: "Danh sách xe" },
        { href: "/compare", label: "So sánh xe" },
        { href: "/news", label: "Tin tức" },
        { href: "/favorites", label: "Yêu thích" },
        { href: "/about", label: "Giới thiệu" },
        { href: "/contact", label: "Liên hệ" },
    ];

    // Render mobile menu only when open
    const renderMobileMenu = () => (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/30 backdrop-blur-sm">
            <div
                ref={menuRef}
                className="fixed right-0 top-0 h-full w-[90vw] max-w-xs bg-white rounded-l-3xl shadow-2xl flex flex-col animate-slide-in-right"
                style={{ willChange: 'transform, opacity' }}
            >
                {/* Header menu */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-blue-100">
                    <IcLogoHeader width="110px" height="28px" />
                    <button onClick={() => setIsMenuOpen(false)} className="text-4xl text-blue-700 font-bold focus:outline-none">
                        ×
                    </button>
                </div>
                {/* Danh sách menu */}
                <ul className="flex flex-col gap-2 px-4 py-6 flex-1">
                    {navigationItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className="block py-4 px-4 rounded-xl text-lg font-semibold text-indigo-900 hover:bg-blue-50 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="px-4 pb-4 flex flex-col gap-3">
                    <Link href="/auth/login">
                        <Button color="secondary" width="100%" height="48px" className="text-base">
                            Đăng nhập
                        </Button>
                    </Link>
                    <Link href="/auth/register">
                        <Button color="accent" width="100%" height="48px" className="text-base">
                            Đăng ký
                        </Button>
                    </Link>
                </div>
                {/* Social media */}
                <div className="flex justify-center gap-5 pb-6">
                    <a href="#" title="Facebook" className="hover:scale-110 transition-transform"><IcFacebook width="28px" height="28px" /></a>
                    <a href="#" title="Twitter" className="hover:scale-110 transition-transform"><IcTwitter width="28px" height="28px" /></a>
                    <a href="#" title="LinkedIn" className="hover:scale-110 transition-transform"><IcLinkedin width="28px" height="28px" /></a>
                    <a href="#" title="Discord" className="hover:scale-110 transition-transform"><IcDiscord width="28px" height="28px" /></a>
                    <a href="#" title="GitHub" className="hover:scale-110 transition-transform"><IcGitHub width="28px" height="28px" /></a>
                </div>
            </div>
        </div>
    );

    // Render mobile search only when open
    const renderMobileSearch = () => (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 backdrop-blur-sm animate-fade-in md:hidden"
            ref={searchRef}
            style={{ willChange: 'transform, opacity' }}
        >
            <div className="bg-white/95 rounded-2xl shadow-2xl border-t border-blue-200 py-8 px-8 mt-28 w-full max-w-lg mx-2 animate-slide-in-up relative"
                style={{ willChange: 'transform, opacity' }}
            >
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm xe, hãng xe, loại xe..."
                        className="w-full px-6 py-5 pl-16 rounded-2xl border border-blue-200 focus:ring-2 focus:ring-blue-400 outline-none text-xl"
                        autoFocus
                    />
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500">
                        <IcMagnifying width="28px" height="28px" />
                    </span>
                    <button
                        onClick={() => setIsSearchOpen(false)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 text-3xl"
                        aria-label="Đóng tìm kiếm"
                        style={{ fontWeight: 700 }}
                    >
                        ×
                    </button>
                </div>
            </div>
        </div>
    );

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
                        <IcMagnifying width="20px" height="20px" />
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
            {/* Search Bar - Overlay (Mobile only) */}
            {isSearchOpen && renderMobileSearch()}
            {/* Mobile Menu - Overlay (Mobile only) */}
            {isMenuOpen && renderMobileMenu()}
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
