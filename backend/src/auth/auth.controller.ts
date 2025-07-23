import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    login(@Body() body: any) {
        console.log('Login attempt:', body); // Add this
        const user = this.authService.validateUser(body.username, body.password);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        return this.authService.login(user);
    }
}

