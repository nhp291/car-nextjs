'use client';

import { IcFacebook } from '@/app/public/icons/IcFacebook';
import { IcLinkedin } from '@/app/public/icons/IcLinkedin';
import { IcDiscord } from '@/app/public/icons/IcDiscord';
import { IcGitHub } from '@/app/public/icons/IcGitHub';

interface SocialLinksProps {
    isMobile?: boolean;
}

export const SocialLinks = ({ isMobile = false }: SocialLinksProps) => {
    const iconSize = isMobile ? "28px" : "16px";
    const containerClass = isMobile 
        ? "flex justify-center gap-5 pb-6" 
        : "hidden md:flex gap-2";

    return (
        <div className={containerClass}>
            <a href="https://www.facebook.com/nhp291" title="Facebook" className="hover:scale-110 transition-transform">
                <IcFacebook width={iconSize} height={iconSize} />
            </a>
            <a href="https://www.linkedin.com/in/nguyen-hoai-phong" title="LinkedIn" className="hover:scale-110 transition-transform">
                <IcLinkedin width={iconSize} height={iconSize} />
            </a>
            <a href="#" title="Discord" className="hover:scale-110 transition-transform">
                <IcDiscord width={iconSize} height={iconSize} />
            </a>
            <a href="https://github.com/nhp291" title="GitHub" className="hover:scale-110 transition-transform">
                <IcGitHub width={iconSize} height={iconSize} />
            </a>
        </div>
    );
};
