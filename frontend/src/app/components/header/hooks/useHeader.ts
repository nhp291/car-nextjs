'use client';

import { useState, useEffect, useRef } from "react";

export const useHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if ((isMenuOpen || isSearchOpen) && window.innerWidth < 768) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen, isSearchOpen]);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsMenuOpen(false);
            }
            if (isSearchOpen && searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsSearchOpen(false);
            }
        }
        if (isMenuOpen || isSearchOpen) {
            document.addEventListener('mousedown', handleClick);
        }
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isMenuOpen, isSearchOpen]);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape' && (isMenuOpen || isSearchOpen)) {
                if (isMenuOpen) setIsMenuOpen(false);
                if (isSearchOpen) setIsSearchOpen(false);
            }
        }
        
        if (isMenuOpen || isSearchOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isMenuOpen, isSearchOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
    const closeMenu = () => setIsMenuOpen(false);
    const closeSearch = () => setIsSearchOpen(false);

    return {
        isMenuOpen,
        isSearchOpen,
        toggleMenu,
        toggleSearch,
        closeMenu,
        closeSearch,
        menuRef,
        searchRef,
    };
};
