import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Account } from 'src/auth/account.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { GetPlayerFilterDto } from './dto/get-player-filter.dto';
import { PlayerStatus } from './player-status.enum';
import { Player } from './player.entity';
import { IPlayersRepository } from './repository/players.repository';

@Injectable()
export class PlayersService {
  constructor(
    @Inject('IPlayersRepository')
    private readonly playersRepository: IPlayersRepository,
  ) {}

  async getPlayerById(id: string, account: Account): Promise<Player> {
    const player: Player = await this.playersRepository.getPlayerById(
      id,
      account,
    );

    if (!player) {
      throw new NotFoundException(`Player ID "${id}" not found`);
    }

    return player;
  }

  async getCountPlayerByName(name: string): Promise<number> {
    return this.playersRepository.getCountPlayerByName(name);
  }

  async createPlayer(
    createPlayerDto: CreatePlayerDto,
    account: Account,
  ): Promise<Player> {
    const { name } = createPlayerDto;
    const foundPlayer: number = await this.getCountPlayerByName(name);

    if (!foundPlayer) {
      return this.playersRepository.createPlayer(createPlayerDto, account);
    } else {
      throw new ConflictException(`Player name "${name}" already exists`);
    }
  }

  async getPlayers(
    filterDto: GetPlayerFilterDto,
    account: Account,
  ): Promise<Player[]> {
    return this.playersRepository.getPlayers(filterDto, account);
  }

  async deletePlayer(id: string, account: Account): Promise<void> {
    return this.playersRepository.deletePlayer(id, account);
  }

  async updatePlayerStatus(
    id: string,
    status: PlayerStatus,
    account: Account,
  ): Promise<Player> {
    return this.playersRepository.updatePlayerStatus(id, status, account);
  }
}
