import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { users } from './users';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    validateUser(username: string, password: string) {
        return users.find(
            (user) => user.username === username && user.password === password
        );
    }

    login(user: any) {
        const payload = {
            username: user.username,
            sub: user.id,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
