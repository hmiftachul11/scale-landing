'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavbarProps {
  className?: string;
}

const Navbar = forwardRef<HTMLDivElement, NavbarProps>(({ className = '' }, ref) => {
  return (
    <div ref={ref} className={`flex items-center justify-between w-full ${className}`}>
      {/* Logo - Top Left */}
      <div className="flex items-center gap-3">
        <div className="relative w-8 h-8">
          <Image
            src="/images/logo/ScaleX.webp"
            alt="ScaleX Logo"
            width={32}
            height={32}
            className="w-full h-full object-contain"
          />
        </div>
        <span className="font-bold text-2xl md:text-xl text-white">
          ScaleX
        </span>
      </div>

      {/* Navigation Pill - Top Right */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg cursor-pointer px-2 py-2 border border-white/20">
        <div className="flex items-center space-x-1">
          <button className="px-4 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors rounded-lg cursor-pointer hover:bg-white/10">
            PLATFORM
          </button>
          <button className="px-4 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors rounded-lg cursor-pointer hover:bg-white/10">
            COMPANY
          </button>
          <button className="px-4 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors rounded-lg cursor-pointer hover:bg-white/10">
            NEWSROOM
          </button>
          <Link
            href="#"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg cursor-pointer transition-all"
          >
            WORK WITH US
          </Link>
        </div>
      </div>
    </div>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;