'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-between items-center w-full">
            <Button
                variant="secondary"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-gray-500 hover:text-gray-700"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
                variant="secondary"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-gray-500 hover:text-gray-700"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
