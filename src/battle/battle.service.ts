import { Injectable } from '@nestjs/common';

@Injectable()
export class BattleService {
  protected player_aiming: number;
  protected player_agility: number;
  protected player_percent_aiming: number;
  protected player_percent_fleeing: number;

  protected rival_aiming: number;
  protected rival_agility: number;

  getPlayerAimingPercentage(): number {
    return this.player_percent_aiming;
  }
}
