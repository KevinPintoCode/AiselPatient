'use client';

import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    className?: string;
}

export default function PageWrapper({ children, className = '' }: Props) {
    return (
        <section className={`min-h-[calc(100vh-65px)] bg-[#211F54] flex justify-center sm:items-center items-start px-4 py-4${className}`}>
            {children}
        </section>
    );
} 