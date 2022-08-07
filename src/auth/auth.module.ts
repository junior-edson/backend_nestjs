import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountsRepository } from './repository/implementations/postgres-accounts.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  providers: [
    AuthService,
    {
      provide: 'IAccountsRepository',
      useClass: AccountsRepository,
    },
    JwtStrategy,
  ],
  controllers: [AuthController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600, // 3600 seconds = 1 hour
      },
    }),
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
