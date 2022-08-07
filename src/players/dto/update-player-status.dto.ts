import { IsEnum } from 'class-validator';
import { PlayerStatus } from '../player-status.enum';

export class UpdatePlayerStatusDto {
  @IsEnum(PlayerStatus)
  status: PlayerStatus;
}
