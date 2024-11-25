import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthController } from './auth.controller';
import { ENVIRONMENT } from '../_config/constants/environment.constant';
import { RolesGuard } from './guards/auth.role.guard';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: ENVIRONMENT.JWT_SECRET,
      signOptions: { expiresIn: '6h' },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, RolesGuard],
  exports: [AuthService, JwtAuthGuard, RolesGuard],

  controllers: [AuthController],
})
export class AuthModule {}
