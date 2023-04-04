import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoggerModule } from '../logger/logger.module';
import { PrismaService } from '../shared/base';
import { AuthJwtStrategy } from './strategies/auth-jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRED_TIME } from '../shared/constants';
import { UserModule } from '../modules/user/user.module';

@Module({
  imports: [
    LoggerModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: JWT_EXPIRED_TIME,
      },
    }),
  ],
  providers: [AuthService, PrismaService, AuthJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
