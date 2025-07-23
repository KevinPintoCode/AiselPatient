import { Injectable } from '@nestjs/common';

@Injectable()
export class PatientsService {
    private patients: any[] = [];

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
