import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { AuthModule } from './auth/auth.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [PlayersModule, AuthModule, SkillsModule],
})
export class AppModule {}
