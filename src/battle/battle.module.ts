import { Module } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattlePvpService } from './battlepvp.service';
import { BattleZombieService } from './battlezombie.service';

@Module({
  providers: [BattleService, BattlePvpService, BattleZombieService],
})
export class BattleModule {}
