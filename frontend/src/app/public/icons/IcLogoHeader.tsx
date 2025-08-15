'use client';

import { SizeImage } from "@/app/constants/types/HomeType";

interface LogoProps extends SizeImage {
  color?: string;
  textColor?: string;
}

export const IcLogoHeader = ({ width, height, color = "#3b3c98", textColor = "#ffffff", ...props }: LogoProps) => {
  return (
    <div style={{ width, height, ...props }}>
      <svg
        viewBox="0 0 230 34.5791630282359"
        version="1.1"
        id="svg17">
        <defs
          id="SvgjsDefs2381">
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 3.5 }} />
            <stop offset="100%" style={{ stopColor: "#6366f0", stopOpacity: 2.5 }} />
          </linearGradient>

          <filter id="shadow" x="-20%" y="-20%" width="150%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>

        <g
          id="SvgjsG2382"
          transform="matrix(2,0,0,2,0,-19)"
          fill="url(#logoGradient)"
          filter="url(#shadow)">
          <g
            transform="translate(-270 -140)"
            id="g11">
            <g
              id="g9">
              <path
                d="M279,161c-0.736,0-1.375,0.405-1.722,1c-0.172,0.295-0.278,0.635-0.278,1c0,1.102,0.897,2,2,2c1.103,0,2-0.898,2-2    c0-0.365-0.105-0.705-0.278-1C280.375,161.405,279.737,161,279,161z"
                id="path3" />
              <path
                d="M293,161c-0.736,0-1.375,0.405-1.722,1c-0.172,0.295-0.278,0.635-0.278,1c0,1.102,0.897,2,2,2c1.103,0,2-0.898,2-2    c0-0.365-0.105-0.705-0.278-1C294.375,161.405,293.737,161,293,161z"
                id="path5" />
              <path
                d="M299,159v-1l-6-1.715L286,152h-11v1h6v1h-11v1h12v1h-10v1h5v1h-2v1h-4v1h5v1h-1v1h-3v1h4c0-0.352,0.072-0.686,0.184-1    c0.414-1.162,1.512-2,2.816-2c1.305,0,2.402,0.838,2.816,2c0.111,0.314,0.184,0.648,0.184,1h8c0-0.352,0.072-0.686,0.184-1    c0.414-1.162,1.512-2,2.816-2c1.305,0,2.402,0.838,2.816,2c0.111,0.314,0.184,0.648,0.184,1h3v-1h1v-3H299z"
                id="path7" />
            </g>
          </g>
        </g>
        <g id="logo-text" filter="url(#shadow)">
          <text x="70" y="30" fontSize="30" fontWeight="bold" fontFamily="Arial, sans-serif" fill={textColor}>
            Next
          </text>
          <text x="130" y="30" fontSize="30" fontWeight="900" fontFamily="Arial, sans-serif" fill="url(#logoGradient)">
            Spark
          </text>
        </g>
      </svg>
    </div>
  );
};