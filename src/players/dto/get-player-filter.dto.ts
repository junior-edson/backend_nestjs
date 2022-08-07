import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PlayerStatus } from '../player-status.enum';

export class GetPlayerFilterDto {
  @IsOptional()
  @IsEnum(PlayerStatus)
  status?: PlayerStatus;

  @IsOptional()
  @IsString({ message: 'Search provided is not valid' })
  search?: string;
}
