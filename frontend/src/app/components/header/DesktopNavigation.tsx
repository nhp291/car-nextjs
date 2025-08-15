'use client';

import Link from "next/link";

interface DesktopNavigationProps {
    navigationItems: Array<{ href: string; label: string }>;
}

export const DesktopNavigation = ({ navigationItems }: DesktopNavigationProps) => {
    return (
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
    );
};
