import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { AuthModule } from './auth/auth.module';
import { SkillsModule } from './skills/skills.module';
import { BattleModule } from './battle/battle.module';
import { BattleZombieService } from './battle-zombie/battle-zombie.service';

@Module({
  imports: [PlayersModule, AuthModule, SkillsModule, BattleModule],
  providers: [BattleZombieService],
})
export class AppModule {}
