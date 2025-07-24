'use client';

import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Helper function to generate random pastel colors
function getRandomPastelColor() {
    const colors = [
        'bg-[#98FB98]', // pastel green
        'bg-[#87CEEB]', // sky blue
        'bg-[#DDA0DD]', // plum
        'bg-[#FFB6C1]', // light pink
        'bg-[#F0E68C]', // khaki
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Helper function to get initials
function getInitials(name: string) {
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase();
}

interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dob: string;
}

interface Props {
    patients: Patient[];
    role: string;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function PatientsTable({ patients, role, onEdit, onDelete }: Props) {
    // Create empty rows to maintain consistent height (5 rows total)
    const emptyRows = Array(5 - patients.length).fill(null);

    const renderMobileCard = (patient: Patient) => (
        <div key={patient.id} className="sm:hidden border rounded-lg p-4 bg-white shadow flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${getRandomPastelColor()}`}>{getInitials(`${patient.firstName} ${patient.lastName}`)}</div>
                <div>
                    <p className="font-medium leading-none">{patient.firstName} {patient.lastName}</p>
                    <p className="text-xs text-gray-500">{new Date(patient.dob).toLocaleDateString()}</p>
                </div>
            </div>
            <div className="text-sm text-gray-600">
                <p>{patient.email}</p>
                <p>{patient.phoneNumber}</p>
            </div>
            {role === 'admin' && (
                <div className="flex gap-2 pt-2 self-end">
                    <Button variant="secondary" size="sm" onClick={() => onEdit(patient.id)}>Edit</Button>
                    <Button size="sm" className="!bg-red-600 text-white hover:!bg-red-700" onClick={() => onDelete(patient.id)}>Delete</Button>
                </div>
            )}
        </div>
    )

    return (
        <>
            {/* Mobile cards */}
            <div className="flex flex-col gap-3 sm:hidden w-full">
                {patients.map(renderMobileCard)}
            </div>
            {/* Desktop table */}
            <div className="w-full overflow-x-auto hidden sm:block">
                <table className="min-w-[640px] w-full bg-white border border-gray-100 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden text-sm">
                    <thead>
                        <tr className="text-left text-sm font-medium text-gray-500 border-b border-gray-100">
                            <th className="pb-4 px-6 pt-4">Patient</th>
                            <th className="pb-4 px-6 pt-4">Date of Birth</th>
                            <th className="pb-4 px-6 pt-4">Contact</th>
                            <th className="pb-4 px-6 pt-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient, index) => (
                            <tr
                                key={patient.id}
                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#E0E0E0]/30'} ${index !== patients.length - 1 && 'border-b border-gray-50'}`}
                            >
                                <td className="py-4 px-6 flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${getRandomPastelColor()}`}>
                                        {getInitials(`${patient.firstName} ${patient.lastName}`)}
                                    </div>
                                    <span className="font-medium">{`${patient.firstName} ${patient.lastName}`}</span>
                                </td>
                                <td className="py-4 px-6">{new Date(patient.dob).toLocaleDateString()}</td>
                                <td className="py-4 px-6">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-600">{patient.email}</span>
                                        <span className="text-sm text-gray-500">{patient.phoneNumber}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-right space-x-2">
                                    {role === 'admin' && (
                                        <>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => onEdit(patient.id)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="!bg-red-600 text-white hover:!bg-red-700"
                                                onClick={() => onDelete(patient.id)}
                                            >
                                                Delete
                                            </Button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {/* Empty rows to maintain height */}
                        {emptyRows.map((_, index) => (
                            <tr
                                key={`empty-${index}`}
                                className={`${(patients.length + index) % 2 === 0 ? 'bg-white' : 'bg-[#E0E0E0]/30'}`}
                            >
                                <td className="py-4 px-6 h-[72px]">&nbsp;</td>
                                <td className="py-4 px-6">&nbsp;</td>
                                <td className="py-4 px-6">&nbsp;</td>
                                <td className="py-4 px-6">&nbsp;</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
} 