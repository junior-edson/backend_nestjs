import { Injectable } from '@nestjs/common';
import { BattleService } from './battle.service';

@Injectable()
export class BattleZombieService extends BattleService {
  calculateAimingPercentage(): void {
    this.player_percent_aiming =
      (this.player_aiming - this.rival_agility) * 0.8;
    this.player_percent_aiming += 35;
  }

  calculateFleeingPercentage(): void {
    this.player_percent_fleeing =
      (this.player_agility - this.rival_agility) * 0.4;
    this.player_percent_fleeing += 30;
  }
}
