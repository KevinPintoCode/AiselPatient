'use client';
import { ReactNode } from 'react';

interface Props {
    name: string;
    subtitle?: string;
    action?: ReactNode;
}

export default function PatientsHeader({ name, subtitle, action }: Props) {
    return (
        <header className="space-y-1 mb-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-semibold">
                    Welcome, <span className="text-[#0D42A8]">{name}</span>
                </h1>
                {action}
            </div>
            <p className="text-sm text-muted-foreground max-w-md pb-6">
                {subtitle ?? 'Remember: an apple a day keeps the bugs away—unless the bug is in production!'}
            </p>
        </header>
    );
}
