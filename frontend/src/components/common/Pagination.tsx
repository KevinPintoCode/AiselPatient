'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
    // Ensure currentPage is within bounds
    const safePage = Math.max(1, Math.min(currentPage, Math.max(1, totalPages)));

    // Don't render if there's only one page or less
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-between items-center gap-4">
            <Button
                variant="secondary"
                size="icon"
                onClick={() => onPageChange(safePage - 1)}
                disabled={safePage <= 1}
                className="text-gray-500 hover:text-gray-700"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="text-sm text-gray-600">
                Page {safePage} of {totalPages}
            </span>

            <Button
                variant="secondary"
                size="icon"
                onClick={() => onPageChange(safePage + 1)}
                disabled={safePage >= totalPages}
                className="text-gray-500 hover:text-gray-700"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
