'use client';

import Link from "next/link";
import { IcLogoHeader } from '@/components/icons/IcLogoHeader';
import { 
    MobileMenu, 
    MobileSearch, 
    DesktopSearch,
    DesktopNavigation, 
    HeaderActions, 
    SocialLinks, 
    useHeader, 
    navigationItems, 
    headerConfig 
} from './header/index';

export const Header = () => {
    const { 
        isMenuOpen, 
        isSearchOpen, 
        toggleMenu, 
        toggleSearch, 
        closeMenu, 
        closeSearch,
        menuRef,
        searchRef
    } = useHeader();

    return (
        <header className="bg-gradient-to-r from-blue-600 via-blue-750 to-indigo-800 shadow-xl border-b-2 border-blue-200 sticky top-0 z-50">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-4 md:px-10 gap-4 md:gap-0">
                <Link href="/" className="flex items-center gap-3 group mt-2">
                    <IcLogoHeader width="160px" height="38px" color="#3b3c98" textColor="#ffffff" />
                </Link>
                
                <DesktopNavigation navigationItems={navigationItems} />
                
                <HeaderActions 
                    onSearchToggle={toggleSearch}
                    onMenuToggle={toggleMenu}
                    isMenuOpen={isMenuOpen}
                />
            </div>
            
            {/* Search Bar - Overlay (Mobile only) */}
            <MobileSearch 
                isOpen={isSearchOpen} 
                onClose={closeSearch} 
                searchRef={searchRef}
            />
            
            {/* Search Bar - Overlay (Desktop only) */}
            <DesktopSearch 
                isOpen={isSearchOpen} 
                onClose={closeSearch}
                searchRef={searchRef}
            />
            
            <MobileMenu 
                isOpen={isMenuOpen} 
                onClose={closeMenu} 
                navigationItems={navigationItems}
                menuRef={menuRef}
            />
            
            <div className="w-full text-center text-blue-100 text-sm font-mono tracking-wide py-2 bg-blue-900/60 border-t border-blue-300">
                <div className="flex items-center justify-center gap-4">
                    <span>{headerConfig.tagline}</span>
                    <SocialLinks />
                </div>
            </div>
        </header>
    );
};
