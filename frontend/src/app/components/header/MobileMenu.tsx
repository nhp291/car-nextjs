'use client';

import Link from "next/link";
import { IcLogoHeader } from '@/app/public/icons/IcLogoHeader';
import { Button } from "../button";
import { SocialLinks } from "./SocialLinks";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navigationItems: Array<{ href: string; label: string }>;
    menuRef: React.RefObject<HTMLDivElement | null>;
}

export const MobileMenu = ({ isOpen, onClose, navigationItems, menuRef }: MobileMenuProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/30 backdrop-blur-sm">
            <div
                ref={menuRef}
                className="fixed right-0 top-0 h-full w-[90vw] max-w-xs bg-white rounded-l-3xl shadow-2xl flex flex-col animate-slide-in-right"
                style={{ willChange: 'transform, opacity' }}
            >
                <div className="flex items-center justify-between px-6 py-5 border-b border-blue-100">
                    <IcLogoHeader width="110px" height="28px" />
                    <button onClick={onClose} className="text-4xl text-blue-700 font-bold focus:outline-none">
                        ×
                    </button>
                </div>
                <ul className="flex flex-col gap-2 px-4 py-6 flex-1">
                    {navigationItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className="block py-4 px-4 rounded-xl text-lg font-semibold text-indigo-900 hover:bg-blue-50 transition-colors"
                                onClick={onClose}
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
                <SocialLinks isMobile={true} />
            </div>
        </div>
    );
};
