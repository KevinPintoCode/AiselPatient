import { Injectable } from '@nestjs/common';

@Injectable()
export class PatientsService {
    private patients: any[] = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phoneNumber: '1234567890',
            dob: '1990-01-01',
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            phoneNumber: '0987654321',
            dob: '1995-05-15',
        },
        {
            id: 3,
            firstName: 'Jim',
            lastName: 'Beam',
            email: 'jim.beam@example.com',
            phoneNumber: '1111111111',
            dob: '1992-03-20',
        },
    ];

    findAll() {
        return this.patients;
    }

    create(patient: any) {
        const id = Date.now();
        this.patients.push({ id, ...patient });
        return { id };
    }

    update(id: number, data: any) {
        const idx = this.patients.findIndex(p => p.id === id);
        if (idx === -1) return null;
        this.patients[idx] = { ...this.patients[idx], ...data };
        return this.patients[idx];
    }

    remove(id: number) {
        this.patients = this.patients.filter(p => p.id !== id);
        return { deleted: true };
    }
}
