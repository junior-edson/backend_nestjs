import { CreatePlayerDto } from '../dto/create-player.dto';
import { GetPlayerFilterDto } from '../dto/get-player-filter.dto';
import { PlayerStatus } from '../player-status.enum';
import { Player } from '../player.entity';

export interface IPlayersRepository {
  dataSource: any;

  getPlayerById(id: string): Promise<Player | null>;
  getCountPlayerByName(name: string): Promise<any>;
  createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player>;
  getPlayers(filterDto: GetPlayerFilterDto): Promise<Player[]>;
  deletePlayer(id: string): Promise<void>;
  updatePlayerStatus(id: string, status: PlayerStatus): Promise<Player>;
}
