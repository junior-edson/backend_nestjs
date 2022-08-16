import { Injectable } from '@nestjs/common';
import { BattleService } from './battle.service';

@Injectable()
export class BattlePvpService extends BattleService {
  calculateAimingPercentage(): void {
    this.player_percent_aiming =
      (this.player_aiming - this.rival_agility) * 0.8;
    this.player_percent_aiming += 35;
  }
}
