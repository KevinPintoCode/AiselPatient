import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patients')
export class PatientsController {
    constructor(private service: PatientsService) { }

    @Get()
    getAll() {
        return this.service.findAll();
    }

    @Post()
    @Roles('admin')
    create(@Body() body: any) {
        return this.service.create(body);
    }

    @Put(':id')
    @Roles('admin')
    update(@Param('id') id: string, @Body() body: any) {
        return this.service.update(+id, body);
    }

    @Delete(':id')
    @Roles('admin')
    delete(@Param('id') id: string) {
        return this.service.remove(+id);
    }
}
