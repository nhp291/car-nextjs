'use client';

import Link from "next/link";
import { Button } from "../button";
import { IcMagnifying } from '@/components/icons/IcMagnifying';
import { IcHeartOutline } from '@/components/icons/IcHeartOutline';
import { headerConfig } from "./constants";

interface HeaderActionsProps {
    onSearchToggle: () => void;
    onMenuToggle: () => void;
    isMenuOpen: boolean;
}

export const HeaderActions = ({ onSearchToggle, onMenuToggle, isMenuOpen }: HeaderActionsProps) => {
    return (
        <div className="flex items-center gap-4">
            <button
                onClick={onSearchToggle}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                title="Tìm kiếm"
            >
                <IcMagnifying width="20px" height="20px" />
            </button>
            <Link
                href="/favorites"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors relative"
                title="Xe yêu thích"
            >
                <IcHeartOutline width="20px" height="20px" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {headerConfig.favoritesCount}
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
                onClick={onMenuToggle}
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
    );
};
