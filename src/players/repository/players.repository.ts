import { Account } from 'src/auth/account.entity';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { GetPlayerFilterDto } from '../dto/get-player-filter.dto';
import { PlayerStatus } from '../player-status.enum';
import { Player } from '../player.entity';

export interface IPlayersRepository {
  dataSource: any;

  getPlayerById(id: string, account: Account): Promise<Player>;
  getCountPlayerByName(name: string): Promise<number>;
  createPlayer(
    createPlayerDto: CreatePlayerDto,
    account: Account,
  ): Promise<Player>;
  getPlayers(
    filterDto: GetPlayerFilterDto,
    account: Account,
  ): Promise<Player[]>;
  deletePlayer(id: string, account: Account): Promise<void>;
  updatePlayerStatus(
    id: string,
    status: PlayerStatus,
    account: Account,
  ): Promise<Player>;
}
