import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PlayersModule, AuthModule],
})
export class AppModule {}
