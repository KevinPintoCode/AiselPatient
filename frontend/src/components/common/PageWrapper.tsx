'use client';

import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    className?: string;
}

export default function PageWrapper({ children, className = '' }: Props) {
    return (
        <section className={`h-[calc(100vh-64px)] bg-[#211F54] flex justify-center items-center px-4 ${className}`}>
            {children}
        </section>
    );
} 