import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    AuthModule,
    PatientsModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtStrategy],
})
export class AppModule { }
