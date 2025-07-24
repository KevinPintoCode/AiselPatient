'use client'

import { useGetPatientsQuery } from '@/store/patientsApi'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AddPatientModal from '@/components/patients/addPatientModal'
import PatientsHeader from '@/components/patients/PatientsHeader'
import PatientsTable from '@/components/patients/PatientsTable'
import Pagination from '@/components/common/Pagination'
import PageWrapper from '@/components/common/PageWrapper'
import EditPatientModal from '@/components/patients/EditPatientModal'
import { useDeletePatientMutation } from '@/store/patientsApi'
import { Patient } from '@/types'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const PAGE_SIZE = 5

export default function PatientsPage() {
    const { data: patients, isLoading, error } = useGetPatientsQuery()
    const role = useSelector((state: RootState) => state.auth.role)
    const token = useSelector((state: RootState) => state.auth.token)
    const router = useRouter()

    const [page, setPage] = useState(1)
    const [editPatient, setEditPatient] = useState<Patient | null>(null)
    const [confirmId, setConfirmId] = useState<number | null>(null)
    const [deletePatient] = useDeletePatientMutation()

    useEffect(() => {
        if (!token) router.push('/')
    }, [token, router])

    // Adjust page number when total items changes
    useEffect(() => {
        if (!patients) return;
        const maxPage = Math.max(1, Math.ceil(patients.length / PAGE_SIZE));
        if (page > maxPage) {
            setPage(maxPage);
        }
    }, [patients?.length, page]); // Only depend on the length

    if (isLoading) return <p className="p-4 text-center">Loading patients...</p>
    if (error) return <p className="p-4 text-center text-red-500">Error loading patients.</p>

    const total = patients?.length ?? 0
    const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))
    // Ensure page is within bounds
    const currentPage = Math.max(1, Math.min(page, pageCount))
    const start = (currentPage - 1) * PAGE_SIZE
    const end = start + PAGE_SIZE
    const visible = patients?.slice(start, end) ?? []

    const handleEdit = (id: number) => {
        const p = patients?.find((pat) => pat.id === id) || null;
        setEditPatient(p);
    }

    const requestDelete = (id: number) => setConfirmId(id);

    const confirmDelete = async () => {
        if (confirmId === null) return;
        try {
            await deletePatient(confirmId).unwrap();
            const remainingPatients = patients?.filter(p => p.id !== confirmId) ?? [];
            const newMaxPage = Math.max(1, Math.ceil(remainingPatients.length / PAGE_SIZE));
            if (page > newMaxPage) {
                setPage(newMaxPage);
            }
            toast.success('🎉 Patient removed – less paperwork for everyone!');
        } catch {
            toast.error('😢 Could not delete patient');
        } finally {
            setConfirmId(null);
        }
    }

    return (
        <PageWrapper >
            <div className="rounded-3xl p-[2px] w-full max-w-6xl shadow-xl">
                <div className="rounded-[inherit] bg-white p-4 sm:p-8 md:p-12 space-y-6 md:space-y-8">
                    {/* Header */}
                    <PatientsHeader
                        name={role === 'admin' ? 'Admin' : 'User'}
                        action={role === 'admin' && <AddPatientModal />}
                    />
                    <PatientsTable
                        patients={visible}
                        role={role ?? ''}
                        onEdit={handleEdit}
                        onDelete={requestDelete}
                    />

                    <Pagination
                        currentPage={page}
                        totalPages={pageCount}
                        onPageChange={setPage}
                    />
                </div>
            </div>
            {editPatient && (
                <EditPatientModal
                    patient={editPatient}
                    open={!!editPatient}
                    onClose={() => setEditPatient(null)}
                />
            )}
            <Dialog open={confirmId !== null} onOpenChange={(v) => !v && setConfirmId(null)}>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Delete patient?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-gray-600">They'll be gone from the list but hopefully still healthy! 🏃‍♂️💨</p>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="secondary" onClick={() => setConfirmId(null)}>Cancel</Button>
                        <Button className="!bg-red-600 text-white hover:!bg-red-700" onClick={confirmDelete}>Yes, delete</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </PageWrapper>
    )
}
