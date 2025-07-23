'use client'

import { useGetPatientsQuery } from '@/store/patientsApi'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import AddPatientModal from '@/components/addPatientModal'

export default function PatientsPage() {
    const { data: patients, isLoading, error } = useGetPatientsQuery()
    const role = useSelector((state: RootState) => state.auth.role)
    const token = useSelector((state: RootState) => state.auth.token)
    const router = useRouter()

    useEffect(() => {
        if (!token) router.push('/login')
    }, [token])

    if (isLoading) return <p className="p-4 text-center">Loading patients...</p>
    if (error) return <p className="p-4 text-center text-red-500">Error loading patients.</p>

    return (

        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Patient List</h1>
                {role === 'admin' && (
                    <AddPatientModal />
                )}
            </div>

            <div className="overflow-auto rounded-lg shadow bg-white">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-4 font-medium">Avatar</th>
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Email</th>
                            <th className="p-4 font-medium">Phone</th>
                            <th className="p-4 font-medium">Date of Birth</th>
                            {role === 'admin' && <th className="p-4 font-medium">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {patients?.map((patient) => {
                            return (
                                <tr key={patient.id} className="border-t">
                                    <td className="p-4">
                                        <div className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full">
                                            {patient.firstName[0]}{patient.lastName[0]}
                                        </div>
                                    </td>

                                    <td className="p-4">{patient.firstName} {patient.lastName}</td>
                                    <td className="p-4">{patient.email}</td>
                                    <td className="p-4">{patient.phoneNumber}</td>
                                    <td className="p-4">
                                        {typeof patient.dob === 'string' && !isNaN(new Date(patient.dob).getTime())
                                            ? new Date(patient.dob).toLocaleDateString()
                                            : '—'}
                                    </td>
                                    {role === 'admin' && (
                                        <td className="p-4 space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => alert('TODO: edit form')}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => alert('TODO: delete')}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    )}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
