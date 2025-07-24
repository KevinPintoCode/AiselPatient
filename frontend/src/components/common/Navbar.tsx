'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    if (pathname === '/') return null;

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Image src="/medical-symbol.png" alt="Logo" width={28} height={28} />
                    <span className="text-lg font-semibold">
                        Aisel<span className="text-[#0D42A8]">Case</span>
                    </span>
                </Link>

                <Link
                    href="https://www.kevincode.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#0D42A8] transition-colors"
                >
                    KevinCode
                </Link>
            </div>
        </nav>
    );
} 