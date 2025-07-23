'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAddPatientMutation } from '@/store/patientsApi'

export default function AddPatientModal() {
    const [open, setOpen] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dob: ''
    })

    const [addPatient, { isLoading }] = useAddPatientMutation()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: '' }) // Clear error on input
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        if (!form.firstName) newErrors.firstName = 'First name is required'
        if (!form.lastName) newErrors.lastName = 'Last name is required'
        if (!form.email) newErrors.email = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            newErrors.email = 'Invalid email format'
        if (!form.phoneNumber) newErrors.phoneNumber = 'Phone number is required'
        if (!form.dob) newErrors.dob = 'Date of birth is required'
        return newErrors
    }

    const handleSubmit = async () => {
        const validation = validateForm()
        if (Object.keys(validation).length > 0) {
            setErrors(validation)
            return
        }

        try {
            await addPatient(form).unwrap()
            setOpen(false)
            setForm({ firstName: '', lastName: '', email: '', phoneNumber: '', dob: '' })
            setErrors({})
        } catch (err) {
            alert('Error creating patient')
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Patient</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Patient</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 pt-2">
                    {/* First Name */}
                    <div className="space-y-1">
                        <Input
                            name="firstName"
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={handleChange}
                            className={errors.firstName ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        />
                        {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                    </div>

                    {/* Last Name */}
                    <div className="space-y-1">
                        <Input
                            name="lastName"
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={handleChange}
                            className={errors.lastName ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        />
                        {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <Input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                        <Input
                            name="phoneNumber"
                            type="tel"
                            placeholder="Phone Number"
                            value={form.phoneNumber}
                            onChange={(e) => {
                                const value = e.target.value
                                if (/^\d*$/.test(value)) setForm({ ...form, phoneNumber: value })
                            }}
                            className={errors.phoneNumber ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        />
                        {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
                    </div>

                    {/* Date of Birth */}
                    <div className="space-y-1">
                        <Input
                            name="dob"
                            type="date"
                            placeholder="Date of Birth"
                            value={form.dob}
                            onChange={handleChange}
                            className={errors.dob ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        />
                        {errors.dob && <p className="text-sm text-red-500">{errors.dob}</p>}
                    </div>

                    {/* Submit Button */}
                    <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
                        {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
